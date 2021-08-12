
    let today = new Date();
    var currentDate = {
        "date" : today.getDate(), 
         "month": today.getMonth()+1, 
         "year": today.getFullYear()
     };

     let startDateMin = document.getElementById("startDate");
     var endDateMin = document.getElementById("endDate");

     if(currentDate.date<10 && currentDate.month<10){

            startDateMin.min = `${currentDate.year}-0${currentDate.month}-0${currentDate.date}`;    

    }else if(currentDate.date<10 && currentDate.month>=10){

            startDateMin.min = `${currentDate.year}-${currentDate.month}-0${currentDate.date}`;

    }else if(currentDate.date>=10 && currentDate.month<10){
        
            startDateMin.min = `${currentDate.year}-0${currentDate.month}-${currentDate.date}`;
    
    }else{
            startDateMin.min = `${currentDate.year}-${currentDate.month}-${currentDate.date}`;   
    }

    document.getElementById("startDate").addEventListener('change', function(){
                                                                        let tomorrow = new Date(document.getElementById("startDate").valueAsDate.getTime()+ 1000*3600*24);

                                                                        var nextDate = {
                                                                                        "date" : tomorrow.getDate(), 
                                                                                        "month": tomorrow.getMonth()+1, 
                                                                                        "year": tomorrow.getFullYear()
                                                                                    };
                                                                    
                                                                        if(nextDate.date<10 && nextDate.month<10){
                                                                    
                                                                            endDateMin.min =  `${nextDate.year}-0${nextDate.month}-0${nextDate.date}`;   
                                                                    
                                                                        }else if(nextDate.date<10 && nextDate.month>=10){
                                                                    
                                                                            endDateMin.min =  `${nextDate.year}-${nextDate.month}-0${nextDate.date}`;
                                                                    
                                                                        }else if(nextDate.date>=10 && nextDate.month<10){
                                                                    
                                                                            endDateMin.min =  `${nextDate.year}-0${nextDate.month}-${nextDate.date}`;
                                                                    
                                                                        }else{
                                                                    
                                                                            endDateMin.min =  `${nextDate.year}-${nextDate.month}-${nextDate.date}`;
                                                                                    
                                                                        }
                                                         });

