const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputElement = document.querySelector("form input");
  const adddress = inputElement.value;
  const url = `http://localhost:3000/weather?address=${adddress}`;
  fetch(url)
    .then((d) => d.json())
    .then(({ error, currentTemperature, location, weatherDescription }) => {
      const messageOne = document.querySelector("#message-one");
      const messageTwo = document.querySelector("#message-two");
      if (error) {
        messageOne.textContent = error;
      } else {
        const tempDegreeCel = Math.round((currentTemperature - 32) * (5 / 9));
        messageOne.textContent = location;
        messageTwo.textContent = `${weatherDescription} until evening. It is currently ${tempDegreeCel} degrees out.`;
      }
    });
});
