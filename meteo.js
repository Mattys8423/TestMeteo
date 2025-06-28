//Clé API de OpenWeather
const apiKey = "7a3ec954cdd8b4356a6c32fef1fbdf2f";

//Mettre la fonction GetWeather sur la touche entrée une fois que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getWeather();
        }
    });
});

//Mettre la fonction GetWeather sur le bouton de recherche
document.getElementById("search-button").addEventListener("click", getWeather);

function getWeather() {

    //Variable de la ville
    const city = document.getElementById("cityInput").value;

    //appel a l'API avec la ville en paramètre
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${apiKey}&units=metric&lang=fr`)

        //Gerer l'exception de si la ville n'est pas trouvé dans la base de donnée
        .then(response => {
            if (!response.ok) throw new Error("Ville non trouvée");
            return response.json();
        })

        //fait les changements en fonction des résultats
        .then(data => {
            //variables
            const main = data.weather[0].main.toLowerCase();
            const iconCode = data.weather[0].icon;

            //Change la ville et la temperature
            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temperature").textContent = `${data.main.temp} °C`;

            //Change L'icone
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            //Montre les éléments 
            document.getElementById("weatherResult").classList.remove("hidden");

            //Changement de fond selon le temps et le moment de la journée
            if (main.includes("clear") && iconCode.includes("d")) {
                document.body.className = "sunny";
            } else if (main.includes("rain") || main.includes("drizzle") || main.includes("thunderstorm") && iconCode.includes("n")) {
                document.body.className = "rainy";
            } else {
                document.body.className = "cloudy";
            }
        })
}


