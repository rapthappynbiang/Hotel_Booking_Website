
document.getElementById("pay").addEventListener('click', function() {
     alert("Hi your booking is successful !!")
});
    
    //check if the page is load without city redirect to index page to prevent error
    if(window.location.href.split("?")[1] == undefined){
     window.location.href = `http://127.0.0.1:5502/index.html`;
     }
    
    //to generate all necessary UI
    generateUI();

    document.getElementById("pay").addEventListener('click', function() {
          if(window.localStorage.getItem("username") != undefined){
               alert("Hi your booking is successful !!")
          }    
     });

     function generateUI(){
          const data = null;
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;

          xhr.addEventListener("readystatechange", function () {
               // if(this.readyState == this.LOADING){

               // }
               if (this.readyState === this.DONE) {
                    let hotelDetail = JSON.parse(this.responseText)
                    console.log(hotelDetail);

                    //populate the UI
                    //get image src add to UI
                    let imageUrl = hotelDetail.data[0].photo.images.original.url;
                    document.getElementById("hotel-image").src= imageUrl;

                    //get hotel name add to UI
                    document.getElementById("hotelName").innerText = hotelDetail.data[0].name;

                    //get ranking and add to UI
                    document.getElementById("rank").innerText = hotelDetail.data[0].ranking;

                    //get hotel  address and add to UI
                    document.getElementById("address").innerText = hotelDetail.data[0].address;
               }
          });

          //get data from url
          let currentUrldataString = JSON.stringify(window.location.href.split("?")[1].split("&"));
          currentUrldataString = JSON.parse(currentUrldataString);
               
                         

          console.log(currentUrldataString);
          //store detail in array
          let detail = new Array;
          for(let i = 0;i<currentUrldataString.length;i++){
               detail[i] = currentUrldataString[i].split("=");
          }
          console.log(detail);

          let requestUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${Number(detail[5][1])}&checkin=${detail[3][1]}&adults=1&lang=en_US&child_rm_ages=7%2C10&currency=USD&nights=2`

          xhr.open("GET", requestUrl);
          xhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key);
          xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
          xhr.send(data);

          //print the user dtail and price detail
          function addCustomerDetails(){
               
               document.getElementById("adults").innerText = detail[0][1];
               document.getElementById("customerName").innerText = detail[1][1];
               document.getElementById("checkInDate").innerText = detail[2][1];
               document.getElementById("checkOutDate").innerText = detail[3][1];
               document.getElementById("price").innerText = detail[4][1];

               let price = Number(detail[4][1]);
               let numberOfAdults = Number(detail[0][1]);
               let numberOfNights = price/(numberOfAdults*1000);

               document.getElementById("priceBreakdown").innerText = `${numberOfAdults} Adults X ${numberOfNights} Nights X RS 1000`;
          }

          addCustomerDetails();

     }
