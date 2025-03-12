import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.revisewell.com',
  appName: 'Revisewell',
  webDir: 'out',
  server : {
    androidScheme : "https"
  },
  "ios": {
    "contentInset": "always"
  }
};

export default config;
