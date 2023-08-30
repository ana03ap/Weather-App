
/*
const weatherDataElement = document.getElementById("weather-data");
const buscar = document.getElementById('search')
const btn = document.getElementById('btn')
const apiKey = "4e7396a09cc36a7468303afa3968989c"; // Reemplaza con tu clave de API
const cities = ["Londes", "Paris", "Seoul"];// array de ciudades que quiero conultar de primero n

const getInfoCities = (x) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${apiKey}&units=metric`;// en unit metrics me aseguro que la temperatura este en celsius
    fetch(url)
        .then((response) => response.json())// devolver un json si hay respuesta
        .then((data) => {// data se llama el json que nos traemos 
        const temperature = data.main.temp;// aqui me traigo la temperatura
        const weatherDescription = data.weather[0].description;// dice la description del clima Ex "light rain"
        //const weatherInfo = `La temperatura en ${x} es ${temperature}°C y el clima es ${weatherDescription}. <br>`;
        
        weatherDataElement.innerHTML += `
        <h1>${data.name}</h1>
        <p>${data.weather[0].description}</p>
        <p>${data.sys.country}</p>
        `
    })
        .catch((error) => {
        console.error("Error al obtener los datos del clima:", error);
        weatherDataElement.textContent =
        "No se pudo obtener la información del clima.";
    });
};

getInfoCities(citys[0]);// como pparametro entra el nombre de la ciudad que estas buscando
getInfoCities(citys[1]);
getInfoCities(citys[2]);

// cuando se oprima en buscar
btn.addEventListener('click', ()=> {
    console.log('hello desde JS')
    console.log(buscar.value)
    GetInfoCitys(buscar.value);
    buscar.value = ''// vaciarlo
})

*/

const input = document.getElementById('input-a-buscar')
const btn = document.getElementById('btn')
const apiKey = "4e7396a09cc36a7468303afa3968989c"; // Reemplaza con tu clave de API
const cities = ["medellin", "seoul", "bogota","paris","londres",]// array de ciudades que quiero conultar de primero n
const tempMax = "";
const tempMin= "";
const main = document.getElementById("root");
const barranquilla= document.querySelector(".card-principal")// para traer la tarjeta de barranquilla 
const miCiudad = "barranquilla"
const sw = 0
const getInfo = (x, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${apiKey}&units=metric`;// en unit metrics me aseguro que la temperatura este en celsius
    console.log(url)
    fetch(url)
        .then((response) => response.json())// devolver un json si hay respuesta
        .then((data) => {// data se llama el json que nos traemos 
        const temperature = data.main.temp;// aqui me traigo la temperatura
        const description = data.weather[0].description;// dice la description del clima Ej "light rain"
        const tempMax = data.main.temp_max;;
        const tempMin= data.main.temp_min;;
        console.log(data)

        if(x=="barranquilla"){//es que solo voy a hacer la de barranquilla 
            // switch(data.weather[0].description){
            //     case "Clouds":
            //         break;
            //     case "Rain":
            //         break;
            //     case "Mist":
            //         break;
            // }
            // sw=1
            console.log("hola")
            barranquilla.innerHTML += `
            <div class="weather">
                    <img src="images/nuevas/sunny foggy.png" alt="" id="weather-icon">
                    <p id="description">${description}</p>
                    <p id="temp">${Math.ceil(parseInt(temperature))} °C</p>
                    <p id="temp-min-max">${tempMin} - ${tempMax }</p>
            </div> 
            `
        }else{
            main.innerHTML += `
        
                <div class="card">
                <h1 id="name">${data.name}</h1>
                <p id="description">${data.weather[0].description}</p>
                <p id="country">${data.sys.country}</p>
                </div> 
                `
        }

        
    })
        .catch((error) => {
        console.error("Error al obtener los datos del clima:", error);
        console.log("escribir bien el nombre de la ciudad")
        // weatherDataElement.textContent =
        // "No se pudo obtener la información del clima.";
    });
};

getInfo ("barranquilla", apiKey)
cities.forEach(element => {
    getInfo(element,apiKey);
});


btn.addEventListener('click',()=>{// cuando se oprime el boton de buscar 
    const busqueda  = input.value // obtener el valor del input 
    console.log(busqueda)
    // validando si la ciudad ya esta
    console.log(cities)
    if (cities.includes(busqueda)) {
        alert("ya esta ciudad esta en el arreglo");// si ya está no pasa nada
        // agregar aqui un alert o alguna vaina
    } else {
        cities.push(busqueda )
        getInfo(busqueda, apiKey)// hacer la funcion que pone la card de la ciudad 
    }

})



