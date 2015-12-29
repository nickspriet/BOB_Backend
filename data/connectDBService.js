/**
 * Created by Nick on 12/28/2015.
 */

var connectDBService = (function (configURL, database) {
    //mongoose test
    var db = database.connect(configURL);

    database.connection.on('open', function () {
        var message = 'Connection with mongoserver ' + configURL;
        message += '\n\twith known collection/models: ';

        var collections = database.connection.collections;
        for (var property in collections) message += collections[property].name + ', ';

        console.log(message.slice(0, -2)); //remove last 2 chars ', '
    });

    database.connection.on('error', function (err) {
        console.log('Connection error:', err.message);
    });

    database.connection.on('close', function () {
        console.log('Connection closed:', configURL);
    });

    //mongoose connected
    return database;
});


module.exports = connectDBService;