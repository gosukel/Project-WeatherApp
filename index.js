const API_KEY = "15a7fbf92396417e906214941241706";

// example query: http://api.weatherapi.com/v1/current.json?key=15a7fbf92396417e906214941241706&q=new york&aqi=no

async function sendRequest(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch {
    throw new Error("error");
  }
}

function parseObject(obj) {
  const newObj = {
    name: `${obj.location.name}, ${obj.location.region}`,
    statusText: obj.current.condition.text,
    statusIcon: obj.current.condition.icon,
    tempF: obj.current.temp_f,
    tempC: obj.current.temp_c,
  };
  return newObj;
}

function logResults() {
  sendRequest("27587").then((result) => {
    if (result.hasOwnProperty("error")) {
      console.log("error");
      return;
    }
    const newResult = parseObject(result);
    console.log(newResult);
  });
}

// logResults();

const input = document.querySelector("#search");
const btn = document.querySelector(".seach-btn");
const form = document.querySelector(".input-form");
const loc_name = document.querySelector(".location-text");
const loc_desc = document.querySelector(".location-description");
const loc_icon = document.querySelector(".location-icon");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value;
  console.log(query);
  sendRequest(query).then((result) => {
    console.log(result);
    if (result.hasOwnProperty("error")) {
      loc_name.innerText = "No Location Found";
      loc_desc.innerText = "Sorry :(";
      loc_icon.src = "";
      return;
    }
    const newStatus = parseObject(result);
    console.log(newStatus);
    loc_name.innerText = newStatus.name;
    loc_desc.innerText = newStatus.statusText;
    loc_icon.src = newStatus.statusIcon;
  });
});
