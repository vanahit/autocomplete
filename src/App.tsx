import {AutoComplete} from "./components/AutoComplete";
import useDebounce from "./hooks/useDebounce.tsx";
import useFetchCountries from "./apis/hooks/useFetchCountries.tsx";
import { useState } from "react";

function App() {
    const [value, ] = useState({id: 'South Georgia', name: 'South Georgia'});
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchQuery = useDebounce(searchValue, 0);
    const { data, loading, error } = useFetchCountries(debouncedSearchQuery);
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
