import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  amenities?: string[];
  avgDist?: number;
}

interface HotelRecommendation {
  hotel: Hotel;
  score: number;
  distance: number;
  centralityScore: number;
  ratingScore: number;
  priceScore: number;
}

interface MapViewProps {
  selectedSpots: TouristSpot[];
  recommendations: HotelRecommendation[];
  isVisible: boolean;
}

const MapView: React.FC<MapViewProps> = ({ selectedSpots, recommendations, isVisible }) => {
  if (!isVisible) return null;

  // Calculate center point for the map
  const allPoints = [...selectedSpots, ...recommendations.map(rec => rec.hotel)];
  
  if (allPoints.length === 0) {
    return (
      <div className="map-container">
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
          <p>No points to display on map</p>
        </div>
      </div>
    );
  }

  const centerLat = allPoints.reduce((sum, point) => sum + point.lat, 0) / allPoints.length;
  const centerLng = allPoints.reduce((sum, point) => sum + point.lng, 0) / allPoints.length;

  return (
    <div className="map-container">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={11}
        style={{ height: '500px', width: '100%', borderRadius: '15px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Tourist Spots Markers */}
        {selectedSpots.map((spot) => (
          <Marker
            key={`spot-${spot.id}`}
            position={[spot.lat, spot.lng]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: #4a7c59; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>
              <div>
                <h3>📍 {spot.name}</h3>
                <p>Tourist Spot</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Hotel Markers */}
        {recommendations.map((rec, index) => (
          <Marker
            key={`hotel-${rec.hotel.id}`}
            position={[rec.hotel.lat, rec.hotel.lng]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: #e74c3c; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${index + 1}</div>`,
              iconSize: [25, 25],
              iconAnchor: [12.5, 12.5],
            })}
          >
            <Popup>
              <div>
                <h3>🏨 {rec.hotel.name}</h3>
                <p>⭐ Rating: {rec.hotel.rating}/5.0</p>
                <p>💰 Price: ₹{rec.hotel.price}/night</p>
                <p>📍 Location: {rec.hotel.location}</p>
                <p>🎯 Match Score: {(rec.score * 100).toFixed(1)}%</p>
                <p>📏 Distance: {(rec.distance * 100).toFixed(1)} km</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Distance circles around hotels */}
        {recommendations.map((rec) => (
          <Circle
            key={`circle-${rec.hotel.id}`}
            center={[rec.hotel.lat, rec.hotel.lng]}
            radius={rec.distance * 100000} // Convert km to meters (distance is in decimal degrees)
            pathOptions={{
              color: '#e74c3c',
              fillColor: '#e74c3c',
              fillOpacity: 0.1,
              weight: 2,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView; 