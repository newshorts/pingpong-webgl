/* 
 * App to initialize the ball - run the application including game logic
 */

(function($) {
    $(window).load(function() {
        // init the app
        gapi.hangout.onApiReady.add(function(evt) {
            startMyApp(evt);
            
            setInterval(function() {
                
            }, 2000);
            
        });
    });
})(jQuery);

var startMyApp = function(evt) {
    console.dir(evt);
};

var newMessage = function(evt) {
    console.log('logging event: ' + evt);
    
    sendMessage('This is a new message');
};

var newState = function(evt) {
    
    console.log('logging event: ' + evt);
    
    var st = getState();
    
    console.log('logging old state: ' + st);
    
    setValue('key', 'value');
    
};

// set the events
onMessageReceived.add(newMessage);
onStateChanged.add(newState);