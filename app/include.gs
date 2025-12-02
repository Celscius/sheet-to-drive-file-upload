/**
 * this section is for file that gonna be include for html
 */

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
