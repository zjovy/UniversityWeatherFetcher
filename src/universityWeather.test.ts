import assert from "assert";
import { fetchUniversityWeather, fetchUCalWeather, fetchUMassWeather } from "./universityWeather.js";

describe("fetchUCalWeather", () => {
  jest.setTimeout(10000);
  it("follows type specification", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });

  it("contains all the correct universities", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert("University of California, Los Angeles" in result);
      assert("University of California, Berkeley" in result);
      assert("University of California, Davis" in result);
      assert("University of California, Irvine" in result);
      assert("University of California, San Diego" in result);
      assert("University of California, San Francisco" in result);
      assert("University of California, Santa Barbara" in result);
      assert("University of California, Santa Cruz" in result);
      assert("University of California, Riverside" in result);
      assert("University of California, Merced" in result);
      assert("University of California, Office of the President" in result);
    });
  });
});

describe("fetchUMassWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });

  it("contains all UMass", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert("University of Massachusetts at Amherst" in result);
      assert("University of Massachusetts Boston" in result);
      assert("University of Massachusetts at Lowell" in result);
      assert("University of Massachusetts at Dartmouth" in result);
      assert(!("Massachusetts Institute of Technology" in result));
    });
  });
});

describe("fetchUniversityWeather", () => {
  it("throws error for invalid query", async () => {
    const promise = fetchUniversityWeather("MONKEY BAR WARRIOR");

    await expect(promise).rejects.toThrow("No results found for query.");
  });

  it("throws error for invalid query for fetchGeoCoord", async () => {
    const promise = fetchUniversityWeather("");

    await expect(promise).rejects.toThrow("No results found for query.");
  });
});
