var SocketClientModule = (function() {

    var url, conn;

    function connect()
    {
        conn = new WebSocket(url);
    }

    function checkConnection() {
        if (conn.readyState == conn.CLOSED) {
            console.log('Try to reconnect to the ' + url);
            conn = new WebSocket(url);
        } else {
            console.log('Connection is OK');
        }
    }

    function _init(serverUrl)
    {
        url = serverUrl;
        connect();

        setInterval(checkConnection, 5000);
    }

    return {
        init: _init
    }
})();
