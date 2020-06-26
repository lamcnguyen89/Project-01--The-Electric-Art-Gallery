// Metropolitan Museum of Art
// Need to input the searchbox Var once the search box has been created by other team member
var queryURLMet = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artist;
// var queryURLMet = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=pizza";
let artist = "Pablo Picasso";

// Start of API Pull Request
$.ajax({
    url: queryURLMet,
    method: "GET"
  }).then(function(response) {

    var results = response.objectIDs;
    // var resultImage = results[0];
    console.log("Search Results - " + results);
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

            // creating divs to show results side by side
                
            var mainImgDiv = $("<div>").attr("class","desc" );
            
            mainImgDiv.append("Artist Name: " + artistName)
            mainImgDiv.append("<hr>")
            mainImgDiv.append("Artwork Title: " + artTitle)
            mainImgDiv.append("<hr>")
            mainImgDiv.append("Artist Origin: " + artistCulture)
            mainImgDiv.append(artImageSrc)
            $(".gallery").append(mainImgDiv);
            // make image clickabe
            

      });

        
      // End of first for statement
        }        
        

  });



