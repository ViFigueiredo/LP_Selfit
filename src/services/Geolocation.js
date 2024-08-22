import axios from 'axios';

async function getGeolocation() {
    const myip = await fetch('https://api.ipify.org?format=json')
    .then((x) => x.json())
    .then(({ ip }) => {
      return ip;
    });

  let geo = await axios({
    method: 'get',
    url: `https://api.ipgeolocation.io/ipgeo?apiKey=284fbe5eec3f42ee9c520800e8efab20&ip=${myip}`,
    responseType: 'application/json'
  });

  geo = JSON.parse(geo.data);
  return geo
}

// exportar função como módulo
export default getGeolocation;