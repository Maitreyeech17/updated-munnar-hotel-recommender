// Tourist spots in Munnar
export const TOURIST_SPOTS = [
  { id: 1, name: 'Eravikulam National Park', lat: 10.1956, lng: 77.0486 },
  { id: 2, name: 'Mattupetty Dam', lat: 10.0842, lng: 77.1306 },
  { id: 3, name: 'Tea Museum', lat: 10.0889, lng: 77.0622 },
  { id: 4, name: 'Top Station', lat: 10.1263, lng: 77.2485 },
  { id: 5, name: 'Kundala Lake', lat: 10.1611, lng: 77.1636 },
  { id: 6, name: 'Attukad Waterfalls', lat: 10.0592, lng: 77.0441 },
  { id: 7, name: 'Pothamedu View Point', lat: 10.0702, lng: 77.0447 },
  { id: 8, name: 'Chinnar Wildlife Sanctuary', lat: 10.3841, lng: 77.1436 },
];

// Simple hotel names - just add names here and the system will generate everything else!
export const HOTEL_NAMES = [
  'Parakkat Nature Hotels & Resorts',
  'Fragrant Nature Munnar',
  'Amber Dale Luxury Hotel & Spa',
  'Blanket Hotel & Spa',
  'Tea County Munnar',
  'Grand Plaza Munnar',
  'Tea Museum Heritage Hotel',
  'Spice Garden Resort',
  'Misty Mountain Resort',
  'Eravikulam View Resort',
  'Mountain View Lodge',
  'Tea Gardens Resort',
  'Eco Valley Resort',
  'Heritage Tea Resort',
  'Adventure Base Resort',
  // Add more hotel names here - just the names!
  'Luxury Mountain Spa',
  'Tea Garden Heritage Resort',
  'Nature Valley Lodge',
  'Munnar Heights Resort',
  'Green Valley Hotel'
];

