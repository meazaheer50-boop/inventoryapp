# Everafter Inventory - Windows app

Same app as the web version, packaged as a Windows installer. It works offline, syncs with your Google Sheet,
and updates itself when a new version is published.

## Get the installer (no installs on your PC)
1. Create a free GitHub account and a new **public** repository (for example `everafter-inventory`).
   The repository holds only the app's code. Your sync URL and access key are typed into the app and are never stored here.
2. Upload everything in this folder to the repository (keep the `.github` folder and `app`, `build` folders).
3. In the repository open **Releases > Draft a new release**, type the tag **v1.0.0**, choose "Create new tag", and publish.
4. Open the **Actions** tab. A run called "Build Windows app" starts and takes about 5 minutes.
5. When it finishes, the installer `Everafter Inventory Setup 1.0.0.exe` is attached to the release. Download and run it.
   Windows may show a "Windows protected your PC" screen because the app is not code-signed: click **More info > Run anyway**.

## Or build it on your Windows PC
Install Node.js, open a terminal in this folder, then run `npm install` and `npm run dist`.
The installer appears in the `dist` folder.

## Publishing an update
1. Replace `app/index.html` with the new version (and any other changed files).
2. In `package.json` raise the `version` (1.0.0 to 1.0.1).
3. Create a new release with the matching tag (v1.0.1).
GitHub builds it, and every installed copy downloads the update next time it starts and installs it when the app is closed.
Installed copies keep their data, because data lives on the device and in your Google Sheet.

## First run
Settings > Sync: paste the Apps Script web app URL and access key, name the device, press Save and sync.
