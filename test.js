const firstImg = {
  src: './originals/first.png',
  alt: 'First image'
}
const secondImg = {
  src: './originals/second.png',
  alt: 'Second image'
}
const thirdImg = {
  src: './originals/third.png',
  alt: 'Third image'
}
const arrImg = [firstImg, secondImg, thirdImg];
const n = arrImg.length;

const slideFooter = document.querySelector('.slide-container > .slide-foot')
const slide = document.querySelector('.slide-container > .slide-main > .slide img')
const allDots = slideFooter.querySelectorAll('img')

let timeoutId;
let slideIndex;

function resetTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    navigateToSlide((slideIndex + 1) % arrImg.length);
  }, 5000);
}

slideFooter.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName === 'IMG') {
    const newIndex = Number(target.getAttribute('data-index'));
    navigateToSlide(newIndex);
  }
});

const previous = document.querySelector('.slide-main .previous')
previous.addEventListener('click', () => {
  navigateToSlide((slideIndex - 1 + arrImg.length) % arrImg.length);
});

const next = document.querySelector('.slide-main .next')
next.addEventListener('click', () => {
  navigateToSlide((slideIndex + 1) % arrImg.length);
});


function navigateToSlide(newIndex) {
  resetTimeout();
  slideIndex = newIndex;
  replaceCurrentSlide(slideFooter, slideIndex);
  renderNewSlide(slide, arrImg, slideIndex);
}

function renderNavDots(parentContainer, arrImg) {
  for (let i = 0; i < arrImg.length; i++) {
    const item = document.createElement('img')
    item.setAttribute('data-index', `${i}`)
    item.src = './originals/radio-unchecked.svg'
    item.alt = 'Navigation dot'
    parentContainer.appendChild(item)
  }
}

function replaceCurrentSlide(parentContainer, newIndex) {
  const currentDot = parentContainer.querySelector('img.current')
  if (currentDot) {
    currentDot.classList.remove('current')
  }

  const newDot = parentContainer.querySelector(`img[data-index='${newIndex}']`)
  if (newDot) {
    newDot.classList.add('current')
  }
}

function renderNewSlide(element, arr, index) {
  element.src = arr[index].src;
  element.alt = arr[index].alt;
}


renderNavDots(slideFooter, arrImg);
navigateToSlide(0);