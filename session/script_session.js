$('document').ready(init);

function init(){
    loadLocations();
    
    $('#item1, #item2, #item3').bind('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    });

    // bind the dragover event on the board sections
    $('#flights, #basket').bind('dragover', function(event) {
        event.preventDefault();
    });

    // bind the drop event on the board sections
    $('#flights, #basket').bind('drop', function(event) {
        var airplaneId = event.originalEvent.dataTransfer.getData("text/plain");
        event.target.appendChild(document.getElementById(airplaneId));
        
        event.preventDefault();
        saveLocations(event.target, airplaneId); 
    });
}

function saveLocations(parent, airplane){
    // save the locations of airplanes after each drop event
    var parentId = parent.getAttribute('id');
        
    // store the airplane's parent id in sessionStorage
    var key = airplane + "parent";
    sessionStorage[key] = parentId;
}


/**
 * Traverse through the sessionStorage and move the cards as necessary
 */
function loadLocations(){
    
    for(var i in sessionStorage){
        if(sessionStorage[i]) {
            var parent = document.getElementById(sessionStorage[i]);
            var airplane = document.getElementById(i.replace('parent', ''));

            if(parent){
                parent.appendChild(airplane);
            }
        }
    }
    
}
