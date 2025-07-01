# Tech Challenge 4 📱

This is a React Native application built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/) for navigation. The project was created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and features a tab-based navigation structure.

## Project Structure

The app uses Expo Router's file-based routing with a tab navigation layout:

```
app/
├── _layout.tsx          # Root layout with Stack navigation
└── (tabs)/             # Tab group
    ├── _layout.tsx     # Tab navigation layout
    ├── index.tsx       # Home screen (posts display)
    └── admin.tsx       # Admin screen
```

## Features

- **Tab Navigation**: Two main tabs - Home and Admin
- **Home Screen**: Designed to display posts (currently shows placeholder text)
- **Admin Screen**: Administrative interface
- **TypeScript Support**: Full TypeScript configuration
- **ESLint**: Code linting with Expo-specific rules

## Get Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run web` - Start the app on web
- `npm run lint` - Run ESLint to check code quality

## Development

The main application logic is located in the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/) with Expo Router.

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe JavaScript
- **Expo Vector Icons**: Icon library (FontAwesome icons used in tabs)

## Configuration

The app is configured with:
- Portrait orientation
- Support for iOS tablets
- Edge-to-edge enabled on Android
- Web support with Metro bundler
- Splash screen configuration
- Adaptive icons for Android

## Learn More

To learn more about the technologies used in this project:

- [Expo Documentation](https://docs.expo.dev/): Learn fundamentals and advanced topics
- [Expo Router Guide](https://docs.expo.dev/router/introduction/): File-based routing system
- [React Native Documentation](https://reactnative.dev/): Core React Native concepts
- [TypeScript Documentation](https://www.typescriptlang.org/): Type-safe JavaScript

## Community

- [Expo on GitHub](https://github.com/expo/expo): View the open source platform
- [Discord Community](https://chat.expo.dev): Chat with Expo developers
- [React Native Community](https://reactnative.dev/community/overview): Connect with React Native developers
