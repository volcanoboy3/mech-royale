# Mech Royale App Store Checklist

The iPhone project is in `ios/App/App.xcodeproj`. The game is packaged with
Capacitor, uses a full-screen landscape layout, respects iPhone safe areas, and
has dual touch joysticks.

## 1. Finish Apple Setup

- Install the full Xcode app from the Mac App Store.
- Join the [Apple Developer Program](https://developer.apple.com/programs/enroll/).
  The account holder must be old enough to
  enter a legal agreement. If Isaac is not old enough, his dad should be the
  account holder and can add Isaac to the developer team.
- Open `ios/App/App.xcodeproj` in Xcode.
- Select the **App** project, open **Signing & Capabilities**, and choose the
  family developer team.
- Keep the bundle identifier as `com.volcanoboy3.mechroyale`, unless a different
  permanent identifier is chosen before the first App Store upload.

## 2. Test On An iPhone

1. Connect an iPhone to the Mac and trust the computer.
2. Choose that iPhone as the run destination in Xcode.
3. Press Run and test every menu, both joysticks, shooting, pause, sound,
   saving, match endings, and relaunching the app.
4. Test once with Wi-Fi off. Offline CPU matches and device saving should still
   work. Accounts and online players need internet.

After changing the web game, refresh the native copy before opening Xcode:

```bash
npm install
npm run ios:sync
```

## 3. Prepare The Store Listing

- App name: **Mech Royale**
- Bundle ID: `com.volcanoboy3.mechroyale`
- Version: `1.0`
- Build: `1`
- Add an age rating and answer the violence, chat, ads, and user-content
  questions honestly.
- Create landscape iPhone screenshots from real gameplay and menus.
- Provide a support URL and a public privacy-policy URL.
- Explain account data accurately if Supabase accounts are enabled, including
  email addresses, usernames, cloud saves, and any third-party services.
- Complete Apple's [app privacy details](https://developer.apple.com/app-store/app-privacy-details/)
  and review the current [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).

## 4. Purchases And Ads

The iPhone build intentionally hides the web Stripe pack shop and disables the
web ad experience. Digital coins, guns, and mechs sold inside an iPhone app must
use Apple's in-app purchase system. Add StoreKit purchases in a later release;
do not put Stripe payment links back into the iPhone build.

Before enabling a real ad network, add its iOS SDK properly, review its tracking
and child-safety rules, update the privacy answers, and test the consent flow.

## 5. Upload A Test Build

1. In Xcode, set the destination to **Any iOS Device (arm64)**.
2. Choose **Product > Archive**.
3. In Organizer, choose **Distribute App > App Store Connect > Upload**.
4. In App Store Connect, add the build to TestFlight.
5. Test through TestFlight before sending version 1.0 to App Review.

Apple's [upload guide](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds)
has the current Xcode and App Store Connect requirements.

The current Mac has Apple Command Line Tools but not the full Xcode app, so the
native project cannot be compiled or run in the iPhone Simulator until Xcode is
installed.
