var SocketClientModule = (function () {

    var url, conn;

    var handlers = [];

    function connect() {
        conn = new WebSocket(url);
        conn.onmessage = function(event) {
            console.log("Получены данные " + event.data);

            var data = JSON.parse(event.data);

            console.log('notify ' + handlers.length + ' handlers');
            handlers.forEach(function(s) {
                s(data);
            });
        };
    }

    function checkConnection() {
        if (conn.readyState == conn.CLOSED) {
            console.log('Try to reconnect to the ' + url);
            connect();
        } else {
            console.log('Connection is OK');
        }
    }

    function _init(serverUrl) {
        url = serverUrl;
        connect();

        setInterval(checkConnection, 5000);
    }

    function _send(message) {
        conn.send(JSON.stringify(message));
    }

    /**
     * Temporary function for my node server.
     * @param message
     * @private
     */
    function _echo(message) {
        var object =
        {
            command: "echo",
            data: message
        };

        _send(object);
    }

    this._addSubscriber = function(handler) {
        console.log('add new handler');
        handlers.push(handler);
    };

    return {
        init: _init,
        send: _send,
        echo: _echo,
        addSubscriber: _addSubscriber
    }
})();
