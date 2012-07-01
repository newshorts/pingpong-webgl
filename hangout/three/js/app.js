/* 
 * App to initialize the ball - run the application including game logic
 */

var gameOn = false;
var state = {
    action: '',
    player: ''
};
var countdown = 5;


(function($) {
    $(window).load(function() {
        if(typeof gapi != 'undefined') {
            // init the app
            gapi.hangout.onApiReady.add(function(evt) {
                startMyApp(evt);

                // set the events
                gapi.hangout.data.onStateChanged.add(newState);

            });
        }
        
        b.resetBall();
        initCountDown();
    });
})(jQuery);

var startMyApp = function(evt) {
    // start the app here
    gameOn = true;
    gapi.hangout.data.setValue('game', 'play');
    
    console.log('init')
};

var newState = function(evt) {
    
    state = gapi.hangout.data.getState();
    
    console.log('logging old state from "getState" ');
//    console.dir(st);
    
};

var send = function(message) {
    
}

var sendState = function() {
    if(gameOn) {
        if(typeof gapi != 'undefined') {
            gapi.hangout.data.setValue('action', message);
            gapi.hangout.data.setValue('player', pid);
            
            console.dir(state);
        }
    } else {
        var event = new CustomEvent(state.action);
        window.dispatchEvent(event);
    }
}

var getPid = function() {
    if(typeof gapi != 'undefined') {
        return gapi.hangout.getParticipantId() || 'wall';
    } else {
        return 'wall';
    }   
}

var startBall = function() {
    b.startBall();
}

var initCountDown = function() {
    
    console.log(countdown);
    $('#countdown').text(countdown);
    
    if(countdown >= 1) {
        setTimeout(function() {
            countdown--;
            initCountDown();
        }, 1000);
    } else {
        startBall();
    }
    
    
}

var reset = function() {
    b.resetBall();
    countdown = 5;
    initCountDown();
}

