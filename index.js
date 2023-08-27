const url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${apiKey}&units=metric`
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        const Info = data.results;
        // console.log(Info);
        console.log(Info)
    })
    .catch((err) => {
        console.log(err);
    });
