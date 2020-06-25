// Metropolitan Museum of Art
// Need to input the searchbox Var once the search box has been created by other team member
var queryURLMet = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=david";
// var queryURLMet = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=pizza";

// SearchBox
// var searchBox = $("inputBox");


// Search
// GET /public/collection/v1/search returns a listing of 
// all Object IDs for objects that contain the search query within the object’s data

// example of a search for sunflowers
// https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers
// https://collectionapi.metmuseum.org/public/collection/v1/search? "q=sunflowers" this should be the var for the input box


$.ajax({
    url: queryURLMet,
    method: "GET"
  }).then(function(response) {

    var results = response.objectIDs;
    // var resultImage = results[0];
    console.log(results);
        for (let i = 0; i < 8 ; i++) {
        
    
    $.ajax({
        url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + results[i],
        method: "GET"
      }).then(function(response) {
            
            var results = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
            console.log("image to be displayed: " + response.primaryImage);
            var artistName = response.artistDisplayName;
            console.log("Artist Name: " + artistName);
            var artTitle = response.title;
            console.log("Art Title: " + artTitle);
            var artistCulture = response.culture;
            console.log("Artist Origin: " + artistCulture);
            
            
            var artImageURL = response.primaryImage;
            var artImageSrc = $("<img>").attr("src", artImageURL).attr("class", "galleryImg");

            // Having images load in seperate divs side by side, css adjustments to have the board align correctly
                
            var mainImgDiv = $("<div>").attr("class","desc" );
            
            mainImgDiv.append("Artist Name: " + artistName)
            mainImgDiv.append("<hr>")
            mainImgDiv.append("Artwork Title: " + artTitle)
            mainImgDiv.append("<hr>")
            mainImgDiv.append("Artist Origin: " + artistCulture)
            mainImgDiv.append(artImageSrc)
            $(".gallery").append(mainImgDiv);
      });

        
      // End of first for statement
        }        
    // console.log(response.objectIDs[0].primaryImage);
    
// Working on for loop which will take the api search results and end result will be to extract the
//  primaryImage URL to display on the page
// index[].primaryImage   


// url for images
    // https://collectionapi.metmuseum.org/public/collection/v1/objects/21693

    // below are the object names{
// "objectID": 21693,
// "isHighlight": false,


// "isPublicDomain": true,
// "primaryImage": "https://images.metmuseum.org/CRDImages/ad/original/DP300700.jpg",


// "constituents": [
// {
// "role": "Artist",
// "name": "Thomas Cole",
// }
// ],
// "department": "The American Wing",
// "title": "Clouds",
// "culture": "American",
// "artistDisplayName": "Thomas Cole",
// "artistDisplayBio": "American, Lancashire 1801–1848 Catskill, New York",
// "artistNationality": "American",
// "artistBeginDate": "1801",
// "artistEndDate": "1848",
        

  });