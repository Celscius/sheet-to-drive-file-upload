/**
 * class to handle google sheet menu 
 */

class MenuHandler{
  constructor({ menuName = 'my app', items = [],modal = {}, config = {}, }){
      // this used to add app function to the menu
      if(!items == null || items.length === 0 ){ throw new Error('you need to put global function name here')}
      this.item = items

      this.title = menuName

      this.ui = null
      this._createMenu()
  }
  _createMenu(){
    this.ui = SpreadsheetApp.getUi()
    const menu = this.ui.createMenu(this.title)
    
    // menu.addItem(this.item[0].label, this.item[0].functionName)
    if(this.item.length > 1) {
      for (let i = 0; i < this.item.length; i++) {
        menu.addItem(this.item[i].label, this.item[i].functionName)
      }
    }
    
    menu.addToUi()        
  }
  displayModal(){
    try{
      // using html file with external javascript.html
      const template = HtmlService.createTemplateFromFile(this.htmlTemplate);
      const html = template.evaluate()
            
      html.setWidth(this.width);
      html.setHeight(this.height)
      this.ui.showModalDialog(html, 'test');
      return this.ui
      
    }catch(err){
      // handle when fail to load html template
      Logger.log(err)
      throw new Error('fail to load html template')
    }
  }
  showToast(){
    SpreadsheetApp.getActiveSpreadsheet().toast("Action completed!");
  }
  openGoogleDriveDirectory(){
    var ui = SpreadsheetApp.getUi();
    ui.alert('Important Message', 'This is a custom alert from Apps Script!', ui.ButtonSet.OK);
  }
  
}

