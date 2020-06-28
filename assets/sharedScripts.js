/********************************* Teamwork comment:  Begin New Code as of 06/27 ***************************/
const searchedArtistKey = "searchedArtistKey";  
let searchedArtists = [];  //fill from localStorage on  when document is ready


$( document ).ready(function() {
    fillSearchedArtistLists();
});
/*
 * Save artistName in searchedArtists and then in localStorage
 */
function storeArtist(artistName){
    debugger;  
    
    //Don't allow list to be cluttered with duplicates -> that would annoy users
    if(searchedArtists != null && searchedArtists.length > 0 && searchedArtists.contains(artist)){
        return;                                                                                 
    }
    
    if(searchedArtists == null ){  //give a DOM Element some memory
        debugger;
        searchedArtists = new Array(); //es-6 + 
    }
    searchedArtists.push(artistName);         //array's push like Java: searchedArtists.add(0,artistName);
    localStorage.setItem(searchedArtistKey, JSON.stringify(searchedArtists));   
    fillSearchedArtistLists();
}

/*
 * Get searched artists from localStorage
 */

function fillSearchedArtistLists(){ //design note: called from storeArtist()
    debugger;
    var retrievedData = localStorage.getItem(searchedArtistKey);
    searchedArtists = JSON.parse(retrievedData);

    if(searchedArtists != null && searchedArtists.length > 0 ) {
        
        searchedArtists.sort();        //default is A-Z
        //add list to web page
        for(var i = 0; i < searchedArtists.length; i++){
            var x = document.getElementById("artistList");
            var option = document.createElement("option");
            option.value = searchedArtists.length + i;
            option.text = searchedArtists[i];
            x.add(option);
        }
    }

}

//See: <select id="artistList" class="custom-select" style="width:200px;"  onselect="searchAgain()">
//design note: called from onselect 
function searchAgain() { 
    debugger;
    var artistList = document.getElementById("artistList");
    var selectedArtist = artistList.options[artistList.selectedIndex].text;
    searchArtist(selectedArtist);
}
