/* 
 * App to initialize the ball - run the application including game logic
 */

var gameOn = false;

(function($) {
    $(window).load(function() {
        // init the app
        gapi.hangout.onApiReady.add(function(evt) {
            startMyApp(evt);
            
            // set the events
            gapi.hangout.data.onStateChanged.add(newState);
            
        });
    });
})(jQuery);

var startMyApp = function(evt) {
    // start the app here
    
    gameOn = true;
    gapi.hangout.data.setValue('game', 'play');
    
};

var newState = function(evt) {
    
    var st = gapi.hangout.data.getState();
    
    console.log('logging old state from "getState" ');
//    console.dir(st);
    
};
