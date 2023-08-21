import './reset.css'
import './style.css'

let currentLocation;
const TEMP_MODES = {
    CELSIUS: 'Celsius',
    FAHRENHEIT: 'Fahrenheit'
}

const tempToggle = document.querySelector('button.degree-toggle')
tempToggle.addEventListener('click', () => toggleTempMode(tempToggle, currentLocation))
function toggleTempMode(element, locationJSON) {
    if (!locationJSON) {
        alert('Please search for the location before switching')
        return
    }
    if (element.getAttribute('data-mode') === TEMP_MODES.CELSIUS) {
        element.setAttribute('data-mode', `${TEMP_MODES.FAHRENHEIT}`)
        element.innerText = 'Show in Celsius'
    } else {
        element.setAttribute('data-mode', `${TEMP_MODES.CELSIUS}`)
        element.innerText = 'Show in Fahrenheit'
    }
    console.log(locationJSON)
    updateTemperature(tempInfo, locationJSON)
}


const location = document.querySelector('.location')
const img = document.querySelector('.weather-container > img')
const description = document.querySelector('.weather-description')
const tempInfo = document.querySelector('.temperature > .temperature-info')
const searchBtn = document.querySelector('button.search-location')
searchBtn.addEventListener('click', async () => {
    const text = document.querySelector('#location').value
    const okResponse = await loadWeather(text)
    if (okResponse) {
        updateLocation(location, okResponse)
        updateWeatherImg(img, okResponse)
        updateDescription(description, okResponse)
        updateTemperature(tempInfo, okResponse)
        currentLocation = okResponse
    }
})

async function loadWeather(text) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d323255ee7ba4e41970204944232008&q=${text}`, { mode: 'cors' })
        if (response.status !== 200) {
            alert('Location wasn\'t found');
            return
        }

        const responseJSON = await response.json()
        return responseJSON
    } catch (err) {
        alert('The request was\'t successful, please try later or check your internet connection')
    }
}

async function updateLocation(element, responseJSON) {
    element.innerText = `${responseJSON.location.name}, ${responseJSON.location.country}`
}

async function updateWeatherImg(element, responseJSON) {
    element.src = 'https://' + responseJSON.current.condition.icon.slice(2)
    element.alt = responseJSON.current.condition.text
}

async function updateDescription(element, responseJSON) {
    element.innerText = responseJSON.current.condition.text
}

async function updateTemperature(element, responseJSON) {
    if (tempToggle.getAttribute('data-mode') === TEMP_MODES.CELSIUS) {
        element.innerText = responseJSON.current.temp_c
    } else {
        element.innerText = responseJSON.current.temp_f
    }
}