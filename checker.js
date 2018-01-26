
const fetch = require('node-fetch'),
      querystring = require('querystring');

const { URL } = require('url');

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {
    parametersUrl = new URL(url);
    parametersUrl.search = querystring.stringify(invocationParameters);
    parametersUrl = parametersUrl.toString();

    var status = null;
    return fetch(parametersUrl)
      .then(res => {
          status = res.status;
          return res.json();
      })
      .then(json => {
        const checkResult = { // this is the object you need to set and return
            urlChecked: url,
            resultData: json,
            resultStatus: status,
            statusTestPassed: status == expectedResultStatus,
            resultDataAsExpected: compareResults(expectedResultData, json)
        };

        return checkResult;
      });
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
