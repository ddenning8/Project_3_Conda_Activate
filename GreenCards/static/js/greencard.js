const url = "/predict/";

const GET = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: { "Content-Type": "application/json" },
  redirect: "follow",
  referrer: "no-referrer"
};

async function predict() {
  window.event.preventDefault();

  const result = document.getElementById("Result");
  result.textContent = "";
  
  let dropdown = document.getElementById("Regions");
  let selection = dropdown.selectedIndex;
  let region = dropdown[selection].value;

  const response = await fetch(`${url}${region}`, GET);
  let decision = await response.json();
  
  result.textContent = decision.result;
}
