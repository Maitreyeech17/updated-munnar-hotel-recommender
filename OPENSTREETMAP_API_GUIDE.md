# OpenStreetMap API Integration Guide

## Overview
This project uses **completely free** OpenStreetMap APIs to provide advanced mapping features without requiring any credit card or API keys.

## 🆓 Free APIs Used

### 1. **Nominatim Geocoding API**
- **URL**: `https://nominatim.openstreetmap.org/search`
- **Purpose**: Convert addresses to coordinates
- **Rate Limit**: 1 request per second (generous for personal projects)
- **Features**:
  - Address search
  - Reverse geocoding (coordinates to address)
  - Place type filtering

### 2. **OSRM Routing API**
- **URL**: `https://router.project-osrm.org/route/v1`
- **Purpose**: Calculate driving routes between points
- **Rate Limit**: No strict limits for reasonable usage
- **Features**:
  - Driving directions
  - Distance calculation
  - Route visualization

### 3. **OpenStreetMap Tiles**
- **URL**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Purpose**: Display map tiles
- **Rate Limit**: Very generous for personal projects
- **Features**:
  - High-quality map tiles
  - Multiple zoom levels
  - No attribution required (but appreciated)

## 🚀 Features Implemented

### 1. **Address Search**
```typescript
// Search for any address or place
const results = await OpenStreetMapService.geocodeAddress("Munnar, Kerala");
```

### 2. **Route Calculation**
```typescript
// Calculate route between two points
const route = await OpenStreetMapService.getRoute(
  startLat, startLng, endLat, endLng
);
```

### 3. **Nearby Places**
```typescript
// Find nearby hotels, restaurants, etc.
const places = await OpenStreetMapService.getNearbyPlaces(lat, lng, radius);
```

### 4. **Reverse Geocoding**
```typescript
// Get address from coordinates
const address = await OpenStreetMapService.reverseGeocode(lat, lng);
```

## 📁 File Structure

```
src/
├── services/
│   └── openStreetMapService.ts    # Main API service
├── components/
│   ├── EnhancedMapView.tsx        # Advanced map with routing
│   └── AddressSearch.tsx          # Address search component
└── App.tsx                        # Main app with integration
```

## 🔧 How to Use

### 1. **Basic Address Search**
```typescript
import { OpenStreetMapService } from './services/openStreetMapService';

// Search for an address
const results = await OpenStreetMapService.geocodeAddress("Tea Museum, Munnar");
console.log(results);
// Output: [{ lat: 10.0889, lng: 77.0622, display_name: "...", type: "tourism" }]
```

### 2. **Calculate Route**
```typescript
// Calculate driving route
const route = await OpenStreetMapService.getRoute(
  10.0889, 77.0622,  // Start: Tea Museum
  10.1956, 77.0486   // End: Eravikulam National Park
);

if (route) {
  console.log(`Distance: ${route.distance} km`);
  console.log(`Duration: ${route.duration} minutes`);
}
```

### 3. **Find Nearby Places**
```typescript
// Find hotels near a location
const nearbyHotels = await OpenStreetMapService.getNearbyPlaces(
  10.0889, 77.0622,  // Center point
  2000                // Radius in meters
);
```

## 🎯 Advanced Features

### 1. **Interactive Map with Routing**
- Click on hotel markers to calculate routes
- Visual route display with polylines
- Distance and duration information

### 2. **Nearby Places Discovery**
- Find hotels, restaurants, and attractions
- Filter by place type
- Display on map with custom markers

### 3. **Address Search with Autocomplete**
- Real-time address search
- Dropdown with search results
- Click to select location

## 📱 Mobile Responsive

All OpenStreetMap features are fully responsive:
- Touch-friendly controls
- Optimized for mobile screens
- Gesture support for map interactions

## 🌙 Dark Mode Support

All components support dark mode:
- Map tiles adapt to theme
- Search results with dark styling
- Consistent color scheme

## ⚡ Performance Tips

### 1. **Caching**
```typescript
// Cache search results to avoid repeated API calls
const searchCache = new Map();

const cachedSearch = async (query: string) => {
  if (searchCache.has(query)) {
    return searchCache.get(query);
  }
  
  const results = await OpenStreetMapService.geocodeAddress(query);
  searchCache.set(query, results);
  return results;
};
```

### 2. **Debouncing**
```typescript
// Debounce search input to avoid excessive API calls
const debouncedSearch = debounce(handleSearch, 300);
```

### 3. **Error Handling**
```typescript
try {
  const results = await OpenStreetMapService.geocodeAddress(query);
  // Handle results
} catch (error) {
  console.error('Search failed:', error);
  // Show user-friendly error message
}
```

## 🔒 Rate Limiting

OpenStreetMap APIs have generous rate limits:
- **Nominatim**: 1 request per second
- **OSRM**: No strict limits for reasonable usage
- **Tiles**: Very generous for personal projects

For production apps, consider:
- Implementing caching
- Adding delays between requests
- Using a proxy service if needed

## 🌍 Alternative APIs

If you need higher limits or different features:

### 1. **Mapbox** (Free tier available)
- 50,000 map loads per month
- Better geocoding accuracy
- Requires API key

### 2. **Google Maps** (Free tier available)
- 28,500 map loads per month
- Excellent geocoding
- Requires credit card verification

### 3. **Here Maps** (Free tier available)
- 250,000 transactions per month
- Good routing features
- Requires API key

## 📊 Usage Statistics

Track your API usage:
```typescript
// Simple usage tracking
const apiUsage = {
  geocoding: 0,
  routing: 0,
  places: 0
};

// Track each API call
const trackUsage = (apiType: keyof typeof apiUsage) => {
  apiUsage[apiType]++;
  console.log(`API Usage:`, apiUsage);
};
```

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**
   - OpenStreetMap APIs support CORS
   - If issues occur, check your browser settings

2. **Rate Limiting**
   - Implement delays between requests
   - Add error handling for 429 responses

3. **No Results**
   - Try different search terms
   - Check coordinate accuracy
   - Verify place names

## 📚 Additional Resources

- [OpenStreetMap Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/)
- [OSRM Routing API](http://project-osrm.org/docs/v5.24.0/api/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [React Leaflet](https://react-leaflet.js.org/)

## 🎉 Benefits of OpenStreetMap

✅ **Completely Free** - No credit card required
✅ **No API Keys** - Simple to implement
✅ **Generous Limits** - Perfect for personal projects
✅ **Open Source** - Community-driven
✅ **Global Coverage** - Worldwide data
✅ **Regular Updates** - Fresh map data

## 🚀 Next Steps

1. **Test the features** - Try searching for addresses in Munnar
2. **Customize styling** - Modify colors and layouts
3. **Add more features** - Implement additional OpenStreetMap APIs
4. **Optimize performance** - Add caching and debouncing
5. **Deploy your app** - Share with others!

---

**Happy Mapping! 🗺️** 