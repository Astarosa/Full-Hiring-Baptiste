import { Dispatch } from "react";

interface SearchInputProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  isRateLimited: boolean;
}

const SearchInput = ({query, setQuery, isRateLimited} : SearchInputProps) => {
  return (
    <input
      name="searchInput"
      type="text"
      className="search-input"
      disabled={isRateLimited}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search input"
    />
  );
};

export default SearchInput;