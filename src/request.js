const NUM_PEOPLE = 14;

const getData = async () => {
  const dataArr = [];

  try {
    for (let i = 1; i <= NUM_PEOPLE; i++) {
      const personData = await getPeopleData(i);

      if (personData.species.length === 0) {
        const homeworldData = await getHomeworldData(personData.homeworld);

        const vehicleData = await getVehicleAndStarshipData(
          personData.vehicles
        );

        const starshipData = await getVehicleAndStarshipData(
          personData.starships
        );

        const person = {
          name: `${personData.name}`,
          height: `${personData.height}`,
          mass: `${personData.mass}`,
          homeplanet: {
            name: `${homeworldData.name}`,
            population: `${homeworldData.population}`
          },
          vehicles: vehicleData,
          starships: starshipData
        };
        dataArr.push(person);
      }
    }

    return JSON.stringify(dataArr);
  } catch (err) {
    console.log(err);
  }
};

const getPeopleData = async (index) => {
  try {
    const url = new URL(`${index}/`, "https://swapi.dev/api/people/");
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getHomeworldData = async (urlPar) => {
  try {
    const url = httpToHttps(urlPar);

    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getVehicleAndStarshipData = async (urlArr) => {
  try {
    const resArr = [];
    for (let i = 1; i <= urlArr.length; i++) {
      const url = httpToHttps(urlArr[i - 1]);

      const res = await fetch(url);
      const data = await res.json();

      const obj = {
        name: data.name,
        model: data.model
      };
      resArr.push(obj);
    }
    return resArr;
  } catch (err) {
    console.log(err);
  }
};

const httpToHttps = (url_p) => {
  const url_https = new URL(url_p);
  url_https.protocol = "https:";
  return url_https;
};

export default { getData };
