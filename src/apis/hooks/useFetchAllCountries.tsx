import { useEffect, useState, useRef } from 'react';
import { TCountryDB } from '../types/country.types.ts';
import { TOptionUI } from '../types/general.types.ts';

const useFetchAllCountries = (query: string) => {
    const [allCountries, setAllCountries] = useState<TOptionUI[]>([]);
    const [displayedCountries, setDisplayedCountries] = useState<TOptionUI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cacheRef = useRef<Map<string, TOptionUI[]>>(new Map()); // Cache stored in a ref

    useEffect(() => {
        const fetchAllCountries = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (response.ok) {
                    const data = await response.json();
                    const countryList: TOptionUI[] = data.map((item: TCountryDB) => ({
                        name: item.name.common,
                        id: item.name.common
                    }));
                    setAllCountries(countryList);
                } else {
                    setError('Failed to fetch countries');
                }
                setLoading(false);
            } catch (err) {
                setError((err as Error).message || 'An error occurred');
                setLoading(false);
            }
        };

        fetchAllCountries();
    }, []); // Fetch once when the component mounts

    useEffect(() => {
        const cache = cacheRef.current;

        if (query) {
            // Check if the filtered results are in the cache
            const cachedResults = cache.get(query);
            if (cachedResults?.length) {
                setDisplayedCountries(cachedResults);
            } else {
                // Filter results and update the cache
                const filteredCountries = allCountries.filter((country) =>
                    country.name.toLowerCase().includes(query.toLowerCase())
                );
                setDisplayedCountries(filteredCountries);
                cache.set(query, filteredCountries); // Update cache without triggering state change
            }
        } else {
            setDisplayedCountries([]);
        }
    }, [query, allCountries]); // Filter countries when query or allCountries change

    return { data: displayedCountries, loading, error };
};

export default useFetchAllCountries;
