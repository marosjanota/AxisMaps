import React from "react";
import AxisButton from "../components/AxisButton";
import mapServices from '@tomtom-international/web-sdk-services';

interface SearchProps {
  setCountryPosition: (latitude: number, longitude: number) => void;
  apikey: string;
}

const SearchPlace: React.FC<SearchProps> = ({ setCountryPosition, apikey }) => {
  const search = (): void => {
    const query = document.getElementById('search') as HTMLInputElement;
    if (query.value === '') return;
    mapServices.services.fuzzySearch({
      key: apikey,
      query: query.value,
    }).then((response) => {
      if (response && response.results && response.results.length > 0) {
        let latitude = response.results[0]?.position?.lat as number;
        let longitude = response.results[0]?.position?.lng as number;
        setCountryPosition(latitude, longitude);
      }
    });
  }

  return (
    <div>
      <AxisButton onClickFunction={() => search()}>Search</AxisButton>
      <input type="text" id="search" />
    </div>
  );
};

export default SearchPlace;
