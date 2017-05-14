

/* 1. Grab the input value */


document.querySelector(".js-go").addEventListener('click', function(){

  var input = document.querySelector("input").value;
  pushToDOM(input);

});
document.querySelector(".js-userinput").addEventListener('keyup', function(e){

  var input = document.querySelector("input").value;
    // e = event 
    // which is used over the now deprecated "keycode"
    // 13 = ENTER key
  if(e.which === 13) {
    pushToDOM(input);
  }
});


/* 2. Collect data using API */

function pushToDOM (input) {
    
   stopImgResults(); 

    /*  API data */
    var giphyAPI_url = "http://api.giphy.com/v1/gifs/search?q=";
    var giphyAPI_key = " &api_key=dc6zaTOxFJmzC";
    var gif_search = giphyAPI_url + input + giphyAPI_key

    var GiphyAJAXCall = new XMLHttpRequest();
        GiphyAJAXCall.open('GET', gif_search);
        GiphyAJAXCall.send();

        // event listener  - data is loaded from url
        GiphyAJAXCall.addEventListener("load",function(e){

    // A reference to the object that dispatched the event
    var data = e.target.response;
    // method parses a JSON string
    var response = JSON.parse(data);
    // loop through iamges
    var imageUrls = response.data;
   
    imageUrls.forEach(function(image) {
        var url = image.images.fixed_height.url;
        var container = document.querySelector(".js-container");
        //  sets image url to page
        container.innerHTML += "<img src=" + url + " class='container-image'>";
        });
   });    
}

/* 3. Display the GIFs  */

var stopImgResults = function (){
    document.querySelector(".js-container").innerHTML = "";    
}

