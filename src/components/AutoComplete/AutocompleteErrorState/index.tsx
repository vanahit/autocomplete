
const AutocompleteErrorState = ({error}: {error?: string}) => {
    if (!error) return null;
    return <li className="autocomplete-error">{error}</li>;
};

export default AutocompleteErrorState;
