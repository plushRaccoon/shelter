import pets from "../pets.js";


const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation__list");
const logo = document.querySelector(".header__logo");
const BODY = document.querySelector("body");
const DARK_NAV = document.querySelector(".nav-wrapper");

function toggleMenu() {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
  logo.classList.toggle("open");
  DARK_NAV.classList.toggle("open");
  BODY.classList.toggle("open");
  slideMenu();
}
hamburger.addEventListener("click", toggleMenu);

function slideMenu() {
  const navOpen = document.querySelector(".navigation__list.open");
  if (nav) {
    nav.style.animation = "slideIn 0.5s linear";
  }
  if (navOpen) {
    navOpen.style.animation = "slideOut 0.5s linear";
  }
}


function closeMenu() {
  nav.classList.remove("open");
  hamburger.classList.remove("open");
  DARK_NAV.classList.remove("open");
  BODY.classList.remove("open");
  slideMenu();
}
const navLinks = document.querySelectorAll(".navigation__item");
navLinks.forEach((el) => el.addEventListener("click", closeMenu));
DARK_NAV.addEventListener("click", closeMenu);


// popup

const PET_CARD = document.querySelectorAll(".item_back");
const BTN_LEARN_MORE = document.querySelectorAll(".friends__item_button");
const MODAL = document.querySelector(".modal");
const DARKEN = document.querySelector(".popup-dark-container");
const CLOSE_MODAL = document.querySelector(".popup-close");
const POPUP_WINDOW = document.querySelector(".popup-window");
const sliderItem = document.querySelectorAll(".item_inner");
const sliderContainer = document.querySelector(".friends__items");

PET_CARD.forEach((i) => i.addEventListener("click", openModal));
BTN_LEARN_MORE.forEach((i) => i.addEventListener("click", openModal));
CLOSE_MODAL.addEventListener("click", closeModal);
MODAL.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("modal")) {
    closeModal();
  }
  console.log(target);
});

function openModal(event) {
  DARKEN.classList.add("darken-show");
  MODAL.classList.add("modal-show");
  BODY.style.overflowY = "hidden";
  const pet = event.target.dataset.pet;
  for (let i of pets) {
    if (i.name === pet) {
      const popupPicture = `<div class="popup_picture"><img src="${i.img}" alt=""></div>`;
      const descriptionTitle = `<h3 class="description_title">${i.name}</h3>`;
      const typeOfPet = `<h4 class="description_type-of-pet">${i.type} - ${i.breed}</h4>`;
      const text = `<p class="description_text">${i.description}</p>`;
      const otherList = `<ul class="description_other"><li><span>Age: ${i.age}</span></li><li><span>Inoculations: ${i.inoculations}</span></li><li><span>Diseases: ${i.diseases}</span></li><li><span>Parasites: ${i.parasites}</span></li></ul>`;
      const divDescription = `<div class="popup_description">${descriptionTitle}${typeOfPet}${text}${otherList}</div>`;
      POPUP_WINDOW.insertAdjacentHTML("afterbegin", popupPicture);
      POPUP_WINDOW.insertAdjacentHTML("beforeend", divDescription);
    }
  }
  console.log(pet);
}

function closeModal() {
  DARKEN.classList.remove("darken-show");
  MODAL.classList.remove("modal-show");
  BODY.style.overflowY = "scroll";
  POPUP_WINDOW.innerHTML = '';
}


// carousel

let petsArr = pets;
let currentSlider = getRandomArr(7, 7);
let pastSlider;

console.log(sliderItem);

function getPets(arr) {
  let petSliderArr = [];
  arr.forEach(i => {
    petSliderArr.push(petsArr[i]);
  });
  return petSliderArr;
}

function createElements() {
  let i = 0;
  let string = "";
  let newElements = getPets(currentSlider);

  newElements.forEach((i) => {
    string += `<div class="friends__items_item" data-pet="${i.name}">
      <div class="item_inner" data-pet="${i.name}">
      <img class="pet-photo-front" src="${i.img}" alt="${i.type} ${i.name}" data-pet="${i.name}"/>
      <h4 class="friends__item_title front" data-pet="${i.name}">${i.name}</h4>
      <button class="friends__item_button button front" type="button" data-pet="${i.name}">Learn more</button>
      </div>
      </div>`
  });
  sliderContainer.insertAdjacentHTML('beforeend', string);
  console.log(sliderItem);
  return sliderItem;
}

function getRandomArr(length, maxValue) {
  let num;
  let arr = [];

  for (let i = 0; i < length; i++) {
    num = getRandomInt(0, maxValue);
    if (!arr.includes(num)) {
      arr.push(num);
    } else {
      i -= 1;
    }
  }
  return arr;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LEFT_BTN = document.querySelector(".prev");
const RIGHT_BTN = document.querySelector(".next");

LEFT_BTN.addEventListener("click", changeCard);
RIGHT_BTN.addEventListener("click", changeCard);

function changeCard(event) {
  pastSlider = currentSlider;
  currentSlider = getRandomArrayRel(7, pastSlider, 7);
  let newElements = getPets(currentSlider);
    console.log(event.target);
  
  deletePrevCard();
        setTimeout(() => {
            createElements(newElements);
        }, 100);
  
}

function getRandomArrayRel(len, arr, maxVal) {
  let num;
  let newArr = [];

  for (let i = 0; i < len; i++) {
      num = getRandomInt(0, maxVal);
      if (!arr.includes(num) && !newArr.includes(num)) {
          newArr.push(num);
      } else {
          i -= 1;
      }
  }

  return newArr;
}

function deletePrevCard() {
  sliderContainer.innerHTML = "";
}

LEFT_BTN.addEventListener("click", deletePrevCard);
RIGHT_BTN.addEventListener("click", deletePrevCard);
sliderItem.forEach(i => i.addEventListener("click", openModal));
