const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



  
const apiKey = '86c659123987b828366ebd6f45c77ed6';

app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const weatherData = response.data;

    const mainWeather = weatherData.list[0].main;
    const temperature = Math.round(mainWeather.temp-273.15);
    const humidity = mainWeather.humidity;
    const lat = weatherData.city.coord.lat;
    const lon = weatherData.city.coord.lon
    const weather = weatherData.list[0].weather[0].main
    const desc = weatherData.list[0].weather[0].description
    const feels_like = Math.round(mainWeather.feels_like-273.15)
    const pressure = mainWeather.pressure;
    const w_speed = weatherData.list[0].wind.speed;
    const code = weatherData.city.country;
    const timeAPi = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`)
    const time = timeAPi.data.time
    const factsApi= await axios.get(`http://numbersapi.com/${Math.abs(temperature)}`)
    const fact = factsApi.data






    // Вывод данных о погоде на страницу
    res.render('city', { city, temperature, humidity,lat,lon,weather,desc,feels_like,pressure,w_speed,code,time,fact });
  } catch (error) {
    res.send("Ошибка");
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
