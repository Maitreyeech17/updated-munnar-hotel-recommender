import React, { useState } from 'react';
import './App.css';
import { TOURIST_SPOTS, HOTELS } from './data.ts';
import MapView from './MapView.tsx';

interface TouristSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

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

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function App() {
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<HotelRecommendation[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([1500, 6000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);

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

  const selectedTouristSpots = TOURIST_SPOTS.filter((s) => selectedSpots.includes(s.id));

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header-controls">
        <h1>🏔️ Munnar Hotel Recommender</h1>
        <button 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
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
          {selectedSpots.length < 5 && (
            <p className="warning">Please select at least 5 tourist spots</p>
          )}
        </div>

        <div className="filters-section">
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          
          {showFilters && (
            <div className="filters-content">
              <div className="filter-group">
                <label>Price Range (₹): ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</label>
                <div className="price-slider">
                  <input
                    type="range"
                    min="1500"
                    max="6000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                  <input
                    type="range"
                    min="1500"
                    max="6000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
                <div className="price-range-display">
                  <span>Min: ₹{priceRange[0].toLocaleString()}</span>
                  <span>Max: ₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              <div className="filter-group">
                <label>Minimum Rating: {minRating}+</label>
                <div className="rating-filter">
                  {[0, 3, 3.5, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      className={`rating-btn ${minRating === rating ? 'active' : ''}`}
                      onClick={() => setMinRating(rating)}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          className="recommend-button"
          onClick={getRecommendations}
          disabled={selectedSpots.length < 5}
        >
          🏨 Recommend Hotels ({selectedSpots.length} spots)
        </button>
      </div>
      
      {recommendations.length > 0 && (
        <>
          <button
            className={`map-toggle ${showMap ? 'active' : ''}`}
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? '🗺️ Hide Map' : '🗺️ Show Map View'}
          </button>
          
          <MapView
            selectedSpots={selectedTouristSpots}
            recommendations={recommendations}
            isVisible={showMap}
          />
        </>
      )}
      
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <div className="recommendations-header">
            <h2>Recommended Hotels</h2>
            {recommendations.length > 0 && (
              <button 
                className="analysis-toggle"
                onClick={() => setShowAnalysis(!showAnalysis)}
              >
                {showAnalysis ? 'Hide' : 'Show'} Analysis
              </button>
            )}
          </div>
          
          {showAnalysis && recommendations.length > 0 && (
            <div className="analysis-panel">
              <h3>📊 Recommendation Analysis</h3>
              <div className="analysis-content">
                <div className="analysis-item">
                  <strong>Selected Spots:</strong> {selectedSpots.length} locations
                </div>
                <div className="analysis-item">
                  <strong>Price Range:</strong> ₹{priceRange[0]} - ₹{priceRange[1]}
                </div>
                <div className="analysis-item">
                  <strong>Minimum Rating:</strong> {minRating === 0 ? 'Any' : `${minRating}+`}
                </div>
                <div className="analysis-item">
                  <strong>Scoring Factors:</strong>
                  <ul>
                    <li>Distance to spots (30%)</li>
                    <li>Centrality to all spots (30%)</li>
                    <li>Hotel rating (20%)</li>
                    <li>Price value (20%)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="hotels-grid">
            {recommendations.map((rec, index) => (
              <div key={rec.hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img 
                    src={`/images/hotel-${rec.hotel.id}.jpg`} 
                    alt={rec.hotel.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      // Show a placeholder or fallback content
                      const imageContainer = e.currentTarget.parentElement;
                      if (imageContainer) {
                        imageContainer.innerHTML = `
                          <div class="hotel-image-placeholder">
                            <div class="placeholder-icon">🏨</div>
                            <div class="placeholder-text">${rec.hotel.name}</div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                
                <div className="hotel-header">
                  <h3>{rec.hotel.name}</h3>
                  <div className="hotel-rating">
                    <span className="stars">{'★'.repeat(Math.floor(rec.hotel.rating))}</span>
                    <span className="rating-text">{rec.hotel.rating}/5</span>
                  </div>
                </div>
                
                <div className="hotel-details">
                  <p className="hotel-location">📍 {rec.hotel.location}</p>
                  <p className="hotel-price">₹{rec.hotel.price}/night</p>
                  
                  <div className="amenities-section">
                    <h5 className="amenities-title">🏨 Amenities</h5>
                    <div className="hotel-amenities">
                      {rec.hotel.amenities.map((amenity, idx) => (
                        <span key={idx} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="recommendation-scores">
                    <div className="score-item">
                      <span className="score-label">Match Score:</span>
                      <span className="score-value">{(rec.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Distance:</span>
                      <span className="score-value">{(rec.distance * 100).toFixed(1)}km</span>
                    </div>
                    {showAnalysis && (
                      <>
                        <div className="score-item">
                          <span className="score-label">Centrality:</span>
                          <span className="score-value">{(rec.centralityScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="score-item">
                          <span className="score-label">Rating Score:</span>
                          <span className="score-value">{(rec.ratingScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="score-item">
                          <span className="score-label">Price Score:</span>
                          <span className="score-value">{(rec.priceScore * 100).toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="hotel-actions">
                  <button className="btn-primary">Book Now</button>
                </div>
                
                <div className="why-choose-section">
                  <h4>🏆 Why Choose This Hotel?</h4>
                  <div className="why-choose-content">
                    <div className="reason-item">
                      <span className="reason-icon">📍</span>
                      <span className="reason-text">Perfectly located near your selected spots</span>
                    </div>
                    <div className="reason-item">
                      <span className="reason-icon">⭐</span>
                      <span className="reason-text">High rating of {rec.hotel.rating}/5 stars</span>
                    </div>
                    <div className="reason-item">
                      <span className="reason-icon">💰</span>
                      <span className="reason-text">Great value at ₹{rec.hotel.price}/night</span>
                    </div>
                    <div className="reason-item">
                      <span className="reason-icon">🎯</span>
                      <span className="reason-text">{(rec.score * 100).toFixed(1)}% match score</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
