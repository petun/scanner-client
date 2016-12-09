ButtonsModule.init();
SocketClientModule.init('ws://localhost:8001');

ButtonsModule.setActive(1);

CountdownModule.init({
    selector: '.phase-two__counter',
    onComplete: function() {
        alert('Yes');
    }
});

CountdownModule.prepareTimer();