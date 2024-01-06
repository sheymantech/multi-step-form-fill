"use strict";

const formSubmit = document.querySelector("form");
const inputEmail = document.getElementById("input-email");
const inputNum = document.getElementById("input-num");
const errorMessage = document.querySelectorAll(".danger");
const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");
const step4 = document.querySelector(".step-4");
const step5 = document.querySelector(".step-5");
const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const barBox = document.querySelectorAll(".progress-bar-box");
// selection fo progress bar container
const progressCont = document.querySelector(".progress-wrapper");
// step-2 btn- selection
const step2Forward = document.querySelector(".btn-step-2");
const step2Backward = document.querySelector(".btn-back-2");

//step 3 btn-selection

const step3Forward = document.querySelector(".btn-step-3");
const step3Backward = document.querySelector(".btn-back-3");

// btn step 4 selection

const step4Forward = document.querySelector(".btn-step-4");
const step4Backward = document.querySelector(".btn-back-4");

// switch button implementation
const yearPlan = document.querySelectorAll(".year-plan");
const btnSwitch = document.querySelector(".switch-toggle");
// selection of plan price
const priceText1 = document.querySelector(".price-year1");
const priceText2 = document.querySelector(".price-year2");
const priceText3 = document.querySelector(".price-year3");

// selection of add ons price

const addondPrice1 = document.querySelector(".price-addons-1");
const addondPrice2 = document.querySelector(".price-addons-2");
const addondPrice3 = document.querySelector(".price-addons-3");
// selections of plans
const plans = document.querySelectorAll(".plans");
// selection of add-ons check-box
const addons = document.querySelectorAll('input[type="checkbox"]');
//selection of sumTotal textContent
const sumTotalText = document.querySelector(".price-total");
const change = document.querySelector(".change");
const totalText = document.querySelector(".total-text p");
const addonListTotal = document.querySelector(".addons-list-total");
// addons checkox reseletion indivedual for some reason
const largerStorageChecked = document.querySelector(".larger-storage");
const customizeChecked = document.querySelector(".customize");
const serviceChecked = document.querySelector(".service");
const totalTextSpan = document.querySelector(".total-text-span");
const totalTextEnd = document.querySelector(".total-text-span-2");
const pricePlanTotal = document.querySelector(".price-plan-total");

//bar-box progress implementation

const barProgress = function (barProgress) {
  barBox.forEach((bar) => {
    bar.classList.remove("active");
  });
  barProgress.classList.add("active");
};

// view function
const stepsViews = function (preStep, nextStep) {
  preStep.classList.toggle("hidden");
  nextStep.classList.toggle("hidden");
};
//step-1 event listener implementation
formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!inputNum.value || !inputEmail.value || !inputEmail.value.includes("@")) {
    errorMessage.forEach((message) => {
      message.classList.remove("hidden");
      setTimeout(function () {
        message.classList.toggle("hidden");
      }, 1600);
    });
  } else {
    stepsViews(step1, step2);
    barProgress(box2);
  }
});

// step 2 event listener implementation

step2Forward.addEventListener("click", function () {
  stepsViews(step2, step3);
  barProgress(box3);
});
// for backward
step2Backward.addEventListener("click", function () {
  stepsViews(step1, step2);
  barProgress(box1);
});

//step 4 event listener implementation
step4Forward.addEventListener("click", function () {
  stepsViews(step4, step5);
  progressCont.style.opacity = "-1";
});

// for backward
step4Backward.addEventListener("click", function () {
  stepsViews(step3, step4);
  barProgress(box3);
});

let selectedPlan;
let addonsPrice;
let selectedAddons = [];

// for backward
step3Backward.addEventListener("click", function () {
  stepsViews(step2, step3);
  barProgress(box2);
  addonsPrice = Number(null);
  selectedAddons = [];
});
// change to edit event listener implementation
change.addEventListener("click", function () {
  step3.classList.toggle("hidden");
  step4.classList.toggle("hidden");
  stepsViews(step2, step3);
  barProgress(box2);
  progressCont.style.opacity = "1";
  addonsPrice = Number(null);
  selectedAddons = [];
  uncheckBox();
  addons.forEach((addon) =>
    addon.closest(".add-ons-wrapper").classList.remove("active-add-on")
  );
});

// switch plan toggle implementation

btnSwitch.addEventListener("click", function () {
  this.classList.toggle("ms-auto");
  yearPlan.forEach((btn) => {
    btn.classList.toggle("hidden");
    if (!btn.classList.contains("hidden")) {
      priceText1.textContent = "$90/yr";
      priceText2.textContent = "$120/yr";
      priceText3.textContent = "$150/yr";
      addondPrice1.textContent = "+$10/yr";
      addondPrice2.textContent = "+$20/yr";
      addondPrice3.textContent = "+$20/yr";
      totalTextSpan.textContent = "(Yearly)";
    } else {
      priceText1.textContent = "$9/mo";
      priceText2.textContent = "$12/mo";
      priceText3.textContent = "$15/mo";
      addondPrice1.textContent = "+$1/mo";
      addondPrice2.textContent = "+$2/mo";
      addondPrice3.textContent = "+$2/mo";
      totalTextSpan.textContent = "(Monthly)";
    }
  });
});

// selection of plans implementation

