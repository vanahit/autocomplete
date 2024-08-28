import { useEffect, useState } from 'react';
import { TCountryDB } from '../types/country.types.ts';
import { TOptionUI } from '../types/general.types.ts';

const useFetchCountries = (query: string) => {
    const [countries, setCountries] = useState<TOptionUI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Local cache object to store fetched results
    const cache: Record<string, TOptionUI[]> = {};

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            setError(null);

            if (!query) {
                setCountries([]);
                setLoading(false);
                return;
            }

            // Check cache first
            if (cache[query]) {
                setCountries(cache[query]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
                if (response.ok) {
                    const data = await response.json();
                    const countryList: TOptionUI[] = data.map((item: TCountryDB) => ({
                        name: item.name.common,
                        id: item.name.common
                    }));
                    // Store the result in cache
                    cache[query] = countryList;
                    setCountries(countryList);
                } else {
                    setCountries([]);
                }
                setLoading(false);
            } catch (err) {
                setCountries([]);
                setError((err as Error).message || 'An error occurred');
                setLoading(false);
            }
        };

        fetchCountries();
    }, [query]); // Only query is needed in dependency array

    return { data: countries, loading, error };
};

export default useFetchCountries;
