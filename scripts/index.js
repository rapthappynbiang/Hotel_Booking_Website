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
function showMore(){
    document.getElementById("secondCityContainer").style.display="flex";
    document.getElementById("viewLess").style.display = "block";
    document.getElementById("viewMore").style.display = "none";
}

function showLess(){
    document.getElementById("secondCityContainer").style.display="none";
    document.getElementById("viewLess").style.display = "none";
    document.getElementById("viewMore").style.display = "block";
}

var city = document.getElementsByClassName("city-name");

for(let index = 0; index<city.length;index++){
    city[index].addEventListener('click', () =>{
        let cityName = city[index].innerText;
        window.location.href = `http://127.0.0.1:5502/list.html?city=${cityName}`;
    });
}

 function autocompleteFunction(searchBar){

         //close all the open lists
         closeList();
         function closeList(elmnt){
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
          }
       
       searchBar.addEventListener('input', (e)=>{
            var cityListData, cityListResultsArr, cityAutocompleteList, autocompleteItem, val = searchBar.value;

            if(!val){return false;}

            //create a div to contain match cities
            var cityAutocompleteList = document.createElement("div");
            cityAutocompleteList.id = "autocomplete-list";
            cityAutocompleteList.setAttribute("class", "autocomplete-items");

            searchBar.parentNode.appendChild(cityAutocompleteList);

            //starting searching as soon as person types
            if(val.length>=3){
                const data = null;

                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function (){

                    if (this.readyState === this.DONE) {

                        //get list of city starting with same letter
                        cityListData = JSON.parse(this.responseText);
                        console.log("City List");
                        console.log(cityListData);

                       cityListResultsArr = new Array;
                        cityListResultsArr[0] = cityListData.data[0].result_object.name;

                            for(let i=0;i<cityListResultsArr.length;i++){
                            
                                //create div to contain the city
                                autocompleteItem = document.createElement("div");
                        
                                //if the the characters match we make bold    
                                    autocompleteItem.innerHTML = `${cityListResultsArr[i]}`;
                                

                                //put a hidden input field for submitting city
                                autocompleteItem.innerHTML += `<input type="hidden" value="${cityListResultsArr[i]} >"`;

                                //when someone click make the our search bar input value equals to selected city redirect to list page
                                autocompleteItem.addEventListener('click', ()=>{
                                    searchBar.value = document.getElementsByTagName("input")[0].value;

                                    //redirect user to list page
                                    window.location.href = `http://127.0.0.1:5502/list.html?city=${searchBar.value}`;

                                });

                                //Add City to List
                                cityAutocompleteList.appendChild(autocompleteItem);
                           }
                    }
               });

                xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${val}&lang=en_US&units=km`);
                xhr.setRequestHeader("x-rapidapi-key", config.x_rapidapi_key);//add your api key store in config.js.
                xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

                xhr.send(data);
            }

       });

       searchBar.addEventListener('keydown', function(e){
        if(e.keyCode == 13){
            for(let i = 0; i<cityListResultsArr.length;i++){
                if(cityListResultsArr[i].substr(0,val.length).toUpperCase() == searchBar.val.toUpperCase()){
                    window.location.href = `http://127.0.0.1:5502/list.html?city=${cityListResultsArr[i]}`
                }
            }
         }
    });

    
    function closeAllList(elmnt){
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        if(x == undefined){return false;}
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != searchBar) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
      }

     /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllList(e.target);
    });

}

autocompleteFunction(document.getElementById("search-bar"));




