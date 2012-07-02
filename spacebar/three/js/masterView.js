/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var MasterView = Class.extend({
    
    participantArr: [],
    buttonArr: [],
    init: function(){
        
        this.participantArr = gapi.hangout.getEnabledParticipants();
        
        this.generateMasterButtonList();
        
        this.buttonArr = $('.participant');
        
        this.listenParticipantClick();
        
        // set default
        if(this.participantArr.length <= 1) {
            gapi.hangout.data.setValue('master', master.myId);
        }
    },
    
    // @param id: hangout id
    setNewMaster: function(id) {
        this.buttonArr.each(function(index) {
            $(this).removeClass('master');
            if($(this).data('id') === id) {
                $(this).addClass('master');
            }
        });
    },
    
    // generate the button list
    generateMasterButtonList: function() {
        for(var i = 0; i < this.participantArr.length; i++) {
            var str =   '<button id="'+this.participantArr[i].person.id+'" data-id="'+this.participantArr[i].id+'" class="participant">';
                str +=      ''+this.participantArr[i].person.displayName+'';
                str +=  '</button>';
            $('#participants').append(str);
        }
    },
    
    // listen for a click on a new master button
    listenParticipantClick: function() {
        $('.participant').on('click', function(evt) {
            var id = $(this).data('id');
            
            gapi.hangout.data.setValue('master', id);
        });
    }
        
});
