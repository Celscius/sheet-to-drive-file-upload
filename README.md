# Sheet to drive file upload
uploading file to drive from googlesheet with modal

## Installing
1. **Create the Google Apps Script Project on your googlesheet:**
2. **Copy the Code:** Navigate to the Code.gs (or relevant .gs and .js files) in the GitHub repository. Copy the raw code content.
3. **Paste into the Editor:** In the Google Apps Script editor, replace the existing Code.gs content with the copied code. If there are multiple files in the repository, create new script files in the editor with the corresponding names and paste the respective code.
4. **create config file:** and add this code in respective fire or you can just put it in the same file if you want
```
// e.g Config.gs
const CONFIG = {
  sheetName: "your-sheet-name",
  driveDirectory: "your-google-drive-url"
  menu:[
    { label: "upload file", functionName: "showUploadModal" }
    { label: "google drive directory", functionName: "showDriveUrl" }
  ]
}
```
to handle list menu in google sheet
```
// e.g menu.gs
function showUploadModal() {
  new Modal({
    title: "upload file"
  })
}

function showAlertWithText() {
  const = SpreadsheetApp.getUi();
  ui.alert(
    'google drive directory', // Title of the dialog
    CONFIG.driveDirectory, // Message to display
    ui.ButtonSet.OK // Button(s) to display
  );
}
```
5. **Save the Project:** Click the Save icon to save your project
6. **Configure Permissions (if necessary):** The first time the script runs, the user will be prompted to review and authorize permissions for the script to access their Google services.
7. **Run/Deploy:** Depending on the project's purpose (e.g., a custom function in a Sheet, a web app, or an add-on), the user will need to run a specific function (like onOpen()) or deploy it as a web app/API executable via the Deploy > New deployment menu in the editor. 
