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
    connectionEstablished: "connection_established", // client (only for internal use)

    startRotate: "start_rotate", // client (start rotate stream server image)
    stopRotate: "stop_rotate", // client (stop rotate stream server image)

    userReg: "user_reg", // client send user reg form
    userRegError: "user_reg_error", // server send user reg form
    userRegSuccess: "user_reg_success", // server

    userRegConfirm: "user_reg_confirm", // client
    userRegConfirmError: "user_reg_confirm_error", // server
    userRegConfirmSuccess: "user_reg_confirm_success", // server

    userLogin: "user_login", // client
    userLoginError: "user_login_error", //server
    userLoginSuccess: "user_login_success" // server
};