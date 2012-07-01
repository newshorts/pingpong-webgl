/* 
 * Base level class to manage the game
 */

var Game = Class.extend({
    state: {},
    countdown: 0,
    init: function(){
        
        if(typeof gapi != 'undefined') {
            gapi.hangout.onApiReady.add(function(evt) {
                state.gameOn = true;
                this.listenGapiState();
            });
        } else {
            this.setCustomMessaging();
        }
        
        var start = document.getElementById('start'),
            stop = document.getElementById('stop'),
            pause = document.getElementById('pause');
        
        start.addEventListener('click', this.start, false);
        stop.addEventListener('click', this.stop, false);
        pause.addEventListener('click', this.pause, false);
        
        window.addEventListener('mousemove', this.updateMouse, false);
        window.addEventListener('keypress', this.spacebar, false);
    },
    listenGapiState: function() {
        gapi.hangout.data.onStateChanged.add(function() {
            this.state = gapi.hangout.data.getState();
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

