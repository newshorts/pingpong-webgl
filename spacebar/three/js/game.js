/* 
 * Base level class to manage the game
 */

var Game = Class.extend({
    state: {},
    countdown: 0,
    init: function(){
        
        var start = document.getElementById('start'),
            stop = document.getElementById('stop'),
            pause = document.getElementById('pause');
        
        start.addEventListener('click', this.start, false);
        stop.addEventListener('click', this.stop, false);
        pause.addEventListener('click', this.pause, false);
        
        window.addEventListener('mousemove', this.updateMouse, false);
        window.addEventListener('keypress', this.spacebar, false);
          
    },
    
    // listens for a game state change, right now it's just master but it could track score
    listenStateChange: function() {
        gapi.hangout.data.onStateChanged.add(function() {
            // store an old version of the state
            var tmpState = this.state;
            
            // set new state
            this.state = gapi.hangout.data.getState();
            console.dir(this.state);
            
            // check for the presence of master, if we have it, we set a new one regardless
            if(typeof this.state.master != 'undefined') {
                
                master.setNewMaster();
                
            }
            
        });
        
    },
    
    // expects a message with coordinates of ball position
    listenMessage: function() {
        gapi.hangout.data.onMessageReceived.add(function(evt) {
            console.dir(evt);
            var pos = JSON.parse(evt.message);
            console.dir(pos);
            scene.updateBall(pos);
        });
    },
    setCustomMessaging: function() {
        var hit = document.createEvent('Event');
        hit.initEvent('hit', true, true);
        
        var miss = document.createEvent('Event');  
        miss.initEvent('miss', true, true);
    },
    updateMouse: function(evt) {
        mouseX = evt.x;
        mouseY = evt.y;
        
//        console.log('mouseX: ' + (mouseX - 700));
    },
    getPid: function() {
        if(typeof gapi != 'undefined') {
            return gapi.hangout.getParticipantId() || 'wall';
        } else {
            return 'wall';
        } 
    },
    sendState: function(message) {
        if(this.state.gameOn) {
            if(typeof gapi != 'undefined') {
                gapi.hangout.data.setValue('action', message);
                gapi.hangout.data.setValue('player', this.getPid);
            }
        } else {
            this.state.action = message;
            var event = new CustomEvent(this.state.action);
            window.dispatchEvent(event);
        }
    },
    reset: function() {
        if(typeof ball === 'undefined') {
            console.log('ball is undefined');
            return;
        }

        ball.reset();
        this.countdown = 5;
        this.startCountdown();
    },
    startCountdown: function() {
        var cd = $('#countdown');
        cd.show();
        cd.text(this.countdown);

        if(this.countdown >= 1) {
            
            var self = this;
            
            setTimeout(function() {
                self.countdown--;
                self.startCountdown();
            }, 1000);
        } else {
            cd.hide();
            this.start();
        }
    },
    start: function() {
        if(typeof ball === 'undefined') {
            console.log('ball is undefined');
            return;
        }
        
        ball.start();
    },
    stop: function() {
        if(typeof ball === 'undefined') {
            console.log('ball is undefined');
            return;
        }
        
        ball.reset();
    },
    pause: function() {
        if(typeof ball === 'undefined') {
            console.log('ball is undefined');
            return;
        }
        
        ball.pause();
    },
    spacebar: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        if(evt.keyCode === 32) {
            
            ball.swipeBall();
        }
        
        return false;
    }
    
});

