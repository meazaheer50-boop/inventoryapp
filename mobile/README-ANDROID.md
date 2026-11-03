# Everafter Inventory – Android project (Capacitor)

Open the **android** folder in Android Studio (File > Open > pick `android`).
Requires Android Studio Ladybug (2024.2) or newer with JDK 21 (bundled). Let Gradle sync finish (first time downloads dependencies), then press Run on a phone or emulator.

Build an installable APK: Build > Build Bundle(s) / APK(s) > Build APK(s). The file is in `android/app/build/outputs/apk/debug/`.

## Updating the app after the web app changes
Copy the new `index.html`, `version.json`, `sw.js` into `www/` (or run `npm run sync` after placing them), then in a terminal in this folder run `npx cap sync android` and rebuild.
(`npm install` once first.)

The app works offline. Sync uses your Google Apps Script URL and access key from Settings.
Camera photos: allow the Camera permission when asked.
