const Primus = require('primus');

const go = server => {
    primus = Primus(server, {});

    // Add connection
    primus.on('connection', spark => {
        console.log('A spark has connected! ⚡');

        // Listen to connection
        spark.on('data', data => {
            if(data.type == 'transfer') {
                console.log('Broadcasting transfer received');
                primus.write(
                    {
                        type: 'transfer',
                        data: {},
                    }
                );
            }
        });
    });
}

module.exports.go = go;