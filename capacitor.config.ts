import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.munnarhotels.app',
  appName: 'Munnar Hotel Recommender',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4a7c59",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config; 