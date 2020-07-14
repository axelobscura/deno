import * as log from "https://deno.land/std/log/mod.ts";

interface Launch {
  flightNumber: number;
  mission: string;
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  log.info("Downloading launch data....");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  if (!response.ok) {
    log.warning("Problem downlaoding launch data...");
    //throw new Error("Launch data failed...");
  }

  const launchData = await response.json();
  for (const launch of launchData) {
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
    };
    launches.set(flightData.flightNumber, flightData.mission);
    log.info(JSON.stringify(flightData));
  }
  //console.log(launchData);
}

await downloadLaunchData();
