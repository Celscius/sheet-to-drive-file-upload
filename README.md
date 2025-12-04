# Sheet to drive file upload
uploading file to drive from googlesheet using google appscript

## Installing
1. **Create the Google Apps Script Project on your googlesheet:**
2. **Copy the Code Paste into the Editor:** Navigate to the Code on app directory in the GitHub repository. create new file with the corresponding names on google appscript Copy the raw code content and paste the respective code .
3. **create config file:** and add this code in respective fire or you can just put it in the same file if you want
google appscript for handling upload file configuration
```
// e.g Config.gs
const CONFIG = {
  sheetName: "your-sheet-name",
  driveDirectory: "your-google-drive-url"
  menu: [
    { label: 'upload file', functionName: 'showUploadFileModal' },
    { label: 'google drive directory', functionName: 'showDriveDirectoryUrl' },
  ]
}
```
google appscript file to handle upload file 
```
// e.g menu.gs
function showUploadFileModal () { 
  new Modal({})
}

function showDriveDirectoryUrl () {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'google drive directory', // Title of the dialog
    CONFIG.driveDirectory, // Message to display
    ui.ButtonSet.OK // Button(s) to display
  );
}
```
4. **Save the Project:** Click the Save icon to save your project
6. **Configure Permissions:** The first time the script runs, the user will be prompted to review and authorize permissions for the script to access their Google services.
7. **Run:**  the user will need to run a new menu that appear in google sheet, use that new menu to run the app
