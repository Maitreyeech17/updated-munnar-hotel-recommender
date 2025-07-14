import React, { useState, useEffect } from 'react';
import { fetchPixabayImages } from '../services/pixabayImageService.ts';

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

interface EnhancedHotelCardProps {
  recommendation: HotelRecommendation;
  isDarkMode: boolean;
  onShowRoute: (lat: number, lng: number) => void;
  routeLoading?: boolean;
  imageUrl?: string;
}

const EnhancedHotelCard: React.FC<EnhancedHotelCardProps> = ({ recommendation, isDarkMode, onShowRoute, routeLoading, imageUrl }) => {
  const { hotel } = recommendation;
  // Removed image fetching logic from inside the card

  return (
    <div
      className="hotel-card"
      style={{
        background: isDarkMode ? 'rgba(34, 40, 49, 0.98)' : '#fff',
        color: isDarkMode ? '#f8f8f8' : '#222',
        padding: 20,
        borderRadius: 16,
        boxShadow: isDarkMode
          ? '0 4px 24px rgba(0,0,0,0.33)'
          : '0 4px 24px rgba(0,0,0,0.13)',
        minHeight: 300,
        minWidth: 300,
        margin: '10px 0',
        border: isDarkMode ? '1.5px solid #222831' : '1.5px solid #e0e0e0',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {/* Hotel Image Section */}
      <div style={{ width: '100%', marginBottom: 16 }}>
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'}
          alt={hotel.name}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0',
            background: isDarkMode ? '#222831' : '#eee',
            border: isDarkMode ? '1px solid #393e46' : '1px solid #e0e0e0',
            display: 'block',
          }}
        />
      </div>
      {/* Hotel Header */}
      <div className="hotel-header" style={{ color: isDarkMode ? '#f8f8f8' : '#222' }}>
        <h3 style={{ color: isDarkMode ? '#f8f8f8' : '#222' }}>{hotel.name}</h3>
        <div className="hotel-rating" style={{ color: '#ffb347' }}>
          {'⭐'.repeat(Math.floor(hotel.rating))}
          <span className="rating-text" style={{ color: isDarkMode ? '#f8f8f8' : '#222' }}>{hotel.rating}</span>
        </div>
      </div>
      {/* Hotel Details */}
      <div className="hotel-details" style={{ color: isDarkMode ? '#e0e0e0' : '#444' }}>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Price:</strong> ₹{hotel.price}/night</p>
        <p><strong>Match Score:</strong> {(recommendation.score * 100).toFixed(1)}%</p>
      </div>
      {/* Hotel Amenities */}
      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="hotel-amenities">
          <strong>Amenities:</strong>
          <div className="amenities-list">
            {hotel.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="amenity-tag">{amenity}</span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="amenity-tag">+{hotel.amenities.length - 3} more</span>
            )}
          </div>
        </div>
      )}
      <button
        className="show-route-btn"
        onClick={() => onShowRoute(hotel.lat, hotel.lng)}
        disabled={routeLoading}
        style={{
          marginTop: '18px',
          width: '100%',
          background: isDarkMode ? 'linear-gradient(90deg, #4a7c59 60%, #222831 100%)' : '#4a7c59',
          color: isDarkMode ? '#fff' : '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 0',
          fontSize: '1.08rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(39,174,96,0.10)',
          cursor: routeLoading ? 'not-allowed' : 'pointer',
          opacity: routeLoading ? 0.7 : 1,
          transition: 'background 0.2s, color 0.2s, opacity 0.2s',
        }}
      >
        {routeLoading ? 'Loading Route...' : 'Show Route'}
      </button>
    </div>
  );
};

export default EnhancedHotelCard; 