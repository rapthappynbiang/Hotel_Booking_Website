document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.getElementsByTagName("body").style.visibility = "hidden";
        document.getElementById("loader").style.src = "http://127.0.0.1:5502/scripts/loader.css";
        document.getElementById("loader").style.visibility = "visible";
    } else {
        document.getElementById("loader").style.display = "none";
        document.getElementsByTagName("body").style.visibility = "visible";
    }
};
function showMap(){
    document.getElementById("list").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("map").style.position = "absolute";
}
function showList(){
    document.getElementById("map").style.display = "none";
    document.getElementById("list").style.display = "flex";
}
    //check if the page is load without city
    if(window.location.href.split("?")[1] == undefined){
        window.location.href = `http://127.0.0.1:5502/index.html`;
    }

//Function to generate UI
 function generateUI(){
        //To get the current city name
    let currentUrl = window.location.href;
    let currentCity = currentUrl.split("=")[1];

    const data = null;

    //populating Cities
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4 && this.status == 200) {
            var CityLists = JSON.parse(this.responseText);
            console.log(CityLists);
            
            for(let index = 0; index<CityLists.data.length; index++){
                if(CityLists.data[index].result_type == "lodging"){

                    //creating div to hold city image and details
                    let cityDiv = document.createElement("div");
                    cityDiv.classList.add("box");
                    
                    let imageUrl = CityLists.data[index].result_object.photo.images.large.url;
                    let hotelName = CityLists.data[index].result_object.name;
                    let rating = CityLists.data[index].result_object.rating;
                    let location = CityLists.data[index].result_object.location_string;
                    let locationId = CityLists.data[index].result_object.location_id;
                    cityDiv.id = locationId;

                    //redirect to Detail.html on mouse click
                    cityDiv.onclick = () => {
                        
                        window.location.href ="http://127.0.0.1:5502/detail.html?id="+locationId;
                    };

                    cityDiv.innerHTML = `<img src="${imageUrl}" class="image image-responsive">

                                                <div class="labels">
                                                    <h3>${hotelName}</h3>
                                                    <div>
                                                    <span>${rating}</span>
                                                    <i class="fa fa-star" style="color: orange;"></i>
                                                    </div>
                                                    <p>${location}</p>
                                                </div>`;

                document.getElementById("list").appendChild(cityDiv);
                }
            }

      //  start populating map content
           var map, hotelsLocationData = new Array;
           let s = document.createElement("script");
           document.head.appendChild(s);
  
           s.addEventListener("load", ()=>{
               console.log("script has loaded");
               for(let i=0;i<CityLists.data[0].length;i++){
                  if(CityLists.data[0][i].result_type === "lodging"){
                    hotelsLocationData[i] = {
                        lat: parseFloat(CityLists.data[i].result_object.lattitude),
                        lang: parseFloat(CityLists.data[i].result_object.longitude)}
                    }
                }
            
     
                 //to stare the list of city data which contain hotels data
            
                    map = new google.maps.Map(document.getElementById("map"), {
                   //current city location
                                center: { 
                                    lat: parseFloat(CityLists.data[0].result_object.latitude), 
                                    lng: parseFloat(CityLists.data[0].result_object.longitude) 
                                    },
                                zoom: 8,
                        });
                        

                             //create markers of hotel
                            const markers = hotelsLocationData.map((location, i) => {
                            return new google.maps.Marker({
                            position: location,
                            });
                            });
                        
                            //Add a marker clusterer to manage the markers.
                            //@ts-ignore MarkerClusterer defined via script
                            var markerCluster = new MarkerClusterer(map, markers, {
                            imagePath:
                                "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                            });   

              });
              //link to maps api
             s.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAP_API_KEY}`;//add your api key
    }
});

    let cityURL = "https://travel-advisor.p.rapidapi.com/locations/search?query=" + currentCity + "&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US";

    xhr.open("GET", cityURL);
    xhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key); //add your x-rapid-api-key
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

    xhr.send(data);
    }

 generateUI();
 
    