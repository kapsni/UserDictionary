// src/api.js
import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
};

export const fetchCountryList = async () => {
  try {
    const response = await axios.get("https://worldtimeapi.org/api/timezone");
    const timeZones = response.data;
    console.log(timeZones);

    // Extract countries from time zones
    const countries = timeZones.map((timezone) => {
      const splitTimeZone = timezone.split(",");
      return splitTimeZone.length > 1 ? splitTimeZone[1] : splitTimeZone[0];
    });

    // Remove duplicates
    const uniqueCountries = [...new Set(countries)];

    return uniqueCountries;
  } catch (error) {
    console.error("Error fetching country list:", error);
    return [];
  }
};

export const fetchCurrentTime = async (timezone) => {
  try {
    const response = await axios.get(
      `https://worldtimeapi.org/api/timezone/${timezone}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching current time:", error);
    return null;
  }
};
