
function showMap(){
    document.getElementById("list").style.display = "none";
    document.getElementById("map").style.display = "flex";
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
    generateUI();

    function showMap(){
        document.getElementById("list").style.display = "none";
        document.getElementById("map").style.display = "flex";
    }
    function showList(){
        document.getElementById("map").style.display = "none";
        document.getElementById("list").style.display = "flex";
    }

    function generateUI(){
        //To get the current city name
    let currentUrl = window.location.href;
    let currentCity = currentUrl.split("=")[1];


    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let myJSONData = JSON.parse(this.responseText);
            console.log(myJSONData);
            
            for(let index = 0; index<myJSONData.data.length; index++){
                if(myJSONData.data[index].result_type == "lodging"){

                    //creating div to hold city image and details
                    let cityDiv = document.createElement("div");
                    cityDiv.classList.add("box");
                    
                    let imageUrl = myJSONData.data[index].result_object.photo.images.large.url;
                    let hotelName = myJSONData.data[index].result_object.name;
                    let rating = myJSONData.data[index].result_object.rating;
                    let location = myJSONData.data[index].result_object.location_string;
                    let locationId = myJSONData.data[index].result_object.location_id;
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
        }
    });

    let cityURL = "https://travel-advisor.p.rapidapi.com/locations/search?query=" + currentCity + "&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US";

    var 
    xhr.open("GET", cityURL);
    xhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

    xhr.send(data);
    }