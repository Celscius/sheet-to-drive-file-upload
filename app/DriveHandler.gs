class DriveHandler{
  constructor({ driveDirectory =  null, file = {}, config = {}}){
      
      // handling google drive directory
      this.url = driveDirectory
      this.googleDriveIdRegex = /(?<=folders\/)[^?\/]*/;
      this.directoryId = null
      this.folder = null
      this.rootDirectory = config.rootDirectory ? config.rootDirectory : 'https://drive.google.com/drive/u/0/my-drive'
      
      this.file = file
      if(Object.keys(this.file).length === 0){ throw new Error('you need to insert your file here')}
      
      // handling file object
      this.fileName = this.file.fileName
      this.fileSize = this.file.bytes
      this.fileType = this.file.mimeType
      this.title = this.file.title
      this.description = this.file.description

      this.email = null
      this.fileLimit = 500000

      this.createFile = null
      this.blob = null
      
      // return value
      this.fileAttributes = []
  }
  execute(){
      try{
        this._isValidUrl()
        this._getDirectoryIdFromUrl()
        this._isValidGoogleDriveDirectory()

        this._getEmail(),
        this._getUploadedFIleAsBlob()
        this._fileSizeLimit()
        this._createFileOnDrive()
        this._setFileDescription()
        this._getFileAttributes()

        return {success: true, message: 'success inserting file to drive', data: this.fileAttributes}
      }catch(err){
        return { success: false, message: err}
      }
  }
  _isValidUrl(){
     if (!this.url || typeof this.url !== 'string') { throw new Error('invalid url')}

      const isValidUrl = this.url.match(this.validGoogleDriveRegex);
      if (!isValidUrl){ throw new Error('this is not valid google drive url') }
      
      return { success: true, message: 'is valid'}
  }
  _getDirectoryIdFromUrl(){
    let id 
    
    // if url match root directory then return root directory id
    if (this.url == this.rootDirectory) {
      this.directoryId = DriveApp.getRootFolder().getId(); 
      
      return { success: true, message: 'found root google drive directory' }
    }

    id = this.url.match(this.googleDriveIdRegex);
    if(!id){ throw new Error('google drive id not found in url') }
      
    this.directoryId = id[0]
      return { success: true, message: 'found google drive id on url' }
  }
  _isValidGoogleDriveDirectory(){
    try{
      this.folder = DriveApp.getFolderById(this.directoryId);
      return { success: true, message: 'google drive directory found'} 
    }catch(err){
      Logger.log(err)
      throw new Error('is not valid google drive directory')
    }
  }

  _getEmail(){
      try{
        this.email = Session.getActiveUser().getEmail();
        
          return { success: true, message: 'getting owner email success'}
      }catch(err){
        throw new Error('getting email failed')
      }
  }

  _getUploadedFIleAsBlob(){
    try{
      if(!this.fileSize || !this.fileType, !this.fileName){ throw new Error('missing value from uploaded file')}
      return this.blob = Utilities.newBlob(this.fileSize, this.fileType, this.fileName);
    }catch(err){
      Logger.log(err)
      throw new Error('fail to get uploaded file')
    }  
  }

  _fileSizeLimit(){
      if(this.fileSize > this.fileLimit){ throw new Error('file size too big')}
        return { success: true, message: 'file is below the limit' }
  }

  /**
   * creating file on google drive directory with uploaded file
   * @return
   */
  _createFileOnDrive(){
    try{
      this.file = this.folder.createFile(this.blob)

        return { success: true, message: 'success creating new file on the google drive'}
    }catch(err){
      Logger.log(err)
      throw new Error('fail creating file on drive directory')
    }
  }

  _setFileDescription(){
    try{
      if(!this.description){ return {success: false, message: 'no description found'}}
      this.file.setDescription(this.description)

        return { success: true, message: 'success adding description on the file'}
    }catch(err){
      throw new Error('fail adding description on the file')
    }
  }

  /**
   * getting file attribute from file that has been created
   * @return {object}
   */
  _getFileAttributes(){
    try{
      if(!this.file){ throw new Error('no file found')}

      this.fileAttributes =  [
        this.file.getId(),
        this.title,
        this.email,
        this.file.getName(),
        this.file.getDateCreated(),
        this.file.getMimeType(),
        this.file.getUrl(),
        this.file.getDownloadUrl(),
        this.file.getDescription(),
        // this.file.getViewers()
      ]

        return { success: true, message: 'success getting file attributes'}
    }catch(err){
      Logger.log(err)
      throw new Error('fail to get file attributes')
    }
  }
}
