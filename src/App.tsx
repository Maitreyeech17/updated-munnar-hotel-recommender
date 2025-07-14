import React, { useState, useEffect } from 'react';
import './App.css';
import { TOURIST_SPOTS, HOTELS } from './data.ts';
import MapView from './MapView.tsx';
import SimpleMap from './components/SimpleMap.tsx';
import WeatherInfo from './components/WeatherInfo.tsx';
import { getRoute } from './services/transportationService.ts';
import EnhancedHotelCard from './components/EnhancedHotelCard.tsx';
import { fetchPixabayImages } from './services/pixabayImageService.ts';


interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  price: number;
  location: string;
  website?: string;
  amenities?: string[];
}

interface HotelRecommendation {
  hotel: Hotel;
  score: number;
  distance: number;
  centralityScore: number;
  ratingScore: number;
  priceScore: number;
}



function App() {
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<HotelRecommendation[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1500, 6000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [routeCoords, setRouteCoords] = useState<Array<Array<[number, number]>>>([]);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [hotelImages, setHotelImages] = useState([]);


  useEffect(() => {
    const loadImages = async () => {
      const images = await fetchPixabayImages('hotel', 10); // Fetch 10 images
      setHotelImages(images);
    };
    loadImages();
  }, []);


  const handleSpotChange = (id: number) => {
    setSelectedSpots((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  };







  const getRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const selectedSpotData = selectedSpots.map(id => 
        TOURIST_SPOTS.find(spot => spot.id === id)!
      );
      
      // Calculate average position of selected spots
      const avgLat = selectedSpotData.reduce((sum, spot) => sum + spot.lat, 0) / selectedSpotData.length;
      const avgLng = selectedSpotData.reduce((sum, spot) => sum + spot.lng, 0) / selectedSpotData.length;
      
      // Filter hotels by price and rating
      const filteredHotels = HOTELS.filter(hotel => 
        hotel.price >= priceRange[0] && 
        hotel.price <= priceRange[1] && 
        hotel.rating >= minRating
      );
      
      // Calculate scores for each hotel
      const hotelScores = filteredHotels.map(hotel => {
        // Distance score (closer is better)
        const distance = Math.sqrt(
          Math.pow(hotel.lat - avgLat, 2) + Math.pow(hotel.lng - avgLng, 2)
        );
        const distanceScore = 1 / (1 + distance * 100);
        
        // Centrality score (how central the hotel is to all selected spots)
        const centralityScore = selectedSpotData.reduce((sum, spot) => {
          const spotDistance = Math.sqrt(
            Math.pow(hotel.lat - spot.lat, 2) + Math.pow(hotel.lng - spot.lng, 2)
          );
          return sum + (1 / (1 + spotDistance * 100));
        }, 0) / selectedSpotData.length;
        
        // Rating score
        const ratingScore = hotel.rating / 5;
        
        // Price score (lower price is better, but not too low)
        const priceScore = Math.max(0, 1 - (hotel.price - 1000) / 1000);
        
        // Combined score
        const totalScore = (distanceScore * 0.3) + (centralityScore * 0.3) + (ratingScore * 0.2) + (priceScore * 0.2);
        
        return {
          hotel,
          score: totalScore,
          distance,
          centralityScore,
          ratingScore,
          priceScore
        };
      });
      
      // Sort by score and take top 5
      const topRecommendations = hotelScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      
      setRecommendations(topRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  // Handler to show route from first selected tourist spot to hotel
  const handleShowRoute = async (hotelLat: number, hotelLng: number) => {
    if (selectedSpots.length === 0) {
      setRouteError('Select at least one tourist spot');
      return;
    }
    setRouteLoading(true);
    setRouteError(null);
    try {
      const routes: Array<Array<[number, number]>> = [];
      for (const spotId of selectedSpots) {
        const spot = TOURIST_SPOTS.find(s => s.id === spotId);
        if (!spot) continue;
        const data = await getRoute(spot.lat, spot.lng, hotelLat, hotelLng);
        console.log('OSRM route response:', data); // Debug: log the full API response
        const coords = data.routes[0]?.geometry?.coordinates?.map(([lng, lat]: [number, number]) => [lat, lng]) || [];
        console.log('Polyline coordinates:', coords); // Debug: log the polyline coordinates
        if (coords.length > 0) routes.push(coords);
      }
      setRouteCoords(routes);
    } catch (e: any) {
      setRouteError(e.message || 'Failed to fetch route');
    } finally {
      setRouteLoading(false);
    }
  };

  const selectedTouristSpots = TOURIST_SPOTS.filter((s) => selectedSpots.includes(s.id));

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="main-center-container">
        <div className="header-controls">
          <h1>🏔️ Munnar Hotel Recommender</h1>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <WeatherInfo city="Munnar" />

        {/* Interactive Map Section - Temporarily disabled */}
        {/* 
        <div style={{ marginBottom: '20px', padding: '0 20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: isDarkMode ? '#ffffff' : '#2c3e50' }}>
            🗺️ Interactive Munnar Map
          </h3>
          <p style={{ textAlign: 'center', marginBottom: '15px', color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }}>
            Explore hotels and tourist spots in Munnar. Click on markers for details.
          </p>
          <LeafletMap 
            hotels={HOTELS}
            touristSpots={TOURIST_SPOTS}
            center={[10.0889, 77.0622]} // Munnar center
            zoom={11}
          />
        </div>
        */}
        

        

        
        <div className="spots-container">
          <div className="spots-section">
            <h2>Select Tourist Spots (Choose at least 5)</h2>
            <div className="spots-grid">
              {TOURIST_SPOTS.map((spot) => (
                <label key={spot.id} className="spot-item">
                  <input
                    type="checkbox"
                    checked={selectedSpots.includes(spot.id)}
                    onChange={() => handleSpotChange(spot.id)}
                  />
                  <span>{spot.name}</span>
                </label>
              ))}
            </div>
            
            <div className="spots-summary">
              <p>
                Selected: <strong>{selectedSpots.length}</strong> spots
                {selectedSpots.length < 5 && (
                  <span className="warning"> (Need at least 5 for best recommendations)</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="filters-container">
          <button 
            className="filters-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Price Range (₹):</label>
                <div className="price-range">
                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                  <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
                </div>
              </div>
              
              <div className="filter-group">
                <label>Minimum Rating:</label>
                <select 
                  value={minRating} 
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                >
                  <option value={0}>Any Rating</option>
                  <option value={3.5}>3.5+ Stars</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="recommendations-container">
          <button 
            className="get-recommendations-btn"
            onClick={getRecommendations}
            disabled={selectedSpots.length < 5 || isLoading}
          >
            {isLoading ? 'Finding Hotels...' : 'Get Hotel Recommendations'}
          </button>
          
          {recommendations.length > 0 && (
            <div className="recommendations-section">
              <h2>🏨 Top Hotel Recommendations</h2>
              <div className="recommendations-grid">
                {recommendations.map((rec, idx) => (
                  <EnhancedHotelCard
                    key={rec.hotel.id}
                    recommendation={rec}
                    isDarkMode={isDarkMode}
                    onShowRoute={handleShowRoute}
                    routeLoading={routeLoading}
                    imageUrl={hotelImages[idx % hotelImages.length]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedSpots.length > 0 && (
          <div className="map-container">
            <button 
              className="map-toggle-btn"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? 'Hide' : 'Show'} Map View
            </button>
            
            {showMap && (
              <SimpleMap hotels={HOTELS} touristSpots={TOURIST_SPOTS} route={routeCoords} />
            )}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="analysis-container">
            <button 
              className="analysis-toggle-btn"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </button>
            
            {showAnalysis && (
              <div className="analysis-panel">
                <h3>📊 Recommendation Analysis</h3>
                <div className="analysis-grid">
                  {recommendations.map((rec, index) => (
                    <div key={rec.hotel.id} className="analysis-item">
                      <h4>{rec.hotel.name}</h4>
                      <div className="score-breakdown">
                        <div className="score-item">
                          <span>Distance Score:</span>
                          <span>{(rec.distanceScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="score-item">
                          <span>Centrality Score:</span>
                          <span>{(rec.centralityScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="score-item">
                          <span>Rating Score:</span>
                          <span>{(rec.ratingScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="score-item">
                          <span>Price Score:</span>
                          <span>{(rec.priceScore * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
