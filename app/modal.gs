class Modal{
  constructor({title = 'my app', config = {}}){
      this.title = title

      // named file for html in this project directory
      this.htmlTemplate = config.htmlTemplate || 'index'
      this.height = config.height || 300
      this.width = config.width || 300
     
      this.ui = null
      this.template = null
      this.displayModal()
  }
  displayModal(){
    try{
      this._checkHtmlTemplate()
      this._createModal()

      return { success: true, message: 'creating modal success'}
    }catch(err){
      Logger.log(err)
      return { success: false, message: err}
    }
    
  }
  _createModal(){
    try{
      this.ui = SpreadsheetApp.getUi()
      this.template = HtmlService.createTemplateFromFile(this.htmlTemplate);
      const html = this.template.evaluate()
            
      html.setWidth(this.width);
      html.setHeight(this.height)
      this.ui.showModalDialog(html, this.title);
    }catch(err){
      // handle when fail to load html template
      Logger.log(err)
      throw new Error('fail to load create modal')
    }
  }
  
  _checkHtmlTemplate(){
    try{
      this.template = HtmlService.createTemplateFromFile(this.htmlTemplate);
      return { success: true, message: 'html file is ready'}
    }catch(err){
      throw new Error('html file is not exist')
    }
  }
}
