import * as React from "react";
import { Stack } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import { services } from '@tomtom-international/web-sdk-services';

export default function SearchMenu() {
  const { map } = useMap();

  const MOMTOM_API_KEY = "3511aLbdzJWwIOPGg5PxuE6AAARooszw";

  const search = (): void => {
    if(!map)
      return;

    const query = document.getElementById('search') as HTMLInputElement;
    console.log("Search ", query.value)

    if (query.value === '') return;
    services.fuzzySearch({
      key: MOMTOM_API_KEY,
      query: query.value,
    }).then((response) => {
      if (response && response.results && response.results.length > 0) {
        const latitude = response.results[0]?.position?.lat as number;
        const longitude = response.results[0]?.position?.lng as number;
        console.log("latitude ", latitude);
        console.log("longitude ", longitude);
        map.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          essential: true,
          speed: 0.8
          ,});
        // map.setCenter({lng: longitude, lat:latitude} )
        // map.zoomTo(14, {duration: 4000});

        // map.flyTo({
        //   zoom: 5,
        //   center: [
        
        //     172.33918606365154, -43.10024434830323
        // ],
        // essential: true // this animation is considered essential with respect to prefers-reduced-motion
        // })
      }
    });
  }

  return (
    <Stack spacing={2}>
      <input type="text" id="search" />
      <AxisButton onClickFunction={() => search()}>
        Search
      </AxisButton>   
    </Stack>
  );
}
