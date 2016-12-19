var SocketClientModule = (function () {

    var url, conn;
    var globalLoader;

    var handlers = [];

    function connect() {
        conn = new WebSocket(url);
        conn.onmessage = function(event) {
            console.log("Получены данные " + event.data);
            var data = JSON.parse(event.data);
            notifySubscribers(data);
        };

        conn.onopen = function() {
            globalLoader.hide();
            notifySubscribers({command: SocketCommands.connectionEstablished});
        };

        conn.onclose = function() {
            globalLoader.show().setText('Восстановление соединения...');
            notifySubscribers({command: SocketCommands.connectionLost});
        };
    }

    function checkConnection() {
        if (conn.readyState == conn.CLOSED) {
            console.error('Error connection to ' +  url + '. Try to reconnect to the ' + url);
            connect();
        } else {
            //console.log('Connection is OK');
        }
    }

    function notifySubscribers(message) {
        console.log('notify ' + handlers.length + ' handlers');
        handlers.forEach(function(s) {
            s(message);
        });

    }

    function _init(serverUrl, GlobalLoader) {
        url = serverUrl;
        globalLoader = GlobalLoader;
        connect();

        setInterval(checkConnection, 5000);
    }

    function _send(message) {
        console.log('Socket client: sending command');
        console.log(message);
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
