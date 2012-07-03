/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var FaceTracking = Class.extend({

    data: {},
    tracking: false,
    init: function(){
        
        gapi.hangout.av.effects.onFaceTrackingDataChanged.add(this.trackingDataChanged);
        
        this.setFaceTrackingButton();
        this.listenFaceTrackingButtonClick();
  
    },
    
    // set the ui for face tracking
    setFaceTrackingButton: function() {
        var str =   '<button id="faceTrackingButton" class="off">';
            str +=      'Face Tracking';
            str +=  '</button>';
        $('#faceTracking').append(str);
    },
    
    // listen for the face tracking click
    listenFaceTrackingButtonClick: function() {
        var self = this;
        $('#faceTrackingButton').on('click', function(evt) {
            if($(this).hasClass('off')) {
                $(this).removeClass().addClass('on');
                self.tracking = true;
            } else {
                $(this).removeClass().addClass('off');
                self.tracking = false;
            }
            console.dir(self);
        });
    },
    
    // listen facetracking data changed and update
    trackingDataChanged: function(data) {
        console.log((data.noseTip.x * 1000) - 700);
        mouseX = -((data.noseTip.x * 1000) - 700);
        mouseY = (data.noseTip.y * 1000) + 300;
//        if(this.tracking === true) {
//            console.log(data.noseTip.x * 100);
//            mouseX = data.noseTip.x * 100;
//            mouseY = data.noseTip.y * 100;
//        }
    }
    
 });