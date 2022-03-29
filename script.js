const form = document.querySelector(".banner form");
const input = document.querySelector(".banner input");
const msg = document.querySelector(".banner .msg");
const list = document.querySelector(".section .cities");
const apiKey = "4f949f78d38c3de062060eb61de7bcd5";
let date = new Date();

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

 
  const listItems = list.querySelectorAll(".section .cities");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      
      if (inputVal.includes(",")) {
       
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
       
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...provide country code if needed.`;
      form.reset();
      input.focus();
      return;
    }
  }

 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    
    .then(data => {
        console.log(data);
      const { main, name, sys, weather, wind, humidity, coord } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
          <br>
          <small>${date.toLocaleDateString("en-US")}</small>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
        <div class="city-wind">${wind.speed}<sup>MPH</sup></div>
        <div class="city-humidity">${main.humidity}% humidity</div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);

    //   const lat = coord.lat;
    //   const lon = coord.lon; 
    //   const urlTwo = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
  
    //   fetch(urlTwo)
    //       .then(response => response.json())
    //       .then(data => {
              
    //           console.log(data)
    //       })
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";

   
    });
    
  msg.textContent = "";
  form.reset();
  input.focus();
});

