import assert from "assert";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

describe("fetchCurrentTemperature", () => {
  it("follows type specification", () => {
    const promise = fetchCurrentTemperature({ lat: -71.05, lon: 90 });

    return promise.then(result => {
      assert(typeof result === "object"); // Assert the result is an object
      // console.log(typeof result.time);
      assert(Array.isArray(result.time)); // Assert the result has an array time field
      assert(result.time.every(x => typeof x === "string")); // Assert each element in that time is a sting
      assert(Array.isArray(result.temperature_2m)); // Assert the result as an array temperature_2m field
      assert(result.temperature_2m.every(x => typeof x === "number")); // Assert each element in that time is a number
    });
  });

  it("throws error for invalid query", async () => {
    await expect(fetchCurrentTemperature({ lat: 100, lon: 0 })).rejects.toEqual(
      "Received status code 400: Bad Request"
    );
  });

  it("throws error for invalid query with infinity", async () => {
    await expect(fetchCurrentTemperature({ lat: Infinity, lon: 0 })).rejects.toEqual(
      "Received status code 400: Bad Request"
    );
  });
});
