$(function() {
    SocketClientModule.init('ws://localhost:8001');

    PhasePageSelectorModule.init();
    PhasePageSelectorModule.setActive(1);

    PhaseOneModule.init(PhasePageSelectorModule);
    PhaseTwoModule.init(PhasePageSelectorModule, SocketClientModule, CountdownModule);
    PhaseThreeModule.init(PhasePageSelectorModule, SocketClientModule);
    PhaseFourModule.init(PhasePageSelectorModule, SocketClientModule);
    PhaseFiveModule.init(PhasePageSelectorModule, SocketClientModule);
    PhaseSixModule.init(PhasePageSelectorModule, 5000);


    // layout module
    var $connState = $('.connection-state').addClass('-connecting');
    SocketClientModule.addSubscriber(function(data) {
        if (data.command == SocketCommands.connectionLost) {
            $connState.removeClass('-connecting').removeClass('-established').addClass('-lost');
        }

        if (data.command == SocketCommands.connectionEstablished) {
            $connState.removeClass('-connecting').removeClass('-lost').addClass('-established');
        }
    });

});






