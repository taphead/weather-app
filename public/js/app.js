console.log("Loaded");

const weatherForm = document.querySelector("form");
const paragraphError = document.querySelector("#p1");
const paragraphData = document.querySelector("#p2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = document.querySelector("input").value;
  const url = `http://localhost:3000/weather?address=${searchQuery}`;
  paragraphError.textContent = "Loading...";
  paragraphData.textContent = "";
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        paragraphData.textContent = "";
        paragraphError.textContent = `${data.error}`;
      } else {
        paragraphError.textContent = "";
        paragraphData.textContent = `${data.location}.
          It is currently 
          ${data.temperature}
           degrees out. It feels like
          ${data.feelsLike} 
           degrees out.`;
      }
    });
  });
});
