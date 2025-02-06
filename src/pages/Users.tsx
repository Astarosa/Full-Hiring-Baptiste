import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import UsersGrid from "../components/UsersGrid";
import { GithubUser } from "../types/GithubUser";
import { GithubApiResponse } from "../types/GithubUser";
import useRateLimitedFetch from "../hooks/useRateLimitedFetch";
import useDebounce from "../hooks/useDebounce";
import RateLimitMessage from "../components/RateLimitMessage";

const Users = () => {
  const { fetchWithRateLimit, isRateLimited, resetTime, error, loading } = useRateLimitedFetch();
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [data, setData] = useState<GithubUser[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData([]);
      setHasSearched(false);
      return;
    }
    
    
    const handleSearch = async () => {
      try {
        const response = await fetchWithRateLimit<GithubApiResponse>(
          `/search/users?q=${encodeURIComponent(debouncedQuery)}`
        );
        setData(response.items);
        setHasSearched(true);
      } catch (error) {
        setData([]);
        throw error;
      }
    };

    handleSearch();
  }, [debouncedQuery, fetchWithRateLimit]);

  const isSearching = loading;
  const hasError = !!error;
  const hasNoResults = !loading && !error && hasSearched  && query && data.length === 0;
  const hasResults = !loading && !error && data.length > 0;
  const isRateLimitedMessage = isRateLimited && resetTime;

  return (
    <section data-testid="users">
      <SearchInput isRateLimited={isRateLimited} query={query} setQuery={setQuery} />
      {isRateLimitedMessage && <RateLimitMessage resetTime={resetTime} />}
      {isSearching && <div>Loading...</div>}
      {hasError && <div>{error}</div>}
      {hasNoResults && <div>No users found</div>}
      {hasResults && <UsersGrid users={data} />}
    </section>
  );
};

export default Users;
