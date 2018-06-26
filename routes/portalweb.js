'use strict';
var https = require( 'https' );
//const notificationsController = require('../server/controllers').notifications;
var rp = require('request-promise');
var util = require('util');
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


function sendSMSNotification(notification,res) {
    var token = 'Basic YW1hY2xlb2Q6YmlkaXJlY2Npb25hbDIwMTg=';
    var endpoint = 'https://api.infobip.com/sms/1/text/single';
    console.log('___________________________________________________________________________');
    console.log("Nombres: " + notification['name']);
    console.log("Id " + notification['id']);
    console.log("Message " + notification['message']);



    var options = {
        method: 'POST',
        uri: endpoint,
        body: {
            "from":"Info-BCP2",
            "to": notification['phone'],
            "text": util.format(notification['message'],notification['name'], notification['id'])
        },
        headers: {
            "authorization": token
        },
        json: true
    };
    console.log("Request: " + options.uri);
    rp(options)
        .then(function (body) {
            console.log('BODY ' + body);
            
            
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

    var aArgs = req.body.inArguments;
    console.log(req.body);
    console.log('___________________________________________________________________________');
    console.log(req.body.inArguments);
    var notification = {};

    for (var i=0; i<aArgs.length; i++) {
        console.log("ARGUMENTS: " + aArgs[i]);
        for (var key in aArgs[i]) {
            notification[key] = aArgs[i][key];
            console.log("KEYS " + key + " VALUE " + notification[key]);

        }
    }
    console.log("MESSAGE: " + util.format(notification['message'],notification['name'], notification['id']));
    sendSMSNotification(notification,res);
    res.send( 201, {"exitoso":true});
};
