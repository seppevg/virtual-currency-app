const Primus = require('primus');

const go = server => {
    primus = Primus(server, {});

    // Add connection
    primus.on('connection', spark => {
        console.log('A spark has connected! ⚡');

        spark.write({
            type: "transfer",
            data: {},
        });

        // Listen to connection
        spark.on('data', data => {
            if(data.type == 'transfer') {
              
            }
        });
    });
}

module.exports.go = go;