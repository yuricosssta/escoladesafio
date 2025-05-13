// App.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
     <RootNavigator />
        {/* <MainNavigator /> */}
        
     

      {/* Simplesmente passamos callbacks via Context ou props */}
      {/* No AuthNavigator/LoginScreen: */}
      {/*   onLoginSuccess={() => setIsLoggedIn(true)} */}
      {/* No MainNavigator/SettingsScreen: */}
      {/*   onLogout={() => setIsLoggedIn(false)} */}
    </NavigationContainer>
  );
}



// import { Assets as NavigationAssets } from '@react-navigation/elements';
// import { Asset } from 'expo-asset';
// import * as SplashScreen from 'expo-splash-screen';
// import * as React from 'react';
// import { Navigation } from './src/navigation';

// Asset.loadAsync([
//   ...NavigationAssets,
//   require('./assets/newspaper.png'),
//   require('./assets/bell.png'),
// ]);

// SplashScreen.preventAutoHideAsync();

// export function App() {
//   return (
//     <Navigation
//       linking={{
//         enabled: 'auto',
//         prefixes: [
//           // Change the scheme to match your app's scheme defined in app.json
//           'helloworld://',
//         ],
//       }}
//       onReady={() => {
//         SplashScreen.hideAsync();
//       }}
//     />
//   );
// }
