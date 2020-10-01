// Please get all people info from Star Wars API (https://swapi.dev)
// and show the info as in the example
// Dont forget to show a loading info for the users while preparing the data
import swapi from "./request";
const appDiv = document.querySelector("#app");
const dataText = {
  loadingText: "Loading...",
  nameText: "Name",
  heightText: "Height",
  massText: "Mass",
  homeWorldText: "Homeworld",
  populationText: "population",
  usedVehiclesText: "Used Vehicles",
  usedStarshipsText: "Used Starships"
};

const checkLocalStorage = () => {
  try {
    return localStorage.getItem("swapi_data");
  } catch (error) {
    return null;
  }
};

const createParagraph = (data, personDiv, text) => {
  const node_p = document.createElement("p");
  node_p.append(`${text}: ${data}`);
  personDiv.appendChild(node_p);
};

const createParagraphForHomeworld = (data, personDiv, text, text2) => {
  const node_p = document.createElement("p");
  node_p.append(`${text}: ${data.name}, ${text2}: ${data.population}`);
  personDiv.appendChild(node_p);
};

const createList = (dataArr, personDiv, text) => {
  //create paragraph for list and append
  const node_p = document.createElement("p");
  node_p.append(text);
  personDiv.appendChild(node_p);

  //create unordered list
  const node_ul = document.createElement("ul");

  dataArr.forEach((data) => {
    const node_li = document.createElement("li");
    node_li.append(`${data.name}, model: ${data.model}`);

    node_ul.appendChild(node_li);
  });

  personDiv.appendChild(node_ul);
};

const populateApp = (data) => {
  data.forEach((person) => {
    const personDiv = document.createElement("div");

    createParagraph(person.name, personDiv, dataText.nameText);
    createParagraph(person.height, personDiv, dataText.heightText);
    createParagraph(person.mass, personDiv, dataText.massText);
    createParagraphForHomeworld(
      person.homeplanet,
      personDiv,
      dataText.homeWorldText,
      dataText.populationText
    );

    createList(person.vehicles, personDiv, dataText.usedVehiclesText);
    createList(person.starships, personDiv, dataText.usedStarshipsText);

    appDiv.appendChild(personDiv);
    appDiv.innerHTML += "<hr />";
  });
};

(async () => {
  let data;
  const loadingNode = document.createElement("p");
  loadingNode.append(dataText.loadingText);
  appDiv.appendChild(loadingNode);
  data = checkLocalStorage();

  if (!data) {
    data = await swapi.getData();
    localStorage.setItem("swapi_data", data);
  }

  appDiv.removeChild(loadingNode);
  populateApp(JSON.parse(data));
})();
