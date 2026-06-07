# Mobile App Deployment Guide
## Elite Chauffeurs — Customer App & Driver App

---

## Step 1 — Create Developer Accounts

### Apple Developer (iOS)
1. Go to https://developer.apple.com/enroll
2. Sign in with your Apple ID (or create one with australiachauffeurs@gmail.com)
3. Enroll as **Individual** or **Organisation**
4. Pay $99 AUD/year
5. Wait for approval (usually 24–48 hours)

### Google Play Developer (Android)
1. Go to https://play.google.com/console/signup
2. Sign in with australiachauffeurs@gmail.com
3. Pay $25 USD one-time fee
4. Fill in developer profile details
5. Approval is usually instant

---

## Step 2 — Install EAS CLI

Open a terminal and run:
```bash
npm install -g eas-cli
eas login
```
Login with your **Expo account** (create one free at expo.dev if you don't have one).

---

## Step 3 — Create Expo Projects

For each app, run in the respective folder:

### Customer App
```bash
cd apps/mobile
eas init
```
Copy the `projectId` it gives you and paste it into `apps/mobile/app.json` under `extra.eas.projectId`

### Driver App
```bash
cd apps/driver
eas init
```
Copy the `projectId` and paste it into `apps/driver/app.json` under `extra.eas.projectId`

---

## Step 4 — Add App Store Details

### In `apps/mobile/eas.json` — fill in:
```json
"ios": {
  "appleId": "australiachauffeurs@gmail.com",
  "ascAppId": "YOUR_APP_STORE_CONNECT_APP_ID",  ← get from App Store Connect
  "appleTeamId": "YOUR_TEAM_ID"                  ← get from developer.apple.com
}
```

### For Android — Download Service Account Key:
1. Go to Google Play Console → Setup → API access
2. Create a service account → Download JSON key
3. Save as `apps/mobile/google-service-account.json`
4. Same for driver: `apps/driver/google-service-account.json`

---

## Step 5 — Build the Apps

### Customer App (both iOS + Android at once):
```bash
cd apps/mobile
eas build --platform all --profile production
```

### Driver App:
```bash
cd apps/driver
eas build --platform all --profile production
```

Build takes ~15–20 minutes in Expo's cloud. You'll get a link to download the built files.

---

## Step 6 — Submit to Stores

### Customer App:
```bash
cd apps/mobile
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

### Driver App:
```bash
cd apps/driver
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

---

## Step 7 — Store Listings

### App Store Connect (iOS)
1. Go to https://appstoreconnect.apple.com
2. Fill in app description, screenshots, keywords
3. Submit for review — **Apple takes 1–3 business days**

### Google Play Console (Android)
1. Go to https://play.google.com/console
2. Complete store listing (description, screenshots, content rating)
3. Submit for review — **Google takes a few hours to 3 days**

---

## App Store Details to Prepare

### Customer App — "Elite Chauffeurs"
- **Category**: Travel / Transportation
- **Description**: Premium chauffeur service across Australia. Book luxury sedans, SUVs, limousines and more with real-time driver tracking.
- **Keywords**: chauffeur, luxury, transport, airport transfer, limousine, sedan, driver

### Driver App — "Elite Chauffeurs Driver"
- **Category**: Business / Navigation
- **Description**: Driver app for Elite Chauffeurs. Accept jobs, navigate to pickups, track earnings and manage your schedule.
- **Keywords**: driver, chauffeur, jobs, transport, earn

---

## Testing Before Submission

### Android Preview Build (no Play Store account needed):
```bash
cd apps/mobile
eas build --platform android --profile preview
```
This creates a downloadable APK you can install directly on any Android phone.

### iOS Simulator Build:
```bash
cd apps/mobile
eas build --platform ios --profile development
```

---

## Update App After Launch

When you make code changes:
```bash
# Minor updates (no native code changes) — instant OTA update:
eas update --channel production --message "Fix booking screen"

# Major updates (new native packages) — full rebuild:
eas build --platform all --profile production
eas submit --platform all --profile production
```

---

## Bundle IDs Reference

| App | iOS Bundle ID | Android Package |
|-----|--------------|-----------------|
| Customer | com.au.elitechauffeurs.app | com.au.elitechauffeurs.app |
| Driver | com.au.elitechauffeurs.driver | com.au.elitechauffeurs.driver |

---

## Support
If you hit any issues, the EAS documentation is at: https://docs.expo.dev/eas/
