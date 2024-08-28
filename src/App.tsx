import {AutoComplete} from "./components/AutoComplete";
import useDebounce from "./hooks/useDebounce.tsx";
import useFetchCountries from "./apis/hooks/useFetchCountries.tsx";
import { useState } from "react";
// import useFetchAllCountries from "./apis/hooks/useFetchAllCountries.tsx";

function App() {
    const [value, ] = useState({id: 'South Georgia', name: 'South Georgia'});
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchQuery = useDebounce(searchValue, 0);
    const { data, loading, error } = useFetchCountries(debouncedSearchQuery);

    // This is the hook to get all data at once and filtering in front side based on query string.
    // const { data, loading, error } = useFetchAllCountries(debouncedSearchQuery);

    const onSearch = (value?: string) => {
        setSearchValue(value || '');
    }
  return (
    <>
     <AutoComplete value={value} loading={loading} onSearch={onSearch} error={error || ''} items={data} itemsCount={5} />
    </>
  )
}

export default App
