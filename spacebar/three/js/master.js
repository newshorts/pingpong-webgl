/* 
 * Manage master class
 */

var Master = Class.extend({

    iamthemaster: false,
    myId: '',
    masterId: '',
    init: function(){
        // nothing
        
        this.myId = gapi.hangout.getParticipantId();
    },
    setNewMaster: function() {
        var tmpState = gapi.hangout.data.getState();
        
        this.masterId = tmpState.master;
        
        if(this.masterId === this.myId) {
            this.iamthemaster = true;
        }
        
        masterview.setNewMaster(this.masterId);
        
    }

});
