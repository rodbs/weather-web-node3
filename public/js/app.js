console.log("Loading JS in the frontend");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageLocation = document.querySelector("#message-location");
const messageForecast = document.querySelector("#message-forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);

  const location = search.value;
  const url = "http://localhost:3000/weather?address=" + location;
  console.log(url);
  messageLocation.textContent = "Loading ...";
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageLocation.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        messageLocation.textContent = data.location;
        messageForecast.textContent = data.forecast;
      }
    });
  });
});
