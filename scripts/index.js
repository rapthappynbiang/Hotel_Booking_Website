
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