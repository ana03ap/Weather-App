const input = document.getElementById('input-a-buscar')// traer el input ingresado
const btn = document.getElementById('btn')// lupa, se oprime cuando se quiere buscar una nueva ciudad 
const apiKey = "4e7396a09cc36a7468303afa3968989c"; // Reemplaza con tu clave de API
const cities = ["medellin", "seoul", "bogota","paris","londres", "barranquilla"]// array de ciudades que quiero conultar de primero n
const humidity =  document.getElementById("humidity-text")
const wind =  document.getElementById("wind-text")
const main = document.getElementById("root");
const barranquilla= document.querySelector(".card-principal");// para traer la tarjeta de barranquilla 
const deleteBtn = document.querySelector(".btn-delete");// si se oprime se borra la card que estaba siendo señalada 

const box = document.querySelector('.popUp');// boton pal pop up que parece cuando escribirste algo mal
const buttonClose = document.getElementById('btnClose');


// funcion que hace el fetch
const getInfo = (x, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${apiKey}&units=metric`;// en unit metrics me aseguro que la temperatura este en celsius
    console.log(url)
    fetch(url)
        .then((response) => response.json())// devolver un json si hay respuesta
        .then((data) => {// data se llama el json que nos traemos 
        const temperature = data.main.temp;// aqui me traigo la temperatura
        const tempMax = data.main.temp_max;;
        const tempMin= data.main.temp_min;;
        const feels_like = data.main.feels_like;
        const humedad = data.main.humidity;
        const viento = data.wind.speed;
        console.log(data)
        let imageSrc;
        // The image is gonna chage depending on the weather descritpion 
        switch(data.weather[0].main){
            case 'Clear':
                imageSrc= 'images/nuevas/sunny foggy.png'
                break;

            case'Clouds':
                imageSrc = 'images/nuevas/cloudy.png'
                break;

            case'Drizzle':
                imageSrc = 'images/nuevas/rain light.png'
                break;

            case'Mist':
                imageSrc = 'images/nuevas/cloudy.png'
                break;

            case'Snow':
                imageSrc = 'images/snow.png'
                break;

            case'Rain':
                imageSrc = 'images/nuevas/thunder.png'
                break;
            case'Fog':
            imageSrc = 'images/nuevas/windy.png'
            break;
        }



        if(x=="barranquilla"){//para que esta carta se cree arriba en la principal 
            console.log("hola")
            humidity.innerText =  `Humidity ${humedad}%`;
            wind.innerText =  `Wind  ${viento}%`;

            if(tempMax==tempMin){
                barranquilla.innerHTML += `
                <div class="weather">
                        <img src="images/nuevas/sunny foggy 2.png" alt="" class="weather-icon">
                        <p id="temp">${Math.ceil(parseInt(temperature))} °C</p>
                        <p id="feelslike"> Feels like  ${feels_like }</p>
                </div> 
                `
            }else{
                barranquilla.innerHTML += `
            <div class="weather">
                    <img src="images/nuevas/sunny foggy 2.png" alt="" id="weather-icon">
                    <p id="temp">${Math.ceil(parseInt(temperature))} °C</p>
                    <p id="temp-min-max">${tempMin} - ${tempMax }</p>
            </div> 
            `
            }
            
        }else{
            main.innerHTML += `
        
                <div class="card">
                
                    <box-icon name='x' color='#ffffff' class ="btn-delete" id="${data.name}"></box-icon>
                    <h1 class="name">${data.name}, ${data.sys.country} </h1>
                    <div class="card2">
                        <img src='${imageSrc}' alt="" class="weather-icon">
                        <p class="temp">${Math.ceil(parseInt(temperature))} °C</p>
                    </div> 

                    
                    <p id="description">${data.weather[0].main}</p>
                
                </div> 
                `
        }

        
    })
        .catch((error) => {
            // "No se pudo obtener la información del clima.";
        console.error("Error al obtener los datos del clima:", error);
        console.log("escribir bien el nombre de la ciudad")
        
    });
};


cities.forEach(element => {
    getInfo(element,apiKey);
});


btn.addEventListener('click',()=>{// cuando se oprime el boton de buscar 
    const busqueda  = input.value // obtener el valor del input 
    console.log(busqueda)
    // validando si la ciudad ya esta
    console.log(cities)
    if (cities.includes(busqueda)) {
        box.classList.toggle('popUpOn')
        // agregar aqui un alert o alguna vaina
    } else {
        cities.push(busqueda )
        getInfo(busqueda, apiKey)// hacer la funcion que pone la card de la ciudad 
    }

})


function eliminarElementoFromArray(arr, elementoAEliminar) {
    var indice = arr.indexOf(elementoAEliminar);
    arr.splice(indice, 1);
}



// deleteBtn.addEventListener('click',()=>{// cuando se oprime el boton de buscar 
//     eliminarElementoFromArray(arr, elementoAEliminar)

// })






// funcion para la hora en el frame principal 
function getDayandHour(){
    const fechaActual = new Date();// Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const diaSemana = fechaActual.getDay();// Obtener el número del día del mes
    const diaMes = fechaActual.getDate();// Obtener el mes (0 = Enero, 1 = Febrero, ..., 11 = Diciembre)
    const mes = fechaActual.getMonth();// Obtener el año
    const año = fechaActual.getFullYear();// Días de la semana en formato de texto
    const diasSemanaTexto = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];// Meses en formato de texto
    const mesesTexto = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    document.getElementById("fecha").innerText = `${mesesTexto[mes]} ${diaMes} `;

}
getDayandHour()


// funcion para hacer el reloj
function  currentTime(){
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour= updateTime(hour);
    min= updateTime(min);
    sec= updateTime(sec);
    document.getElementById("hora").innerText = hour+" : "+min+" : "+sec;
    let t  = setTimeout(function(){
        currentTime()
    }, 1000)
}

function updateTime(k){
    if(k<10){
        return "0"+k;
    }
    else{
        return k;
    }
}
currentTime();


buttonClose.addEventListener('click', () => {
    box.classList.toggle('popUpOn')
})