plans.forEach((plan) => {
  plan.addEventListener("click", function () {
    plans.forEach((el) => el.classList.remove("active-plan"));
    this.classList.add("active-plan");
    if (this.getAttribute("data-price-monthly") === "9") {
      totalTextEnd.textContent = "Arcades";
    } else if (this.getAttribute("data-price-monthly") === "12") {
      totalTextEnd.textContent = "Advanced";
    } else {
      totalTextEnd.textContent = "Pro";
    }
    yearPlan.forEach((btn) => {
      if (!btn.classList.contains("hidden")) {
        selectedPlan = this.getAttribute("data-price-yearly");
        // console.log(selectedPlan);
      } else {
        selectedPlan = this.getAttribute("data-price-monthly");
        // console.log(selectedPlan);
      }
    });
  });
});

// selection of addons implemetation

addons.forEach((addon) => {
  addon.addEventListener("change", function () {
    yearPlan.forEach((btn) => {
      if (!btn.classList.contains("hidden")) {
        addonsPrice = this.getAttribute("data-addons-yearly");
        // console.log(addonsPrice);
      } else {
        addonsPrice = this.getAttribute("data-addons-monthly");
        // console.log(addonsPrice);
      }
    });
    addon.closest(".add-ons-wrapper").classList.add("active-add-on");

    if (this.checked) {
      // console.log("whats up");

      selectedAddons.push(addonsPrice);
      // console.log(selectedAddons);
    } else {
      const index = selectedAddons.indexOf(addonsPrice);
      selectedAddons.splice(index, 1);
      // console.log(selectedAddons);
      addon.closest(".add-ons-wrapper").classList.remove("active-add-on");
    }
  });
});

// unchecking checkbox functtion
const uncheckBox = function () {
  addons.forEach((addon) => {
    addon.checked = false;
  });
};
// implementation of all the total plan nad addons

//step 3 event listener implementation
step3Forward.addEventListener("click", function () {
  stepsViews(step3, step4);
  barProgress(box4);
  const addonsTotal = selectedAddons.reduce((accumulator, currentValue) => {
    const parsedValue = parseInt(currentValue, 10);
    return Number(accumulator) + parsedValue;
  });
  const sumTotal = +selectedPlan + Number(addonsTotal);
  // console.log(+selectedPlan, addonsTotal);
  yearPlan.forEach((btn) => {
    if (!btn.classList.contains("hidden")) {
      sumTotalText.textContent = `$${sumTotal}/Yr`;
      totalText.textContent = `Total(Yearly)`;
      pricePlanTotal.textContent = `$${selectedPlan}/Yr`;
    } else {
      sumTotalText.textContent = `$${sumTotal}/Mo`;
      totalText.textContent = `Total(Monthly)`;
      pricePlanTotal.textContent = `$${selectedPlan}/Mo`;
    }
  });

  totalAddonsView();
});

// implementation of listing addons in the total page

const totalAddonsView = function () {
  let html;
  if (selectedAddons.length === 3) {
    html = `
    <div class="add-ons-choose">
                      <p>online service</p>
                      <p>${addondPrice1.textContent}</p>
                    </div>
                    <div class="add-ons-choose">
                      <p>Larger Storage</p>
                      <p>${addondPrice2.textContent}</p>
                    </div>
                    <div class="add-ons-choose">
                      <p>Constomizable profile</p>
                       <p>${addondPrice3.textContent}</p>
                    </div>
                  
    `;
  } else if (
    selectedAddons.length === 2 &&
    largerStorageChecked.checked &&
    customizeChecked.checked
  ) {
    html = `
    <div class="add-ons-choose">
        <p>Larger Storage</p>
        <p>${addondPrice2.textContent}</p>
      </div>
      <div class="add-ons-choose">
        <p>Constomizable profile</p>
          <p>${addondPrice3.textContent}</p>
      </div>
    `;
  } else if (
    selectedAddons.length === 2 &&
    serviceChecked.checked &&
    largerStorageChecked.checked
  ) {
    html = `
    <div class="add-ons-choose">
          <p>online service</p>
          <p>${addondPrice1.textContent}</p>
        </div>
    <div class="add-ons-choose">
        <p>Larger Storage</p>
        <p>${addondPrice2.textContent}</p>
      </div>
     
    `;
  } else if (
    selectedAddons.length === 2 &&
    serviceChecked.checked &&
    customizeChecked.checked
  ) {
    html = `
    <div class="add-ons-choose">
          <p>online service</p>
          <p>${addondPrice1.textContent}</p>
        </div>
      <div class="add-ons-choose">
        <p>Constomizable profile</p>
          <p>${addondPrice3.textContent}</p>
      </div>
    `;
  } else if (selectedAddons.length === 1 && serviceChecked.checked) {
    html = `
    <div class="add-ons-choose">
        <p>online service</p>
        <p>${addondPrice1.textContent}</p>
      </div>
    `;
  } else if (selectedAddons.length === 1 && largerStorageChecked.checked) {
    html = `
    <div class="add-ons-choose">
        <p>Larger Storage</p>
        <p>${addondPrice2.textContent}</p>
      </div>
    `;
  } else if (selectedAddons.length === 1 && customizeChecked.checked) {
    html = `
    <div class="add-ons-choose">
        <p>Constomizable profile</p>
          <p>${addondPrice3.textContent}</p>
      </div>
    `;
  }

  addonListTotal.innerHTML = "";

  addonListTotal.insertAdjacentHTML("afterbegin", html);
};
