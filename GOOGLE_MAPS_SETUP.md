# Google Maps Directions API Setup Guide

This guide will help you set up the Google Maps Directions API for the transportation features in your Munnar Hotel Recommender.

## 🚗 Features Added

- **Route calculation** between hotels and tourist spots
- **Multiple transportation modes**: Car, Walking, Public Transport
- **Travel time estimates** and distance calculations
- **Step-by-step directions**
- **Interactive route visualization**

## 📋 Prerequisites

1. **Google Cloud Account** (free tier available)
2. **Credit Card** (for verification, but free tier includes $200 credit)
3. **Node.js** and **npm** installed

## 🔧 Setup Steps

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "Munnar Hotel Recommender")
4. Click "Create"

### Step 2: Enable APIs

1. In your project, go to **APIs & Services** > **Library**
2. Search for and enable these APIs:
   - **Directions API**
   - **Maps JavaScript API**
   - **Places API** (optional, for future features)

### Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **"Create Credentials"** > **"API Key"**
3. Copy the generated API key
4. **Important**: Click on the API key to configure it:
   - Set **Application restrictions** to "HTTP referrers"
   - Add your domain: `localhost:3000/*` (for development)
   - Set **API restrictions** to only the APIs you enabled

### Step 4: Add API Key to Your App

1. Create a `.env` file in your project root:
```bash
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

2. Replace `your_api_key_here` with your actual API key

### Step 5: Install Google Maps Types (Optional)

For better TypeScript support:
```bash
npm install --save-dev @types/google.maps
```

## 🎯 Usage

The transportation features are now integrated into your app:

### In Hotel Cards
- Click on any hotel to see transportation options to tourist spots
- View estimated travel times and distances
- Get step-by-step directions

### Transportation Modes
- **🚗 Car**: Fastest route by car
- **🚶 Walking**: Pedestrian-friendly routes
- **🚌 Public Transport**: Bus and local transport options

## 🔒 Security Best Practices

1. **Restrict API Key**: Always set HTTP referrer restrictions
2. **Monitor Usage**: Check Google Cloud Console for usage
3. **Environment Variables**: Never commit API keys to version control
4. **Production**: Update referrer restrictions for your live domain

## 💰 Pricing

- **Free Tier**: $200 credit per month
- **Directions API**: $5 per 1000 requests
- **Maps JavaScript API**: $7 per 1000 map loads
- **Places API**: $17 per 1000 requests

## 🚀 Next Steps

Once you have the API key set up:

1. **Test the features**: Try calculating routes between hotels and tourist spots
2. **Customize styling**: Modify the transportation component styles
3. **Add more features**: Consider adding:
   - Real-time traffic information
   - Alternative routes
   - Public transport schedules
   - Parking information

## 🐛 Troubleshooting

### Common Issues:

1. **"Google Maps API not loaded"**
   - Check if API key is correct
   - Verify APIs are enabled in Google Cloud Console

2. **"Quota exceeded"**
   - Check your usage in Google Cloud Console
   - Consider upgrading your plan

3. **"Referrer not allowed"**
   - Update HTTP referrer restrictions in API key settings
   - Add your domain to allowed referrers

4. **TypeScript errors**
   - Install `@types/google.maps` package
   - Check import statements

## 📞 Support

- **Google Cloud Support**: [Cloud Console Help](https://cloud.google.com/support)
- **API Documentation**: [Google Maps Platform](https://developers.google.com/maps/documentation)
- **Billing Support**: [Google Cloud Billing](https://cloud.google.com/billing/docs)

## 🎉 Success!

Once everything is set up, your app will show:
- Transportation options for each hotel
- Estimated travel times
- Step-by-step directions
- Interactive route visualization

The transportation features will make your hotel recommender much more practical for travelers planning their Munnar trip! 