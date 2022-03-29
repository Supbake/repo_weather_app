const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const message = document.querySelector(".top-banner .msg");
const list = document.querySelector(".fetch-container .cities");
const apiKey = "4f949f78d38c3de062060eb61de7bcd5";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputValue = input.value;

    const listOfItems = list.querySelectorAll(".fetch-container .city");
    const listItemsArray = Array.from(listOfItems);

    if (listItemsArray.length > 0) {
        const filterArray = listItemsArray.filter(el => {
            let content = "";
            
            if (inputValue.includes(",")) {
            if (inputValue.split(",")[1].length > 2) {
                inputValue = inputValue.split(",")[0];
                content = el
                .querySelector("city-name span")
                .textContent.toLocaleLowerCase();
            } else {
                content = el.querySelector(".city-name").dataset.name.toLocaleLowerCase();
            }
        } else {
            content = el.querySelector(".city-name span").textContent.toLocaleLowerCase();
        }
        return content == inputValue.toLocaleLowerCase();
        });

        if (filterArray.length > 0) {
            msg.textContent = `You already know the weather for ${
              filterArray[0].querySelector(".city-name span").textContent
            } ...otherwise be more specific by providing the country code as well`;
            form.reset();
            input.focus();
            return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const {main, name, sys, weather} = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);

    })

    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();

});