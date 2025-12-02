/**
 * Class to handle writing data to a Google Spreadsheet.
 */

class SheetHandler {
    constructor({ data = {}, sheetName = 'Sheet1', columns = null}) {
        /**
         * @param {Object} config - Configuration options
         * @param {string} [config.sheetName='Sheet1'] - Name of the target sheet
         * @param {boolean} [config.clearSheet=false] - Whether to clear data (excluding headers)
         * @param {Array<string>} [config.columns] - Custom column headers
         */

        // the default name for sheet is sheet1 if not declared
        this.sheetName = sheetName 
        if (typeof this.sheetName !== 'string' || this.sheetName.trim() === '') {
            throw new Error('sheetName must be a non-empty string');
        }
        
        this.data = data
        if (!this.data || this.data.length === 0) {
            throw new Error('no data received for sheet')
        }

        this.columns = columns ? columns : [
            'id','title', 'owner', 'file_name',  'date_created', 'file_type', 'url', 'download', 'file_description' /*,'viewer'*/
        ];

        if (!Array.isArray(this.columns) || this.columns.length === 0) {
            throw new Error('columns must be a non-empty array');
        }

        this.email = null

        // this for handling sheet api 
        this.sheet = null;
        this.ui = null
    }

    /**
     * main function
     */
    execute() {
        try {
            this._validateSheet()
            this._validateData()
            this._appandRow()

            return { success: true, message: `creating new file success with name ${this.data[1]}`}
        } catch (err) {
            Logger.log(err)
            return { success: false, message: err }
        }
    }

    /**
     * Checks if the target sheet exists.
     * @returns {Object} - { success: boolean, message: string }
     */
    _validateSheet() {
        this.sheet = SpreadsheetApp.getActive().getSheetByName(this.sheetName);

        if (!this.sheet) {
            throw new Error(`sheet with name ${this.sheetName} not found`)
        }
        return { success: true, message: `sheet with name ${this.sheetName} found` };
    }

    /**
     * Validates the input data in form of array against the expected column count.
     * @param {Array<Array>} data - Array of arrays containing row data
     * @returns {Object} - { success: boolean, message: string }
     */
    _validateData() {
        if (!this.data || this.data.length === 0) {
            throw new Error('data is null')
        }
        
        return { success: true, message: 'data is valid' };
    }

    /**
     * merge array given with config array to form new array
     */
    _appendRowId(){
        const arr = ["=ROW()-1"]
        this.data = arr.concat(this.data)
          return { success: true, message: 'a'};
    }
   
    /**
     * create row for google sheet
     * @return {object} - { success: boolean, message: string}
     */
    async _appandRow(){
      this.sheet.appendRow(this.data);
          return { success: true, message: `appending row to sheet: ${this.sheetName} success`}

    }
    async _createRows() {
        this.sheet.getRange(2, 1, this.data.length, this.data[0].length).setValues(this.data);
          return { success: true, message: `creating row for file attributes success`}
    }

    /**
     * Handles errors by logging and alerting.
     * @param {Error} err - The error object
     * @returns {Object} - { success: boolean, message: string }
     */
    handleError(err) {
        Logger.log(err)
        return { success: false, message: err.message};
    }
}
