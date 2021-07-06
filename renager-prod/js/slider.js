const sliders = document.querySelectorAll(".slider");
const filterPrice = document.querySelector(".filter__price");
const filterTextPrice = filterPrice.querySelector(".filter__text");
const filterMore = document.querySelector(".filter__pill--more");
const filterMoreText = filterMore.querySelector(".filter__text");


const formatValue = (value) => {
  const formattedValue = parseInt(value).toLocaleString("en-US", {
    style: "decimal",
    currency: "ngn",
    currencyDisplay: "symbol",
  });
  return formattedValue;
};

sliders.forEach((slider)=>{
  const sliderMin = slider.querySelector(".slider__input--min");
  const sliderMax = slider.querySelector(".slider__input--max");
  const priceMin = slider.previousElementSibling.querySelector(".slider__value--min");
  const priceMax = slider.previousElementSibling.querySelector(".slider__value--max");
  const track = slider.querySelector(".slider__track-container");
  // console.log(track);
  // console.log('max value');
  // console.log(sliderMin.max);
  
  // const sliderMinValue = formatValue(sliderMin.value);
  // const sliderMaxValue = formatValue(sliderMax.value);
  
  sliderMin.addEventListener("input", (e) => {
    const value = formatValue(sliderMin.value);
    sliderMin.style.zIndex = "100";
    sliderMax.style.zIndex = "10";
    sliderMin.classList.add('slider__input--active');
    sliderMax.classList.remove('slider__input--active');

    if(slider.querySelector("#slider-min-price")){
      console.log('padd test')
      filterPrice.classList.add("filter__pill--selected");
      filterTextPrice.classList.add("filter__text--active");
    }
    
    const trackPercent = (parseInt(sliderMin.value)/parseInt(sliderMax.max)) * 100;
    console.log(trackPercent);
    track.style.paddingLeft = trackPercent + "%";
  
    if (parseInt(sliderMin.value) >= parseInt(sliderMax.value)) {
      console.log("tyest 111");
      console.log(sliderMin.value);
      console.log(sliderMax.value);
      sliderMin.value = parseInt(parseInt(sliderMax.value));
      priceMin.innerHTML = formatValue(parseInt(sliderMax.value));
      return;
    }
    priceMin.innerHTML = value;
    //   console.log('min and max respectively');
    //   console.log(value);
    //   console.log(sliderMax.value);
  });
  
  sliderMax.addEventListener("input", (e) => {
    const value = formatValue(sliderMax.value);
    sliderMax.style.zIndex = "100";
    sliderMin.style.zIndex = "10";
    sliderMax.classList.add('slider__input--active');
    sliderMin.classList.remove('slider__input--active');
  
    if(slider.querySelector("#slider-min-price")){
      console.log('padd test')
      filterPrice.classList.add("filter__pill--selected");
      filterTextPrice.classList.add("filter__text--active");
    }
    
    const trackPercent = 100 - ((parseInt(sliderMax.value)/parseInt(sliderMax.max)) * 100);
    console.log(trackPercent);
    track.style.paddingRight = trackPercent + "%";
  
    if (parseInt(sliderMax.value) <= parseInt(sliderMin.value)) {
      console.log("tyest 222");
      sliderMax.value = parseInt(parseInt(sliderMin.value));
      priceMax.innerHTML = formatValue(parseInt(sliderMin.value));
      track.style.paddingRight = trackPercent + "%";
      return;
    }
    priceMax.innerHTML = value;
  });
  
})

