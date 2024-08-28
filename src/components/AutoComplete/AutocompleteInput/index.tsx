import React, { forwardRef } from 'react';


interface AutocompleteInputProps {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onClear?: () => void; // Optional clear handler
}

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
    ({ value, onChange, onFocus, onBlur, onKeyDown, onClear }, ref) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

        const handleClear = () => {
            if (onClear) {
                onClear();
            }
        };

        return (
            <div className="autocomplete-input-container">
                <input
                    ref={ref}
                    type="text"
                    className="autocomplete-input"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    aria-label="Search input"
                />
                    <button
                        type="button"
                        className="autocomplete-clear-button"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        &times;
                    </button>

            </div>
        );
    }
);

export default AutocompleteInput;
