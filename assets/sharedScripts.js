
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
    if(searchedArtists != null 
        && searchedArtists.length > 0                 
        && searchedArtists.includes(artistName,0)){   //Use ES6, includes() function, rather than 
        return;                                                                                 
    }
    
    if(searchedArtists == null ){      //give a DOM Element some memory
        debugger;
        searchedArtists = new Array(); //es-6 respects arrays as 1st class objects like Java has for years
    }
    searchedArtists.push(artistName);         //array's push like Java: searchedArtists.add(0,artistName);
    localStorage.setItem(searchedArtistKey, JSON.stringify(searchedArtists));   
    fillSearchedArtistLists();
}

/*
 * Get searched artists from localStorage and fill up the searchedArtists array
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

/****
 Design notes:
            see: museum.html and museumMet.html
            <button
                id="searchAgainBtn"
                class="btn btn-primary"
                type="button"
                onclick="searchAgain()" - traditional way to attach events to buttons
            >
 */
function searchAgain() { 
    debugger;
    var artistList = document.getElementById("artistList");  
    var selectedArtist = artistList.options[artistList.selectedIndex].text;
    searchArtist(selectedArtist, true);
}
