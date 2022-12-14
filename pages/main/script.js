import pets from "../pets.js";
console.log(pets);

// hamburger

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

// carousel
class PetCard {
  constructor(src, alt, title, parentContainer, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.classes = classes;
    this.parent = document.querySelector(parentContainer);
  }

  render() {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.dataset.pet = `${this.title}`;

    if (this.classes.length === 0) {
      this.wrapperDiv = "friends__items_item";
      wrapperDiv.classList.add(this.wrapperDiv);
    } else {
      this.classes.forEach((className) => wrapperDiv.classList.add(className));
    }
    wrapperDiv.innerHTML = `
    <div class="item_inner" data-pet="${this.title}">
    <img class="pet-photo-front"
      src="${this.src}"
      alt="${this.alt}"
      data-pet="${this.title}"
    />
    <h4 class="friends__item_title front" data-pet="${this.title}">${this.title}</h4>
    <button
      class="friends__item_button button front"
      type="button"
      data-pet="${this.title}"
    >
      Learn more
    </button>
</div>
                `;
    this.parent.append(wrapperDiv);
    return wrapperDiv;
  }
}

let currentSlider = getRandomArr(0, pets.length, pets);
let pastSlider;

showPetCard();

const prev = document.querySelector('.button_prev'),
  next = document.querySelector('.button_next');
prev.addEventListener('click', changeCards);
next.addEventListener('click', changeCards);

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArr(min, max, arr) {
  let num;
  let arrOfRandomNum = [];
  for (let i = 0; i < 3; i++) {
    num = getRandomNum(min, max);
    if (!arrOfRandomNum.includes(num) && !arr.includes(num)) {
      arrOfRandomNum.push(num);
    } else {
      i--;
    }
  }
  return arrOfRandomNum;
}

function showPetCard() {
  let cards = currentSlider.map(i => {
    return new PetCard(
      pets[i].img,
      pets[i].breed,
      pets[i].name,
      ".items-container",
      "friends__items_item"
    ).render();
  });
  cards.forEach(card => card.addEventListener('click', openModal));
}

function changeCards() {
  pastSlider = currentSlider;
  currentSlider = getRandomArr(0, pets.length, pastSlider);
  console.log(pastSlider, currentSlider);
    deletePrevCard();
  showPetCard();
}

function deletePrevCard() {
  document.querySelector('.items-container').innerHTML = '';
}


// pop-up window

const MODAL = document.querySelector(".modal"),
  DARKEN = document.querySelector(".popup-dark-container"),
  CLOSE_MODAL = document.querySelector(".popup-close"),
  POPUP_WINDOW = document.querySelector(".popup-window");



CLOSE_MODAL.addEventListener("click", closeModal);
MODAL.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("modal")) {
    closeModal();
  }
});

function openModal(event) {
  DARKEN.classList.add("darken-show");
  MODAL.classList.add("modal-show");
  BODY.style.overflowY = "hidden";
  showInfo(event);
}

function showInfo(event) {
  let dataPet = event.target.dataset.pet;
  for (let pet of pets) {
    if (pet.name == dataPet) {
      POPUP_WINDOW.innerHTML = `
        <div class="popup_picture">
          <img src="${pet.img}" alt="pet photo">
        </div>
        <div class="popup_description">
          <h3 class="description_title">${pet.name}</h3>
          <h4 class="description_type-of-pet">${pet.type} - ${pet.breed}</h4>
          <p class="description_text">${pet.description}</p>
          <ul class="description_other">
            <li><span>Age: ${pet.age}</span></li>
            <li><span>Inoculations: ${pet.inoculations}</span></li>
            <li><span>Diseases: ${pet.diseases}</span></li>
            <li><span>Parasites: ${pet.parasites}</span></li>
          </ul>
        </div>
      `;
    }
  }
}

function closeModal() {
  DARKEN.classList.remove("darken-show");
  MODAL.classList.remove("modal-show");
  BODY.style.overflowY = "";
}









// console.log(slidesContainer.style.width);
// function

// carousel

// let petsArr = pets;
// let currentSlider = getRandomArr(3, 7);
// let pastSlider;

// console.log(sliderItem);

// function getPets(arr) {
//   let petSliderArr = [];
//   arr.forEach(i => {
//     petSliderArr.push(petsArr[i]);
//   });
//   return petSliderArr;
// }

// function createElements() {
//   let i = 0;
//   let string = "";
//   let newElements = getPets(currentSlider);

//   newElements.forEach((i) => {
//     string += `<div class="friends__items_item" data-pet="${i.name}">
//       <div class="item_inner" data-pet="${i.name}">
//       <img class="pet-photo-front" src="${i.img}" alt="${i.type} ${i.name}" data-pet="${i.name}"/>
//       <h4 class="friends__item_title front" data-pet="${i.name}">${i.name}</h4>
//       <button class="friends__item_button button front" type="button" data-pet="${i.name}">Learn more</button>
//       </div>
//       </div>`
//   });
//   sliderContainer.insertAdjacentHTML('beforeend', string);
//   console.log(sliderItem);
//   return sliderItem;

//   // sliderItem.forEach(i => i.addEventListener("click", openModal));
// }

// function getRandomArr(length, maxValue) {
//   let num;
//   let arr = [];

//   for (let i = 0; i < length; i++) {
//     num = getRandomInt(0, maxValue);
//     if (!arr.includes(num)) {
//       arr.push(num);
//     } else {
//       i -= 1;
//     }
//   }
//   return arr;
// }

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const LEFT_BTN = document.querySelector(".button_prev");
// const RIGHT_BTN = document.querySelector(".button_next");

// LEFT_BTN.addEventListener("click", changeCard);
// RIGHT_BTN.addEventListener("click", changeCard);

// function changeCard(event) {
//   pastSlider = currentSlider;
//   currentSlider = getRandomArrayRel(3, pastSlider, 7);
//   let newElements = getPets(currentSlider);
//     console.log(event.target);

//   deletePrevCard();
//         setTimeout(() => {
//             createElements(newElements);
//         }, 100);

// }

// function getRandomArrayRel(len, arr, maxVal) {
//   let num;
//   let newArr = [];

//   for (let i = 0; i < len; i++) {
//       num = getRandomInt(0, maxVal);
//       if (!arr.includes(num) && !newArr.includes(num)) {
//           newArr.push(num);
//       } else {
//           i -= 1;
//       }
//   }

//   return newArr;
// }

// function deletePrevCard() {
//   sliderContainer.innerHTML = "";
// }

// // function moveLeft() {
// //   sliderContainer.classList.add("transition-left");
// //   LEFT_BTN.removeEventListener('click', moveLeft);
// //   RIGHT_BTN.removeEventListener('click', moveRight);
// // }

// // function moveRight() {
// //   // sliderContainer.classList.add("transition-right");
// //   // LEFT_BTN.removeEventListener("click", moveLeft);
// //   // RIGHT_BTN.removeEventListener("click", moveRight);
// // }

// LEFT_BTN.addEventListener("click", deletePrevCard);
// RIGHT_BTN.addEventListener("click", deletePrevCard);
// sliderItem.forEach(i => i.addEventListener("click", openModal));

// sliderContainer.addEventListener("animationend", changeCard);
