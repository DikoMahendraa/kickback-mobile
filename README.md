# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Tech Stack

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Language:** TypeScript
- **UI:** React Native, NativeWind (Tailwind CSS for React Native)
- **Navigation:** Expo Router (built on top of React Navigation)
- **State Management:** Zustand, React's useState/useContext
- **Forms & Validation:** React Hook Form, Zod
- **Other Libraries:**
  - @shopify/flash-list (high-performance lists)
  - react-native-mmkv (fast key-value storage)
  - react-native-pell-rich-editor (rich text editor)
  - victory-native (charts)
  - Various Expo modules (expo-asset, expo-image, expo-haptics, etc.)

## Architecture

- **Project Structure:** Feature-based modular structure under `src/app`, with directories for authentication, onboarding, tabs, and more.
- **Routing:** File-based routing using Expo Router. Each screen is a file or folder under `src/app`.
- **Navigation:** Uses Expo Router (which leverages React Navigation under the hood) for stack, tab, and nested navigation.
- **State Management:** Local state is managed with React's `useState` and global/shared state with Zustand.
- **UI Components:** Custom UI components are organized under `src/components/ui` and `src/components/screen`.
- **API/Services:** Service logic is placed under `src/services`.
- **Assets:** Images, icons, and fonts are organized under `src/assets`.
- **Constants & Static Data:** Placed under `src/static`.

#### Example Architecture Diagram

```mermaid
graph TD
  A[App Entry (expo-router/entry)] --> B[File-based Routing (src/app)]
  B --> C1[(auth)]
  B --> C2[(onboarding)]
  B --> C3[(tabs)]
  B --> C4[(other features)]
  B --> D[UI Components (src/components)]
  B --> E[State Management (zustand, useState)]
  B --> F[Services/API (src/services)]
  B --> G[Assets (src/assets)]
  B --> H[Constants (src/static)]
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

   This will open the Expo Dev Tools in your browser, where you can:

   - Run the app on an Android emulator
   - Run the app on an iOS simulator
   - Use Expo Go on your physical device
   - Open the app in a web browser

3. Start developing

   You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, check out the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps:

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