document.getElementById("endDate").addEventListener('change',function (){
    let numberOfPersons = Number(document.getElementById("adults").value);
    let startDate = document.getElementById("startDate").valueAsDate;
    let endDate = document.getElementById("endDate").valueAsDate;


    let pricePerPerson = 1000;/*rate in rupees*/ 
    let numberOfDays = Math.ceil(parseFloat(endDate.getTime()) - parseFloat(startDate.getTime()));
    
    let total = numberOfPersons*numberOfDays*pricePerPerson/(1000 * 3600 * 24);

    document.getElementById("totalPrice").disabled = false;
    document.getElementById("totalPrice").value = `${total}`;
    document.getElementById("totalPrice").disabled = true;
} );

        //check if the page is load without id
        if(window.location.href.split("?")[1] == undefined){
            window.location.href = `http://127.0.0.1:5502/index.html`;
        }
        
        document.getElementById("startDate").value = document.getElementById("endDate").value = "";
        document.getElementById("totalPrice").value = "0";

    

    //GEnerating UI;
    generateUI();
    //setting min="today's date"
    setCheckInDateFormMinValue();

    function setCheckInDateFormMinValue(){
        let today = new Date();
            var currentDate = {
                "date" : today.getDate(), 
                "month": today.getMonth()+1, 
                "year": today.getFullYear()
            };

            let startDateMin = document.getElementById("startDate");
            var endDateMin = document.getElementById("endDate");

            if(currentDate.date<10 && currentDate.month<10){

                    startDateMin.min = `${currentDate.year}-0${currentDate.month}-0${currentDate.date}`;    

            }else if(currentDate.date<10 && currentDate.month>=10){

                    startDateMin.min = `${currentDate.year}-${currentDate.month}-0${currentDate.date}`;

            }else if(currentDate.date>=10 && currentDate.month<10){
                
                    startDateMin.min = `${currentDate.year}-0${currentDate.month}-${currentDate.date}`;
            
            }else{
                    startDateMin.min = `${currentDate.year}-${currentDate.month}-${currentDate.date}`;   
            }
    }
    
    function generateUI(){
         //http request to server for data
     const data = null;

     const xhr = new XMLHttpRequest();
     xhr.withCredentials = false;

     xhr.addEventListener("readystatechange", function () {
         if (this.readyState === this.DONE) {

             let detailJSONData = JSON.parse(this.responseText); 
             console.log(detailJSONData);
         
             document.getElementById("hotelName").innerText = detailJSONData.data[0].name;
         
                 
              //creating Rating stars
             let rating = parseFloat(detailJSONData.data[0].rating);

             for(let index = 0; index<Math.floor(rating);index++){
                 let fullStarRating = document.createElement("i");
                 fullStarRating.id = `${index}`;
                 fullStarRating.classList.add("fa", "fa-star");
                 fullStarRating.style.color = "orange";

                 //add half star rating to the rating div
                 document.getElementById("rating").appendChild(fullStarRating);
             }

             //add half star rating if any
             if(rating%Math.floor(rating) == 0.5){
                 let halfStarRating = document.createElement("i");
                 halfStarRating.id = `${Math.floor(rating)+1}`;
                 halfStarRating.classList.add("fa", "fa-star-half-o");
                 halfStarRating.style.color = "orange";

                 //add half star rating to the rating div
                 document.getElementById("rating").appendChild(halfStarRating);
             }
             
             //populating amenities
             for(let index = 0; index < 11; index++){
                 let amenity = document.createElement("li");
                 amenity.id = `amenity-${index}`;
                 amenity.innerHTML = `<span>${detailJSONData.data[0].amenities[index].key}</span`;
                 document.getElementById("amenities").appendChild(amenity);
             }     
             
             //adding description
             document.getElementById("description").innerText = `${detailJSONData.data[0].description}`;
                                                     
         }
                                                 
     });

     let locationId = Number(window.location.href.split("=")[1]);
     let requestUrl = null;
     if(locationId == undefined){
         //just in case ask user to select city
         alert("!!Please Select City");
         window.location.href = "http://127.0.0.1:5502/index.html";
     }else{
         requestUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${locationId}`;
     }

     xhr.open("GET", requestUrl);
     xhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key);
     xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

     xhr.send(data);

     //url to photo list for carousel
     let newRequestUrl = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${locationId}&currency=USD&limit=500&lang=en_US`;


     //fetching image carousel
     const newXhr = new XMLHttpRequest();
     
     newXhr.withCredentials = false;
     newXhr.addEventListener("readystatechange", function () {
         if (this.readyState === this.DONE) {
             let detailCarouselJSONData = JSON.parse(this.responseText); 
             
             //Populating Image Carousels
             let CarouselInnerCollections = detailCarouselJSONData.data;
             
             for(let index = 0; index<CarouselInnerCollections.length;index++){
                 let carouselItem = document.createElement("div");
                 carouselItem.id = `item-${index}`;
                 carouselItem.classList.add("carousel-item");
                 let imageUrl = CarouselInnerCollections[index].images.large.url;
     
                 carouselItem.innerHTML = `<img src="${imageUrl}"
                                         class="d-block w-100" alt= "${index}-slide">`;
     
     
                 if(index == 0){
                     //make first carousal item active
                     carouselItem.classList.add("active");
                 }
                 document.getElementById("carouselInner").appendChild(carouselItem);    
             }


             //add Prev and Next Controls
             let previous = document.createElement("a");
             let next = document.createElement("a");
             for(let i = 0; i<2; i++){
                 previous.role = next.role = "button";
                 previous.href = next.href = "#mySlides"
                 if(i == 0){
                 // <a class="slider-control col-sm-1 prev" href="#mySlides" role="button" data-slide="prev">&#10094;</a>
                 previous.classList.add("slider-control", "col-sm-1", "prev");
                 previous.id = `control-${i}`;
                 previous.setAttribute("data-slide", "prev");
                 previous.innerHTML = `&#10094;`;

                 }else{
                 //<a class="slider-control col-sm-1 next" href="#mySlides" role="button" data-slide="next">&#10095;</a>
                 next.classList.add("slider-control", "col-sm-1", "next");
                 next.id = `control-${i}`;
                 next.setAttribute("data-slide", "next");
                 next.innerHTML = `&#10095;`;
                 }
             }
             document.getElementById("mySlides").appendChild(previous);
             document.getElementById("mySlides").appendChild(next);
         }
     });
     
     newXhr.open("GET", newRequestUrl);
     newXhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key);
     newXhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
     newXhr.send(data);

    }

    document.getElementById("startDate").addEventListener('change', function(){
        let tomorrow = new Date(document.getElementById("startDate").valueAsDate.getTime()+ 1000*3600*24);

        var nextDate = {
                        "date" : tomorrow.getDate(), 
                        "month": tomorrow.getMonth()+1, 
                        "year": tomorrow.getFullYear()
                    };
    
        if(nextDate.date<10 && nextDate.month<10){
    
            endDateMin.min =  `${nextDate.year}-0${nextDate.month}-0${nextDate.date}`;   
    
        }else if(nextDate.date<10 && nextDate.month>=10){
    
            endDateMin.min =  `${nextDate.year}-${nextDate.month}-0${nextDate.date}`;
    
        }else if(nextDate.date>=10 && nextDate.month<10){
    
            endDateMin.min =  `${nextDate.year}-0${nextDate.month}-${nextDate.date}`;
    
        }else{
    
            endDateMin.min =  `${nextDate.year}-${nextDate.month}-${nextDate.date}`;
                    
        }
});

        document.getElementById("endDate").addEventListener('change',function CalculatePrice (){
                                                            let numberOfPersons = Number(document.getElementById("adults").value);
                                                            let startDate = document.getElementById("startDate").valueAsDate;
                                                            let endDate = document.getElementById("endDate").valueAsDate;


                                                            let pricePerPerson = 1000;/*rate in rupees*/ 
                                                            let numberOfDays = Math.ceil(parseFloat(endDate.getTime()) - parseFloat(startDate.getTime()));

                                                            let total = numberOfPersons*numberOfDays*pricePerPerson/(1000 * 3600 * 24);

                                                            document.getElementById("totalPrice").readOnly = false;
                                                            document.getElementById("totalPrice").value = `${total}`;
                                                            document.getElementById("totalPrice").readOnly = true;
                                                            } );

        document.getElementById("adults").addEventListener('change',function CalculatePrice (){
                                                            let numberOfPersons = Number(document.getElementById("adults").value);
                                                            let startDate = document.getElementById("startDate").valueAsDate;
                                                            let endDate = document.getElementById("endDate").valueAsDate;


                                                            let pricePerPerson = 1000;/*rate in rupees*/ 
                                                            let numberOfDays = Math.ceil(parseFloat(endDate.getTime()) - parseFloat(startDate.getTime()));

                                                            let total = numberOfPersons*numberOfDays*pricePerPerson/(1000 * 3600 * 24);

                                                            document.getElementById("totalPrice").readOnly = false;
                                                            document.getElementById("totalPrice").value = `${total}`;
                                                            document.getElementById("totalPrice").readOnly = true;
                                                            } );

        document.getElementById("book").addEventListener('click', ()=>{

                                                let inputForms = document.getElementsByTagName("input.");
                                                //Make sure the dates are set to get total Amount
                                                if(inputForms[4].value == "0"){
                                                alert("!!Please select Dates");
                                                return;
                                                }

                                                //checking required field
                                                for(let index = 1; index<=3;index++){
                                                        if(inputForms[index].value == ""){
                                                        alert(`!!Required please fill ${inputForms[index].name}.`);
                                                        return;
                                                        }
                                                }

                                                //to add hotel ID to be reffered when calling payment page
                                                let locationId = Number(window.location.href.split("=")[1]);

                                                //check if locationId is undefined ask user to select a city first redirect to index.html
                                                if(locationId == undefined){
                                                alert("!!Please Select City");
                                                window.location.href = "http://127.0.0.1:5502/index.html";
                                                }

                                                let adults = Number(document.getElementById("adults").value);
                                                let name = document.getElementById("name").value;
                                                let checkInDate = document.getElementById("startDate").value;  
                                                let checkOutDate = document.getElementById("endDate").value;
                                                let price = Number(document.getElementById("totalPrice").value);

                                                window.location.href = `http://127.0.0.1:5502/payment.html?adults=${adults}&Name=${name}&CheckInDate=${checkInDate}&CheckOutDate=${checkOutDate}&price=${price}&Hotel_Id=${locationId}`;
                                                });