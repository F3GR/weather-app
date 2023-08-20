import './reset.css'
import './style.css'

const img = document.querySelector('img');
const button = document.querySelector('button.new-image')
button.addEventListener('click', (e) => {
    const text = document.querySelector('#gif-query').value
    fetchNewImageSrc(img, text)
})

function fetchNewImageSrc(element,text) {
    element.src = ''
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=vKtQCOzfde0ZpQH426p1RN8qx1dqYuAD&s=${text}`)
    .then(function(response) {
    return response.json()
    })
    .then(function(response) {
    element.src = response.data.images.original.url
    })
}