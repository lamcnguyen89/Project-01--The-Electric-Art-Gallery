let artistKey = "";


$("#searchBtn").on("click", function() {

  artistKey = $("#searchBar").val();
  console.log("Artist:" + artistKey);
  $("#searchBar").val("");

  searchArtist(artistKey);

});

function searchArtist(artist, isSearchAgain = false) { //es6 uses C# default paramenters, calling function can override


  storeArtist(artist); 

  if(isSearchAgain == true  && artistKey == null || artistKey.length == 0){ //artistKey is null when doing searchAgain
    artistKey = artist;
  }
  

  $(".gallery").empty()
  debugger;
  console.log("$$$$ artistKey = " + artistKey);
  var queryURLMet = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artistKey;
// Start of API Pull Request
$.ajax({
    url: queryURLMet,
    method: "GET"
  }).then(function(response) {

    var results = response.objectIDs;
    // var resultImage = results[0];
    console.log("Search Results - " + results);
        for (let i = 0; i < 50 ; i++) {
        
    
    $.ajax({
        url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + results[i],
        method: "GET"
      }).then(function(response) {

              if(response.length == 0){
                $(".gallery").append("<p>").addClass("alerts").css("color","white").text("Artist not found. Be sure to use First and Last Name");   
              }
            
              var results = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
              console.log("image to be displayed: " + response.primaryImage);
              var artistName = response.artistDisplayName;
              debugger;
              console.log("Artist Name: " + artistName + " artist = #" + artist +"#");  
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
            
            

      });

        }        
        

  });




};