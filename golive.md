# Go-live: App Store (this weekend) — Confirmed

Expo SDK **54** · React Native **0.81** · Bundle ID **`com.lsdstudios.confirmed-app`**

Use this as a single checklist. Check boxes as you go.

---

## Before you build (Friday / Saturday morning)

- [ ] **Physical device QA** — Install a release-style build on a real iPhone (not only Simulator). First launch: onboarding / Continue to tabs. Tap every tab: Home, Create New, History, Settings; **How to use** from Settings; Edit Confirmations; theme switch; delete-all flow; rotation if you care about iPad (`supportsTablet: true`).
- [ ] **Versioning** — In `app.json`: bump `expo.version` (e.g. `1.0.0` → `1.0.1` for a fix). For store submissions you need a **new build number** each upload; with EAS, add `"ios": { "buildNumber": "1" }` under `expo` or use EAS `autoIncrement` in `eas.json` so each production build increments.
- [ ] **Display name** — `expo.name` is set to **Confirmed** in `app.json` (home screen label). Store listing name is still set in App Store Connect.
- [ ] **Icons & splash** — `assets/icon.png` must work at small sizes; App Store needs a **1024×1024** icon (Expo/EAS can generate from source if configured). Splash: `splash-icon.png` + `backgroundColor` look correct on a notched device.
- [ ] **No stray dev surfaces** — `SettingsDebug` is not in navigation (good). Keep debug `Button`s / `logAll` commented out for the build you submit (already commented in `Settings.js`).
- [ ] **Privacy (App Store Connect)** — This app uses **on-device storage** (AsyncStorage) and **no sign-in**; data is not sent to your servers. In **App Privacy**, declare what stays on device. **Privacy Policy URL** is required — describe local storage and contact.
- [ ] **Support URL** — Required; can be same domain as privacy or a simple contact/support page.
- [ ] **Export compliance** — In App Store Connect, encryption questions: standard HTTPS-only apps usually qualify for **exempt** / **no** custom encryption filing; answer truthfully after reading Apple’s wording for your binary.

---

## One-time: EAS + Apple

- [ ] **Expo account** — [expo.dev](https://expo.dev) account linked to this project.
- [ ] **Apple Developer** — Paid program active; you’re on the correct **Team** for signing.
- [ ] **Install EAS CLI** — `npm install -g eas-cli` then `eas login`.
- [ ] **Link project** — From the repo root: `eas init` (if not linked). The repo includes **`eas.json`** with **production** (`autoIncrement` for iOS). Put your **`appleId`** and **`ascAppId`** in `eas.json` before non-interactive `eas submit`, or enter them when prompted.

---

## App Store Connect (Saturday)

- [ ] **New App** — [App Store Connect](https://appstoreconnect.apple.com) → **My Apps** → **+** → **New App**: iOS, name, language, bundle ID **`com.lsdstudios.confirmed-app`** (must match `app.json`), unique **SKU**.
- [ ] **Copy `ascAppId`** — Numeric ID from the app’s URL or App Information; put it in `eas.json` → `submit.production.ios.ascAppId` if you use `eas submit`.
- [ ] **Screenshots** — At minimum, **6.7"** (and any other sizes Apple marks required for your chosen devices). Capture from Simulator (Window → Device Bezels) or device; light + dark if you want to show both themes.
- [ ] **Metadata** — Subtitle, description, keywords, category, age rating questionnaire, **Promotional Text** (optional).
- [ ] **App Review notes** — Short note: “No login. All data is local on device.” If anything is non-obvious (e.g. haptics), one sentence helps.

---

## Build & upload (Saturday / Sunday)

- [ ] **Sanity check** — `npx expo-doctor` (fix anything critical).
- [ ] **Production build** — `eas build --platform ios --profile production`
- [ ] **Wait for success** — Download `.ipa` only if you need it; otherwise rely on cloud build.
- [ ] **Submit** — `eas submit --platform ios` (pick the new build), **or** upload via Transporter/Xcode Organizer if you prefer.
- [ ] **Attach build** — In App Store Connect → your version → **Build** → select the uploaded build.

---

## Submission (Sunday)

- [ ] **Compliance** — Content rights, advertising identifier (if you don’t use ads/ATT, answer accordingly), export compliance.
- [ ] **Review information** — Contact phone, demo account **N/A** if no accounts.
- [ ] **Submit for Review**

---

## After you ship

- [ ] **Release** — Manual vs automatic release once approved.
- [ ] **Next update** — Bump `expo.version` and rely on `autoIncrement` (or bump `ios.buildNumber`) before the next `eas build`.

---

## Quick reference

| Item | Current / note |
|------|----------------|
| Bundle ID | `com.lsdstudios.confirmed-app` |
| Expo slug | `confirmed-app` |
| New Architecture | `newArchEnabled: true` — watch for any native-module edge cases on device |
| Backend / auth in repo | None in dependencies — privacy and review are simpler |

---

## Commands cheat sheet

```bash
eas login
eas init
eas build:configure
npx expo-doctor
eas build --platform ios --profile production
eas submit --platform ios
eas build:list
eas credentials
```

---

## If something fails

- **Signing / provisioning** — `eas credentials` → iOS → let EAS manage, with correct Apple team.
- **Bundle ID mismatch** — `app.json` → `expo.ios.bundleIdentifier` must equal the App ID in the Apple Developer portal / App Store Connect.
- **Invalid binary / missing compliance** — Re-read export compliance and privacy answers; resubmit metadata if Apple asks.
