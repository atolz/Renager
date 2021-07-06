const nav = document.querySelector(".property-nav");
const navNumbers = nav.querySelectorAll(".property-nav__number");
const navLeftController = nav.querySelector(".property-nav__icon--left");
const navRightController = nav.querySelector(".property-nav__icon--right");
const propertyNumbersContainer = nav.querySelector(
  ".property-nav__propertiesContainer"
);
const searchFilter = document.querySelector(".section-search");
console.log(propertyNumbersContainer);
const propertiesNumber = Array.from(propertyNumbersContainer.children);

const numHeight = propertiesNumber[0].clientHeight;

propertiesNumber.forEach((number, index) => {
  number.style.top = numHeight * index + "px";
});

const resetSearchFilter = () => {
  searchFilter.style.opacity = "1";
  searchFilter.style.visibility = "visible";
};

const showHideControllers = (
  target,
  targetController,
  controller,
  currentNumber,
  targetNumber
) => {
  if (target === targetController) {
    targetController.classList.add("invisible");
    controller.classList.remove("invisible");
    return;
  } else {
    targetController.classList.remove("invisible");
    controller.classList.remove("invisible");
    updateNavNumber(currentNumber, targetNumber);
  }
};

const updateNavNumber = (currentNumber, targetNumber) => {
  currentNumber.classList.remove("property-nav__number-active");
  targetNumber.classList.add("property-nav__number-active");
};

const updateNumberCarousel = (targetIndex, targetItems, container) => {
  const targetItem = targetItems[targetIndex];
  container.style.width = getComputedStyle(targetItem).width;
  container.style.transform = "translateY(-" + targetItem.style.top + ")";
};

nav.addEventListener("click", (e) => {
  const targetNumber = e.target.closest(".property-nav__number");
  if (!targetNumber) return;

  setTimeout(() => {
    contentProperties.classList.remove("display-none");
    loader.classList.add("display-none");
    resetSearchFilter();
  }, 2000);

  setTimeout(() => {
    window.scrollTo(0, 0);
    contentProperties.classList.add("display-none");
    loader.classList.remove("display-none");
  }, 500);

  //functionality for propertiesNumberContainer

  const numIndex = targetNumber.innerHTML - 1;
  updateNumberCarousel(numIndex, propertiesNumber, propertyNumbersContainer);

  const currentNumber = nav.querySelector(".property-nav__number-active");

  if (targetNumber === navNumbers[navNumbers.length - 1]) {
    navRightController.classList.add("invisible");
    navLeftController.classList.remove("invisible");
  } else if (targetNumber === navNumbers[0]) {
    navLeftController.classList.add("invisible");
    navRightController.classList.remove("invisible");
  } else {
    navLeftController.classList.remove("invisible");
    navRightController.classList.remove("invisible");
  }
  updateNavNumber(currentNumber, targetNumber);
});

navLeftController.addEventListener("click", (e) => {
  const currentNumber = nav.querySelector(".property-nav__number-active");
  const prevNumber = currentNumber.previousElementSibling;
  const controller = prevNumber.previousElementSibling;

  setTimeout(() => {
    contentProperties.classList.remove("display-none");
    loader.classList.add("display-none");
    resetSearchFilter();
  }, 2000);

  setTimeout(() => {
    window.scrollTo(0, 0);
    contentProperties.classList.add("display-none");
    loader.classList.remove("display-none");
  }, 500);

  const numIndex = prevNumber.innerHTML - 1;
  updateNumberCarousel(numIndex, propertiesNumber, propertyNumbersContainer);
  showHideControllers(
    controller,
    navLeftController,
    navRightController,
    currentNumber,
    prevNumber
  );

  console.log(prevNumber);
  updateNavNumber(currentNumber, prevNumber);
  console.log(prevNumber);
});

navRightController.addEventListener("click", (e) => {
  const currentNumber = nav.querySelector(".property-nav__number-active");
  const nextNumber = currentNumber.nextElementSibling;
  const rightController = nextNumber.nextElementSibling;
  const numIndex = nextNumber.innerHTML - 1;

  setTimeout(() => {
    contentProperties.classList.remove("display-none");
    loader.classList.add("display-none");
    resetSearchFilter();
  }, 2000);

  setTimeout(() => {
    window.scrollTo(0, 0);
    contentProperties.classList.add("display-none");
    loader.classList.remove("display-none");
  }, 500);

  updateNumberCarousel(numIndex, propertiesNumber, propertyNumbersContainer);
  showHideControllers(
    rightController,
    navRightController,
    navLeftController,
    currentNumber,
    nextNumber
  );

  console.log(nextNumber);
  updateNavNumber(currentNumber, nextNumber);
  console.log(nextNumber);
});
