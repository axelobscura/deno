import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
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
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload["customers"];
    });

    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers
    };
    launches.set(flightData.flightNumber, flightData.mission);
    log.info(JSON.stringify(flightData));
  }
  //console.log(launchData);
}

await downloadLaunchData();
