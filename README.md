# 🏔️ Munnar Hotel Recommender

A smart hotel recommendation system for Munnar, Kerala that helps tourists find the perfect accommodation based on their preferred tourist spots, budget, and preferences.

## ✨ Features

- **Smart Recommendations**: Personalized hotel suggestions based on selected tourist spots
- **Interactive Map**: Visual representation of hotels and tourist spots
- **Advanced Filtering**: Filter by price range, minimum rating, and amenities
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for better user experience
- **Batch Hotel Images**: Generic hotel images fetched from Pixabay and distributed across cards
- **Tourist Spot Integration**: 8 popular tourist destinations in Munnar
- **Detailed Analysis**: View recommendation scores and reasoning

## 🚀 Live Demo

🌐 **Live App**: [https://munnar-hotel-recommender-git-main-mais-projects-9bd3007b.vercel.app](https://munnar-hotel-recommender-git-main-mais-projects-9bd3007b.vercel.app)

## 📱 Mobile App

Download the Android APK: `munnar-hotel-app.apk`

## 🛠️ Technologies Used

- **Frontend**: React.js (TypeScript or JavaScript)
- **Styling**: CSS3 with responsive design
- **Maps**: Google Maps integration
- **Images**: Pixabay API (generic hotel images)
- **Mobile**: Capacitor for Android app
- **Deployment**: Vercel (web), APK (mobile)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **Android Studio** (for mobile development - optional)

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/munnar-hotel-recommender.git
cd munnar-hotel-recommender
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your Pixabay API Key

Edit `src/services/pixabayImageService.ts` and replace `YOUR_PIXABAY_API_KEY` with your actual Pixabay API key:

```js
const PIXABAY_API_KEY = 'YOUR_PIXABAY_API_KEY';
```

### 4. Start Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## 📱 Mobile Development

### Prerequisites for Mobile
- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK)

### Build Android App

```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Add Android platform
npx cap add android

# Sync web assets
npx cap sync

# Build the app
cd android
./gradlew assembleDebug
```

The APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Run on Android Device/Emulator

```bash
npx cap run android
```

## 🏗️ Project Structure

```
munnar-hotel-recommender/
├── public/
│   ├── images/          # (Optional) Local hotel images
│   └── index.html
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Styles
│   ├── data.ts          # Hotel and tourist spot data
│   ├── MapView.tsx      # Map component
│   ├── components/      # UI components (HotelCard, Map, etc.)
│   ├── services/        # API and utility services
│   └── index.tsx        # Entry point
├── android/             # Android project files
├── capacitor.config.ts  # Capacitor configuration
└── package.json
```

## 🎯 How to Use

1. **Select Tourist Spots**: Choose at least 5 tourist spots you want to visit
2. **Set Filters**: Adjust price range and minimum rating
3. **Get Recommendations**: Click "Get Hotel Recommendations" to get personalized suggestions
4. **View Details**: See hotel information, amenities, and scores
5. **Map View**: Toggle map view to see hotel locations
6. **Analysis**: View detailed scoring breakdown

## 🏨 Hotel Data & Images

- The app includes 20 real hotels in Munnar with:
  - Authentic hotel names and locations
  - Realistic pricing (₹2,200 - ₹5,800 per night)
  - Actual amenities and features
  - Accurate ratings
- **Images:** Hotel cards display generic hotel images fetched from Pixabay. These are not actual photos of the hotels, but ensure a visually appealing experience.

## 🗺️ Tourist Spots

8 popular destinations in Munnar:
- Eravikulam National Park
- Mattupetty Dam
- Tea Museum
- Top Station
- Kundala Lake
- Attukad Waterfalls
- Pothamedu View Point
- Chinnar Wildlife Sanctuary

## 🚀 Deployment

### Web Deployment (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

### Mobile Deployment

1. Build the APK: `./gradlew assembleDebug`
2. Share the APK file with users
3. Users can install directly on Android devices

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (for Google Maps, if used):

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Capacitor Configuration

Edit `capacitor.config.ts` to customize app settings:

```typescript
const config: CapacitorConfig = {
  appId: 'com.munnarhotels.app',
  appName: 'Munnar Hotel Recommender',
  webDir: 'build',
  // ... other settings
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Make sure all dependencies are installed
   ```bash
   npm install
   ```
2. **Images not loading**: Ensure your Pixabay API key is set and valid in `pixabayImageService.ts`
3. **Mobile app not working**: Ensure Android Studio is properly configured
4. **Map not showing**: Verify Google Maps API key is set

### Development Tips

- Use `npm start` for development
- Use `npm run build` for production build
- Check browser console for errors
- Test on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Maitreyee** - [GitHub Profile](https://github.com/Maitreyeech17)

## 🙏 Acknowledgments

- Munnar tourism data
- Hotel information and images
- Tourist spot coordinates
- Pixabay for hotel images
- React and Capacitor communities

---

**Made with ❤️ for Munnar tourism** 