import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lookttery.app',
  appName: 'Lookttery',
  webDir: 'dist/core-shell',
  server: {
    androidScheme: 'http',
    allowNavigation: ['*'],
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
