
const express = require('express'),
    bodyParser = require('body-parser'),
    check = require('./checker');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})

app.post('/check',function (req, res) {
    url                  = req.body.url;
    invocationParameters = req.body.invocationParameters;
    expectedResultData   = req.body.expectedResultData;
    expectedResultStatus = req.body.expectedResultStatus;

    check(url, invocationParameters, expectedResultData, expectedResultStatus).then(result => {
        res.json(result);
    })
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
