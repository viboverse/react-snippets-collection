import { useEffect } from "react";

// how to get user's location
useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
}, []);

//how to use useEffect hook and cleanup functioon
useEffect(() => {
  console.log("✅ Effect runs");

  return () => {
    console.log("🧹 Cleanup runs");
  };
}, [someValue]);

/*

Initial mount:
  ✅ Effect runs

someValue changes:
  🧹 Cleanup runs
  ✅ Effect runs

Component unmounts:
  🧹 Cleanup runs

*/
