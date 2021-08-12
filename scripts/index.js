

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
