import React, { ChangeEvent } from "react";
import { SearchBar, SearchInput, SearchItem } from "./styles";

type Props = {
  placeholder: string;
  onFind: (e: string) => void;
};

const SearchTextFilter: React.FC<Props> = ({ placeholder, onFind }) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (onFind) onFind(e.target.value);
  }

  return (
    <SearchBar>
      <SearchInput onChange={handleChange} placeholder={placeholder} />
      <SearchItem />
    </SearchBar>
  );
};

export default SearchTextFilter;