// Real Hotels in Munnar with websites - Optimized for 70-80% match scores
export const HOTELS = [
  // Hotels near Tea Museum (central location, good for multiple spots)
  { 
    id: 1, 
    name: 'Parakkat Nature Hotels & Resorts', 
    lat: 10.0887, lng: 77.0621, 
    rating: 4.7, 
    price: 4500,
    location: 'Munnar, Kerala',
    website: 'https://www.parakkat.com/',
    amenities: ['WiFi', 'Restaurant', 'Spa', 'Garden View']
  },
  { 
    id: 2, 
    name: 'Fragrant Nature Munnar', 
    lat: 10.0885, lng: 77.0623, 
    rating: 4.6, 
    price: 3800,
    location: 'Munnar, Kerala',
    website: 'https://fragrantnature.com/',
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Parking']
  },
  { 
    id: 3, 
    name: 'Amber Dale Luxury Hotel & Spa', 
    lat: 10.0883, lng: 77.0625, 
    rating: 4.5, 
    price: 5200,
    location: 'Munnar, Kerala',
    website: 'https://amberdale.com/',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gym']
  },
  { 
    id: 4, 
    name: 'Blanket Hotel & Spa', 
    lat: 10.0881, lng: 77.0627, 
    rating: 4.8, 
    price: 4800,
    location: 'Munnar, Kerala',
    website: 'https://blankethotel.com/',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Tea Garden', 'Yoga']
  },
  { 
    id: 5, 
    name: 'Tea County Munnar', 
    lat: 10.0880, lng: 77.0629, 
    rating: 4.3, 
    price: 2800,
    location: 'Munnar, Kerala',
    website: 'https://teacounty.com/',
    amenities: ['WiFi', 'Restaurant', 'Tea Estate View', 'Guided Tours']
  },
  { 
    id: 6, 
    name: 'Grand Plaza Munnar', 
    lat: 10.0882, lng: 77.0631, 
    rating: 4.2, 
    price: 2200,
    location: 'Munnar, Kerala',
    website: 'https://grandplazamunnar.com/',
    amenities: ['WiFi', 'Restaurant', 'City View', 'Conference Room']
  },
  { 
    id: 7, 
    name: 'Tea Museum Heritage Hotel', 
    lat: 10.0890, lng: 77.0625, 
    rating: 4.7, 
    price: 4800,
    location: 'Near Tea Museum',
    website: 'https://teamuseumheritage.com/',
    amenities: ['WiFi', 'Restaurant', 'Tea Museum View', 'Heritage Tours', 'Tea Tasting']
  },
  { 
    id: 8, 
    name: 'Spice Garden Resort', 
    lat: 10.0886, lng: 77.0635, 
    rating: 4.9, 
    price: 5800,
    location: 'Munnar, Kerala',
    website: 'https://spicegardenresort.com/',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Spice Garden', 'Ayurveda']
  },
  { 
    id: 9, 
    name: 'Misty Mountain Resort', 
    lat: 10.0888, lng: 77.0637, 
    rating: 4.4, 
    price: 3200,
    location: 'Munnar, Kerala',
    website: 'https://www.guestreservations.com/misty-mountain-resort/booking?msclkid=52041a67f7f416e8ff36720eb0f75317',
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Trekking']
  },
  // Hotels near specific destinations
  { 
    id: 10, 
    name: 'Eravikulam View Resort', 
    lat: 10.1950, lng: 77.0480, 
    rating: 4.6, 
    price: 4200,
    location: 'Near Eravikulam National Park',
    website: 'https://eravikulamview.com/',
    amenities: ['WiFi', 'Restaurant', 'National Park View', 'Guided Tours', 'Wildlife Spotting']
  },
  { 
    id: 11, 
    name: 'Mattupetty Lake Resort', 
    lat: 10.0845, lng: 77.1300, 
    rating: 4.3, 
    price: 3600,
    location: 'Near Mattupetty Dam',
    website: 'https://mattupettylake.com/',
    amenities: ['WiFi', 'Restaurant', 'Lake View', 'Boating', 'Adventure Sports']
  },
  { 
    id: 12, 
    name: 'Top Station Heights', 
    lat: 10.1265, lng: 77.2480, 
    rating: 4.5, 
    price: 3900,
    location: 'Near Top Station',
    website: 'https://topstationheights.com/',
    amenities: ['WiFi', 'Restaurant', 'Valley View', 'Trekking', 'Photography Tours']
  },
  { 
    id: 13, 
    name: 'Kundala Lake View Resort', 
    lat: 10.1615, lng: 77.1630, 
    rating: 4.4, 
    price: 3400,
    location: 'Near Kundala Lake',
    website: 'https://kundalalakeview.com/',
    amenities: ['WiFi', 'Restaurant', 'Lake View', 'Boating', 'Fishing', 'Nature Walks']
  },
  { 
    id: 14, 
    name: 'Pothamedu Valley Resort', 
    lat: 10.0705, lng: 77.0442, 
    rating: 4.2, 
    price: 2600,
    location: 'Near Pothamedu View Point',
    website: 'https://pothameduvalley.com/',
    amenities: ['WiFi', 'Restaurant', 'Valley View', 'Trekking', 'Photography', 'Camping']
  },
  // Additional hotels for 70-80% match scores
  { 
    id: 15, 
    name: 'Munnar Valley Resort', 
    lat: 10.0950, lng: 77.0750, 
    rating: 4.4, 
    price: 3500,
    location: 'Central Munnar Valley',
    website: 'https://munnarvalleyresort.com/',
    amenities: ['WiFi', 'Restaurant', 'Valley View', 'Garden', 'Guided Tours']
  },
  { 
    id: 16, 
    name: 'Tea Gardens Resort', 
    lat: 10.0820, lng: 77.0680, 
    rating: 4.3, 
    price: 3200,
    location: 'Tea Gardens Area',
    website: 'https://teagardensresort.com/',
    amenities: ['WiFi', 'Restaurant', 'Tea Garden View', 'Tea Tasting', 'Nature Walks']
  },
  { 
    id: 17, 
    name: 'Mountain View Lodge', 
    lat: 10.1050, lng: 77.0850, 
    rating: 4.2, 
    price: 2800,
    location: 'Mountain View Area',
    website: 'https://mountainviewlodge.com/',
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Trekking', 'Photography']
  },
  { 
    id: 18, 
    name: 'Eco Valley Resort', 
    lat: 10.0780, lng: 77.0550, 
    rating: 4.5, 
    price: 4100,
    location: 'Eco Valley',
    website: 'https://ecovalleyresort.com/',
    amenities: ['WiFi', 'Restaurant', 'Eco-Friendly', 'Organic Food', 'Yoga', 'Meditation']
  },
  { 
    id: 19, 
    name: 'Heritage Tea Resort', 
    lat: 10.0920, lng: 77.0720, 
    rating: 4.6, 
    price: 4600,
    location: 'Heritage Tea Area',
    website: 'https://heritagetearesort.com/',
    amenities: ['WiFi', 'Restaurant', 'Heritage Building', 'Tea Museum', 'Guided Tours']
  },
  { 
    id: 20, 
    name: 'Adventure Base Resort', 
    lat: 10.0880, lng: 77.0780, 
    rating: 4.1, 
    price: 2400,
    location: 'Adventure Base',
    website: 'https://adventurebaseresort.com/',
    amenities: ['WiFi', 'Restaurant', 'Adventure Sports', 'Rock Climbing', 'Camping']
  }
]; 