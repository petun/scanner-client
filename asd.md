я набросал команды свои внутренние. скорее всего те же самые будут и в нашем с тобой общении

мне могут приходить три команды всего навсего:

все ответы асинхронные по мере готовности

Команда обработки
1) post_processing(scan_id)
    ответы:
      - post_processing_succeeded(scan_id)
      - post_processing_failed(scan_id)



2) upload(scan_id, user_info)
    ответы:
      - upload_succeeded(scan_id)
      - upload_failed(scan_id)

Команда сканирования
3) scan(scan_id)
    ответы:
      - scanning_failed_to_start
      - scnanning_started
      - scanner_has_enough_data     процесс не закончен, но пользователь может уже двигаться
      - scanning_succeeded
      - scanning_failed


```javascript
SocketClientModule.echo({command: "scnanning_started"});
SocketClientModule.echo({command: "scanner_has_enough_data"});
SocketClientModule.echo({command: "scanning_succeeded"});


SocketClientModule.echo({command: "scanning_failed_to_start"});
SocketClientModule.echo({command: "scanning_failed"});

SocketClientModule.echo({command: "upload_succeeded"});
SocketClientModule.echo({command: "upload_failed"});
```



