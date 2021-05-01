const weather = {
    api: "1f7e4c168d97034654204bec4984f08c",
    fetchWeather : function(city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        +city+
        "&units=metric&appid="
        +this.api)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {temp, feels_like, humidity} = data.main;
        const {icon, description} = data.weather[0];
        
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = Math.round(temp)+"°C";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText= description;
        document.querySelector(".feel").innerText="Feels like : "+feels_like+"°C";
        document.querySelector(".container").classList.remove("loading");
        document.querySelector(".humidity").innerText = "Humidity : "+humidity+"%";
        document.body.style.backgroundImage=url("'https://source.unsplash.com/random?'+name");
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Bangalore");