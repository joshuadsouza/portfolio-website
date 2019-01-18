var exports = module.exports = {};
require('dotenv').config();

//Get Google Spreadsheets
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1g9JiiN8UkrhCDma6rLF4b60Sz66svgcBgE9qqGNd0Mc');
var sheet; 

exports.authentication = async(step) => {
    return new Promise( (resolve, reject) => {
        var creds = require('./credentials.json');
        doc.useServiceAccountAuth(creds, step);
        resolve(step);
    })
}

exports.getInfoAndWorksheets = async(step) => {
    doc.getInfo(function(err, info) {
        console.log('Loaded Doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        step();
    });
}


