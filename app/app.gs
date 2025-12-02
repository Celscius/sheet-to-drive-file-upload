// initiate spreadsheet ui to create alert message
const ui = SpreadsheetApp.getUi(); // Get the UI for Google Sheets

/**
 * all this function gonna be run in js file on html in sequential order
 * @returns {Object} - { success: boolean, message: string }
 */
function app(file){
  try{
    let createFile
    let appendRow

    // if file not found throw error
    if(!file) { return ui.alert('message', 'no file found', ui.ButtonSet.OK);}

    createFile = new DriveHandler({
      driveDirectory: CONFIG.driveDirectory,
      file
    })

    const createFileOnDrive = createFile.execute()
    if(!createFileOnDrive.success){ throw new Error(createFileOnDrive.message)}
    
    appendRow = new SheetHandler({
      data: createFileOnDrive.data,
      sheetName: CONFIG.sheetName
    })
  
  const result = appendRow.execute()
  ui.alert('Success', result.message, ui.ButtonSet.OK);
  
  return result

  }catch(err){
    Logger.log(err)
    ui.alert('Error', err, ui.ButtonSet.OK);
  }
}

function showSimpleAlert(e) {
  let title

  if(e.success){ title = 'success'}
    else{ title = 'failed' }

  ui.alert(title, e.message, ui.ButtonSet.OK);
}



