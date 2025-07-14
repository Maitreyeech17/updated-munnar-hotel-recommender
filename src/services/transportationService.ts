// Transportation Service using Google Maps Directions API
// Note: You'll need to get a Google Maps API key from: https://console.cloud.google.com/

// Google Maps type declarations
declare global {
  interface Window {
    google: {
      maps: {
        DirectionsService: any;
        LatLng: any;
        TravelMode: any;
        UnitSystem: any;
      };
    };
  }
}

interface RouteInfo {
  distance: string;
  duration: string;
  durationInMinutes: number;
  mode: 'driving' | 'walking' | 'transit';
  route: any[];
  steps: string[];
}

interface TransportationOptions {
  driving: RouteInfo | null;
  walking: RouteInfo | null;
  transit: RouteInfo | null;
}

class TransportationService {
  private apiKey: string;
  private directionsService: any = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.initializeDirectionsService();
  }

  private initializeDirectionsService() {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      this.directionsService = new window.google.maps.DirectionsService();
    }
  }

  // Calculate route between two points
  async calculateRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    mode: 'driving' | 'walking' | 'transit' = 'driving'
  ): Promise<RouteInfo | null> {
    if (!this.directionsService) {
      console.warn('Google Maps API not loaded');
      return null;
    }

    try {
      const request: any = {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        travelMode: window.google.maps.TravelMode[mode.toUpperCase() as keyof typeof window.google.maps.TravelMode],
        unitSystem: window.google.maps.UnitSystem.METRIC,
      };

      const result = await this.directionsService.route(request);
      
      if (result.routes && result.routes.length > 0) {
        const route = result.routes[0];
        const leg = route.legs[0];
        
        return {
          distance: leg.distance?.text || 'Unknown',
          duration: leg.duration?.text || 'Unknown',
          durationInMinutes: leg.duration?.value ? Math.round(leg.duration.value / 60) : 0,
          mode,
          route: this.extractRoutePoints(route),
          steps: this.extractSteps(leg.steps || [])
        };
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }

    return null;
  }

  // Calculate all transportation options
  async calculateAllRoutes(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<TransportationOptions> {
    const [driving, walking, transit] = await Promise.all([
      this.calculateRoute(origin, destination, 'driving'),
      this.calculateRoute(origin, destination, 'walking'),
      this.calculateRoute(origin, destination, 'transit')
    ]);

    return { driving, walking, transit };
  }

  // Extract route points for map visualization
  private extractRoutePoints(route: any): any[] {
    const points: any[] = [];
    
    if (route.overview_path) {
      route.overview_path.forEach((point: any) => {
        points.push(new window.google.maps.LatLng(point.lat(), point.lng()));
      });
    }

    return points;
  }

  // Extract step-by-step directions
  private extractSteps(steps: any[]): string[] {
    return steps.map(step => step.instructions || '');
  }

  // Get estimated travel time for planning
  getEstimatedTravelTime(distanceKm: number, mode: 'driving' | 'walking' | 'transit'): number {
    const speeds = {
      driving: 40, // km/h average in Munnar
      walking: 5,  // km/h
      transit: 25  // km/h average for buses
    };

    return Math.round((distanceKm / speeds[mode]) * 60); // minutes
  }

  // Calculate direct distance between two points
  calculateDirectDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLng = this.toRadians(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Mock service for development (when API key is not available)
class MockTransportationService {
  async calculateRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    mode: 'driving' | 'walking' | 'transit' = 'driving'
  ): Promise<RouteInfo | null> {
    const distance = this.calculateDirectDistance(origin, destination);
    const speeds = { driving: 40, walking: 5, transit: 25 };
    const durationMinutes = Math.round((distance / speeds[mode]) * 60);

    return {
      distance: `${distance.toFixed(1)} km`,
      duration: `${durationMinutes} mins`,
      durationInMinutes: durationMinutes,
      mode,
      route: [],
      steps: [`Travel ${distance.toFixed(1)} km by ${mode}`]
    };
  }

  async calculateAllRoutes(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<TransportationOptions> {
    const [driving, walking, transit] = await Promise.all([
      this.calculateRoute(origin, destination, 'driving'),
      this.calculateRoute(origin, destination, 'walking'),
      this.calculateRoute(origin, destination, 'transit')
    ]);

    return { driving, walking, transit };
  }

  private calculateDirectDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371;
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLng = this.toRadians(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

// Export the appropriate service based on API availability
const GOOGLE_MAPS_API_KEY = (window as any).REACT_APP_GOOGLE_MAPS_API_KEY || '';

export const transportationService = GOOGLE_MAPS_API_KEY 
  ? new TransportationService(GOOGLE_MAPS_API_KEY)
  : new MockTransportationService();

export type { RouteInfo, TransportationOptions }; 

// Fetch route between two points using OSRM
export async function getRoute(
  startLat: number, startLng: number,
  endLat: number, endLng: number
) {
  const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch route');
  return response.json();
} 