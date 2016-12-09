var ws = require("nodejs-websocket")

console.log("Creating new server")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        var data = JSON.parse(str);
        console.log("Received command " + data.command);

        // special block for echo server.. this is need for initial connections from chrome console. like
        if (data.command == "echo") {
            console.log("Sending answer with command "+data.data.command);
            conn.send(JSON.stringify(data.data));
        } else {
            console.log("Waiting...");
        }
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })

    conn.on('error', function() {
        console.log("Error")
    })

}).listen(8001)

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}