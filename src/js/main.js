const navBtn = document.querySelector(".nav__btn");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link")

navBtn.addEventListener("click", function () {

  nav.classList.toggle("active");
});

navLinks.forEach(link=>{
  link.addEventListener("click",function(){
    nav.classList.remove("active")
  })
})

window.addEventListener('scroll',function(){
  const header = document.querySelector(".header")
  if(window.scrollY > 0){
  header.classList.add("change")
  }
  else{
    header.classList.remove("change")
  }
})

//reviews slider

const sliderBtns = document.querySelectorAll(".slider__btn");

sliderBtns.forEach((btn, index) => {
  btn.addEventListener("click", function (e) {
    changeSlide(e, index);
  });
});

function changeSlide(e, i) {
  const sliderRow = document.querySelector(".slider__row");
  const sliderWidth = sliderRow.getBoundingClientRect().width;
  let clickBtn = e.target;

  sliderBtns.forEach((btn, index) => {
    btn.classList.remove("active");
    e.target.classList.add("active");
  });
  sliderRow.style.transform = `translateX(${-i * sliderWidth}px)`;
}

/// tooltip

const shortcuts = document.querySelectorAll(".card__icon");

shortcuts.forEach((item) => {
  item.addEventListener("mouseover", function (e) {
    const shortcut = e.target.getAttribute("data-shortcut");
    let posX = e.clientX + 10;
    let posY = e.clientY + 10;
    createTooltip(shortcut, [posX, posY]);
  });
  item.addEventListener("mouseout", function () {
    document.querySelector(".tooltip").remove();
  });
});

function createTooltip(mes, pos) {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.textContent = mes;
  tooltip.style.top = `${pos[1]}px`;
  tooltip.style.left = `${pos[0]}px`;

  document.querySelector("body").appendChild(tooltip);

  removeTooltip(tooltip);
}

function removeTooltip(tooltip) {
  setTimeout(function () {
    tooltip.remove();
  }, 3000);
}

//search filer

const url = "https://randomuser.me/api/?results=50";
const filter = document.querySelector(".search__input");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;

  createPersons(results);
}

function createPersons(results) {
  const container = document.querySelector(".search__bottom");

  results.forEach((result) => {
    let person = document.createElement("div");
    person.classList.add("search__person");
    person.innerHTML = `
      <img src="${result.picture.medium}" alt="${result.name.first} ${result.name.first}" class="search__img">
      <div class="search__person-info">
        <h4 class="search__name">${result.name.first} ${result.name.last}</h4>
        <p class="search__location">${result.location.city} ${result.location.country}</p>
      </div>
      `;
    container.appendChild(person);
  });
}

filter.addEventListener("input", function () {
  let value = filter.value;
  let persons = document.querySelectorAll(".search__person");

  persons.forEach((person) => {
    if (person.innerHTML.toLowerCase().includes(value)) {
      person.style.display = "flex";
    } else {
      person.style.display = "none";
    }
  });
});

window.onload = getData();

//products count

const products = document.querySelectorAll(".card");

products.forEach((product) => {
  const btns = product.querySelectorAll(".card__amount-btn");
  const cost = parseFloat(product.querySelector(".card__price").textContent);

  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      btns.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
      const amount = parseFloat(e.target.innerText);
      let total = amount * cost;
      const sum = product.querySelector(".card__total-amount");
      sum.textContent = `${total}$`;
    });
  });
});

// checkbox

const checkInputs = document.querySelectorAll(".checkbox__input");

const goodInput = document.querySelector("#good");
const cheapInput = document.querySelector("#cheap");
const fastInput = document.querySelector("#fast");

checkInputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (goodInput.checked && cheapInput.checked && fastInput.checked) {
      if (fastInput.checked && goodInput.checked) {
        fastInput.checked = false;
      }
      if (fastInput.checked && cheapInput.checked) {
        goodInput.checked = false;
      }
    }
  });
});

//notyfications

const form = document.querySelector(".contact__form");

function createNotify(mes) {
  const container = document.querySelector(".notifications");
  let notify = document.createElement("div");
  notify.classList.add("notifications__notify");
  notify.textContent = mes;
  container.appendChild(notify);

  removeNotify(notify);
}

function removeNotify(el) {
  setTimeout(function () {
    el.remove();
  }, 3000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  form.reset();
  createNotify("message was sent");
});
