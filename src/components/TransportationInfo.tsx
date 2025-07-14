import React, { useState, useEffect } from 'react';
import { transportationService, type RouteInfo, type TransportationOptions } from '../services/transportationService';

interface TransportationInfoProps {
  origin: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
}

const TransportationInfo: React.FC<TransportationInfoProps> = ({ origin, destination }) => {
  const [transportationOptions, setTransportationOptions] = useState<TransportationOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'driving' | 'walking' | 'transit'>('driving');

  useEffect(() => {
    calculateRoutes();
  }, [origin, destination]);

  const calculateRoutes = async () => {
    setLoading(true);
    try {
      const options = await transportationService.calculateAllRoutes(origin, destination);
      setTransportationOptions(options);
    } catch (error) {
      console.error('Error calculating routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRouteInfo = (mode: 'driving' | 'walking' | 'transit'): RouteInfo | null => {
    if (!transportationOptions) return null;
    return transportationOptions[mode];
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'driving': return '🚗';
      case 'walking': return '🚶';
      case 'transit': return '🚌';
      default: return '🚗';
    }
  };

  const getModeName = (mode: string) => {
    switch (mode) {
      case 'driving': return 'Car';
      case 'walking': return 'Walking';
      case 'transit': return 'Public Transport';
      default: return 'Car';
    }
  };

  if (loading) {
    return (
      <div className="transportation-info">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Calculating routes...</p>
        </div>
      </div>
    );
  }

  const currentRoute = getRouteInfo(selectedMode);

  return (
    <div className="transportation-info">
      <div className="route-header">
        <h3>🚗 Transportation Options</h3>
        <p className="route-description">
          From <strong>{origin.name}</strong> to <strong>{destination.name}</strong>
        </p>
      </div>

      <div className="transportation-modes">
        {(['driving', 'walking', 'transit'] as const).map((mode) => {
          const route = getRouteInfo(mode);
          const isSelected = selectedMode === mode;
          
          return (
            <button
              key={mode}
              className={`mode-button ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedMode(mode)}
              disabled={!route}
            >
              <span className="mode-icon">{getModeIcon(mode)}</span>
              <span className="mode-name">{getModeName(mode)}</span>
              {route && (
                <span className="route-summary">
                  {route.duration} • {route.distance}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {currentRoute && (
        <div className="route-details">
          <div className="route-overview">
            <div className="route-stat">
              <span className="stat-label">Duration:</span>
              <span className="stat-value">{currentRoute.duration}</span>
            </div>
            <div className="route-stat">
              <span className="stat-label">Distance:</span>
              <span className="stat-value">{currentRoute.distance}</span>
            </div>
            <div className="route-stat">
              <span className="stat-label">Mode:</span>
              <span className="stat-value">{getModeName(currentRoute.mode)}</span>
            </div>
          </div>

          {currentRoute.steps.length > 0 && (
            <div className="route-steps">
              <h4>📋 Step-by-step Directions</h4>
              <ol className="steps-list">
                {currentRoute.steps.map((step, index) => (
                  <li key={index} className="step-item">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {!transportationOptions && !loading && (
        <div className="no-routes">
          <p>No transportation routes available for this destination.</p>
        </div>
      )}
    </div>
  );
};

export default TransportationInfo; 