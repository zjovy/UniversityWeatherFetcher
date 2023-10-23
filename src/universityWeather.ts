import { fetchUniversities } from "./fetchUniversities.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  // TODO
  async function getWeather() {
    const unis = await fetchUniversities(universityQuery);
    const uniObjects: { name: string; temp: number }[] = [];
    for (const uni of unis) {
      const currentUni = { name: uni, temp: 0 };
      const avgTemp = await fetchGeoCoord(transformName ? transformName(uni) : uni)
        .then(coord => fetchCurrentTemperature(coord))
        .then(temps => temps.temperature_2m.reduce((acc, cur) => acc + cur, 0) / temps.temperature_2m.length);
      currentUni.temp = avgTemp;
      uniObjects.push(currentUni);
    }
    const universityWeather: AverageTemperatureResults = {
      totalAverage: uniObjects.reduce((acc, cur) => acc + cur.temp, 0) / uniObjects.length,
    };
    uniObjects.forEach(univ => (universityWeather[univ.name] = univ.temp));
    return universityWeather;
  }
  return getWeather();
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  //TODO
  return fetchUniversityWeather("University of Massachusetts", s => s.replaceAll("at", ""));
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  //TODO
  return fetchUniversityWeather("University of California");
}
