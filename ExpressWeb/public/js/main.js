const submitBtn=document.getElementById("submitBtn") 
const cityName=document.getElementById("cityName")
const city_name=document.getElementById("city_name");
const temp_real_val=document.getElementById("temp_real_val")
const temp_status=document.getElementById("temp_status")
const datahide=document.querySelector(".middle_layer")
const day=document.getElementById("day")
const today_date=document.getElementById("today_date");
const getCurrentday=()=>{
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday"
    weekday[4]="Thursday"
    weekday[5]="Friday";
    weekday[6]="Satureday"
    let currentday=new Date()
 
    let days=weekday[currentday.getDay()];
    day.innerHTML=days;
}
getCurrentday();
const getCurrentTime=()=>{
    var months=['Jan','Fab','Mar','Apr','may','June','July','Aug','Sept','Oct','Nov','Dec'];
    var now=new Date();
    var month=now.getMonth();
    var date=now.getDate();
    
    
    today_date.innerHTML=`${months[month]} ${date}`
};
getCurrentTime();

const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if(cityVal==""){
        city_name.innerText=`please write the city name before search`;
        datahide.classList.add('data_hide')
    }
    else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=fb2d793f446e949d010afe1a31577861`;
            const response=await fetch(url) 
            const data=await response.json()
            const arrData=[data]
            city_name.innerText=`${arrData[0].name} , ${arrData[0].sys.country}`;
            temp_real_val.innerText=Math.trunc(arrData[0].main.temp-273);
            temp_status.innerText=arrData[0].weather[0].main;
            const tempmood=arrData[0].weather[0].main;
            if(tempmood=="Clear")
            {
                temp_status.innerHTML="<i class='fas fa-sun' style='color:white'></i>";
            }
            else if(tempmood=="Cloud")
            {
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:white'></i>";
            }
            if(tempmood=="Rain")
            {
                temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color:white'></i>";
            }
            else
            {
                temp_status.innerHTML="<i class='fas fa-sun' style='color:white'></i>";
            }
        datahide.classList.remove('data_hide')

            console.log(arrData);
        }
        catch{
        city_name.innerText=`please write the correct city name`;
        datahide.classList.add('data_hide')

        }
    }
}

   
submitBtn.addEventListener('click',getInfo)
