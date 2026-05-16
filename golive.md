# App Store go-live checklist (Confirmed / Expo)

- [ ] **Apple Developer Program** — Paid membership active ([developer.apple.com](https://developer.apple.com/programs/)).
- [ ] **App Store Connect** — Create the app listing (name, bundle ID `com.lsdstudios.confirmed-app`, primary language, SKU).
- [ ] **`eas.json`** — Replace `YOUR_APPLE_ID_EMAIL` and `YOUR_APP_STORE_CONNECT_APP_ID` under `submit.production.ios` with your real values.
- [ ] **Version** — Bump `expo.version` in `app.json` when you ship meaningful updates (EAS can auto-increment build numbers for production).
- [ ] **Production build** — Run: `eas build --platform ios --profile production` and wait for the `.ipa` (or download from the EAS dashboard).
- [ ] **Test on a real device** — Install the production build (TestFlight internal testing is fine) and click through main flows.
- [ ] **App Store listing** — Screenshots, description, privacy policy URL, age rating questionnaire, export compliance (you already set `ITSAppUsesNonExemptEncryption: false` in `app.json`).
- [ ] **Submit** — Run: `eas submit --platform ios --profile production` (or upload the build manually in App Store Connect).
- [ ] **App Review** — Answer any messages in App Store Connect; after approval, release manually or automatically per your Connect settings.

That’s it. For deeper detail, see [Expo: Submit to the Apple App Store](https://docs.expo.dev/submit/ios/).
