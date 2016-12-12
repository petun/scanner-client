var SocketCommands = {
    scanStart: "scan_start", // client
    scanningStarted: "scnanning_started", // server
    scanningFailedToStart: "scanning_failed_to_start",
    scannerHasEnoughData: "scanner_has_enough_data", // server
    scanningSucceeded: "scanning_succeeded", // server
    scanningFailed: "scanning_failed", // server
    upload: "upload", // client
    uploadSucceeded: "upload_succeeded", //server
    uploadFailed : "upload_failed", // server,

    connectionLost: "connection_lost", // client (only for internal use)
    connectionEstablished: "connection_established" // client (only for internal use)
};