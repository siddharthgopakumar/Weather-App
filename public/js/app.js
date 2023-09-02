const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputElement = document.querySelector("form input");
  const adddress = inputElement.value;
  const url = `/weather?address=${adddress}`;
  fetch(url)
    .then((d) => d.json())
    .then(({ error, currentWeather, location }) => {
      const messageOne = document.querySelector("#message-one");
      const messageTwo = document.querySelector("#message-two");
      if (error) {
        messageOne.textContent = error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = currentWeather;
      }
    });
});
