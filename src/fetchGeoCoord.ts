import { fetchJSON } from "../include/fetchJSON.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}
export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const url = new URL("https://geocode.maps.co/search");
  url.searchParams.append("q", query);
  const link = url.toString();
  return new Promise<GeoCoord>((resolve, reject) => {
    fetchJSON(link).then((json: Array<{lat: string, lon: string}>) => {
      if (Array.isArray(json) && json.length > 0) {
        resolve({ lat: Number.parseFloat(json[0].lat), lon: Number.parseFloat(json[0].lon) });
      } else {
        reject(new Error("No results found for query."));
      }
    }, reject)
  });
}