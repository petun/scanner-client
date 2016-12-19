#todo
- pics on all pages
- single command for generation?
- text on last page


```javascript
SocketClientModule.echo({command: "scnanning_started"});
SocketClientModule.echo({command: "scanner_has_enough_data"});
SocketClientModule.echo({command: "scanning_succeeded", link: "http://localhost/scanner-client/img/result.png"});


SocketClientModule.echo({command: "scanning_failed_to_start"});
SocketClientModule.echo({command: "scanning_failed"});

SocketClientModule.echo({command: "user_reg_error"});
SocketClientModule.echo({command: "user_reg_success"});

SocketClientModule.echo({command: "user_reg_confirm_error"});
SocketClientModule.echo({command: "user_reg_confirm_success"});

SocketClientModule.echo({command: "user_login_error"});
SocketClientModule.echo({command: "user_login_success"});
```



