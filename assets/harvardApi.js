var harvardAPIkey = "55f7f2b0-b577-11ea-a0ef-01159045190f";
var baseHarvardURL = "https://api.harvardartmuseums.org/object?q=displayname:";

let artistKey = "";



$("#searchBtn").on("click", function() {

    artistKey = $("#searchBar").val();
    //store artist in localStorage memory
    console.log("Artist:" + artistKey);
    $("#searchBar").val("");
    
    searchArtist(artistKey);

});

function searchArtist(artist) {
        debugger;  
        storeArtist(artist); //Added on 06/27 to enable storage of artists that have been searched for
        
        $(".gallery").empty()
        var queryHarvardURL = baseHarvardURL + artist +"&size=100&apikey=" + harvardAPIkey;
        console.log("Harvard API URL: " + queryHarvardURL)

        $.ajax({
            url: queryHarvardURL,
            method: "GET"     
        })

        .then(function(response) {

            console.log("Object Url: " + queryHarvardURL);
            console.log("Records length: " + response.records.length);
            debugger;   //Hit F12 instead of Inspect to debug the program at large not just an area of on the page
            if(response.records.length == 0){
                alert('Replace with Modal\nArtist not found: ' + artist);
                return;
            }
            console.log("Record item example: " + JSON.stringify(response.records[0].url));
            // console.log("technique: " + response.records[0].technique)
            // console.log("Artist Name: " + response.records[0].people[0].name) ;
            //https://api.harvardartmuseums.org/object?q=displayname:corinth&size=100&apikey=55f7f2b0-b577-11ea-a0ef-01159045190f
            

            // This loop will theoretically generate images by pulling down from the server:
            for (let i = 0; i < response.records.length; i++) {
                    var harvardImages = response.records[i];
                    var primaryImage = harvardImages.primaryimageurl;
                    var baseImage = harvardImages.baseimageurl;
                    var urlImage = harvardImages.url;
                    var artTitle = harvardImages.title;

                    var artistName = harvardImages.people[0].name;
                    var artistCulture = harvardImages.people[0].culture; 

                    // Create function to generate elements:
                    function createElements() {
                        var mainImgDiv = $("<div>").attr("class","desc" );
                        mainImgDiv.append("Artist Name: " + artistName)
                        mainImgDiv.append("<hr>")
                        mainImgDiv.append("Artwork Title: " + artTitle)
                        mainImgDiv.append("<hr>")
                        mainImgDiv.append("Artist Ethnicity: " + artistCulture)
                        mainImgDiv.append(artImageSrc)
                        $(".gallery").append(mainImgDiv);
                    };
                    // Have to use this if else statement because Harvard stores images in 3 possible keys:
                    if (primaryImage) {
                        var artImageSrc = $("<img>").attr("src", primaryImage).attr("class", "galleryImg");
                        createElements();
                        
                    } else if (baseImage) {
                        var artImageSrc = $("<img>").attr("src", baseImage).attr("class", "galleryImg");
                        createElements();
                        
                    } else {
                        // var artImageSrc = $("<img>").attr("src", urlImage).attr("class", "urlImage");
                        // createElements(); 
                    
                        
                    };  
            };

        })

};