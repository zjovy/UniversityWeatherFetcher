import { fetchJSON } from "../include/fetchJSON.js";
import { GeoCoord } from "./fetchGeoCoord.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  // TODO
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.append("latitude", coords.lat.toString());
  url.searchParams.append("longitude", coords.lon.toString());
  url.searchParams.append("hourly", "temperature_2m");
  url.searchParams.append("temperature_unit", "fahrenheit");
  const link = url.toString();
  const result = new Promise<TemperatureReading>((resolve, reject) => {
    fetchJSON(link)
      .then((json: { hourly: { time: string[]; temperature_2m: number[] } }) => {
        resolve({ time: json.hourly.time, temperature_2m: json.hourly.temperature_2m });
      })
      .catch(reject);
  });
  return result;
}
