/* 
 * App to initialize the ball - run the application including game logic
 */

(function($) {
    $(window).load(function() {
        // init the app
        gapi.hangout.onApiReady.add(function(evt) {
            startMyApp(evt);
            
            // set the events
            gapi.hangout.data.onMessageReceived.add(newMessage);
            gapi.hangout.data.onStateChanged.add(newState);
            
            setInterval(function() {
                gapi.hangout.data.sendMessage('This is a message sent from the interval');
            }, 2000);
            
            setInterval(function() {
                gapi.hangout.data.setValue('key', 'value from interval');
            }, 3000);
            
        });
    });
})(jQuery);

var startMyApp = function(evt) {
    console.dir(evt);
};

var newMessage = function(evt) {
    console.log('logging message event: ');
    console.dir(evt);
    
    gapi.hangout.data.sendMessage('This is a new message');
};

var newState = function(evt) {
    
    console.log('logging new state event: ');
    console.dir(evt);
    
    var st = gapi.hangout.data.getState();
    
    console.log('logging old state from "getState": ');
    console.dir(st);
    
    gapi.hangout.data.setValue('key', 'value');
    
};

