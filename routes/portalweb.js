'use strict';
var https = require( 'https' );
const notificationsController = require('../server/controllers').notifications;
var rp = require('request-promise');
var activityUtils = require('./activityUtils');


/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Edit' );
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Save' );
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    activityUtils.logData( req );
    res.send( 200, 'Publish' );
};


function sendSMSNotification(req,res) {
    var token = 'Basic YW1hY2xlb2Q6YmlkaXJlY2Npb25hbDIwMTg=';
    var endpoint = 'https://api.infobip.com/sms/1/text/single';

    var options = {
        method: 'POST',
        uri: endpoint,
        body: {
            "from":"InfoSMSEdwinRosado",
            "to":"51981017969",
            "text":"hola2 https://bit.ly/2si6zTt"
        },
        headers: {
            "authorization": token
        },
        json: true
    };
    console.log("Request: " + options.uri);
    rp(options)
        .then(function (body) {
            console.log('BODY ' + body)
            // if (body.access_token) {
            //     return body.access_token;
            // }
            // else {
            //     res.send(500, body);
            // }
        })
        .catch(function (err) {
            console.error(err);
            res.send(500, {message: "Internal Server Error"});
        });
}


/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req );
    res.send( 200, 'Validate' );
};

/*
 * POST Handler for /execute/ route of Activity.
 */

exports.execute = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    // activityUtils.logData( req );
    // console.log(req.body);

    // var aArgs = req.body.inArguments;
    // var notification = {};
    // for (var i=0; i<aArgs.length(); i++) {
    //     console.log('');
    //     for (var key in aArgs[i]) {
    //         notification[key] = aArgs[i][key];
    //     }
    // }

    console.log('Send SMS to Diego')
    sendSMSNotification(req,res);
    res.send( 201, {"exitoso":true});
};
