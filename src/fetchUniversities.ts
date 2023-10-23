import { fetchJSON } from "../include/fetchJSON.js";

interface University
{
  name:string;
}

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  return new Promise((resolve, reject) => {
    fetchJSON<University[]>("http://universities.hipolabs.com/search?name=" + query)
    .then(json => 
        Array.isArray(json) && json.length > 0 
      ? resolve(json.map(r=> r.name)) // Resolve with name of each university in the query
      : reject(new Error("No results found for query.")) // Reject if nothing is present
    ).catch(reject);
  })
}
