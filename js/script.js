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
});






