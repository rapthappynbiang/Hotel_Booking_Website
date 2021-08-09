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

