import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Autocomplete.css';
import AutocompleteInput from './AutocompleteInput';
import AutocompleteItem from './AutocompleteItem';
import AutocompleteLoading from './AutocompleteLoading';
import AutocompleteEmptyState from './AutocompleteEmptyState';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';
import AutocompleteErrorState from './AutocompleteErrorState';
import { TOptionUI } from '../../apis/types/general.types.ts';

interface IAutoCompleteProps {
    itemsCount: number;
    items: TOptionUI[];
    onChange?: (value?: TOptionUI) => void;
    onSearch?: (value: string) => void;
    value?: TOptionUI;
    loading?: boolean;
    error?: string;
    onClear?: () => void;
}

export const AutoComplete = ({ items, onChange, value, error, loading, onClear, onSearch }: IAutoCompleteProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState<TOptionUI | undefined>(value);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);



    useEffect(() => {
            setSelected(value);
            setSearchQuery(value?.id || '');
            onSearch?.(value?.name || '')
    }, [value?.id]);

    useEffect(() => {
        if (focusedIndex >= 0 && dropdownRef.current) {
            const item = dropdownRef.current.children[focusedIndex] as HTMLLIElement;
            item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [focusedIndex]);



    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (!searchQuery) return;

        const keyActions: Record<string, () => void> = {
            ArrowDown: () =>
                setFocusedIndex((prevIndex) =>
                    prevIndex < items.length - 1 ? prevIndex + 1 : 0
                ),
            ArrowUp: () =>
                setFocusedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : items.length - 1
                ),
            Enter: () => {
                if (focusedIndex >= 0 && items[focusedIndex]) {
                    handleItemClick(items[focusedIndex]);
                }
            },
        };

        const action = keyActions[event.key];
        if (action) {
            event.preventDefault();
            action();
        }
    }, [searchQuery, items, focusedIndex]);

    const handleReset = useCallback(() => {
        setSearchQuery('');
        setFocusedIndex(-1);
        setIsFocused(false);
        inputRef.current?.blur();
    }, []);

    const handleItemClick = useCallback((item?: TOptionUI) => {
        setSelected(item);
        onChange?.(item);
        handleReset();
    }, [onChange, handleReset]);

    const handleInputChange = useCallback((value: string) => {
        if (value !== searchQuery) {
            setSearchQuery(value);
            setFocusedIndex(-1);
            onSearch?.(value);
        }
    }, [searchQuery, onSearch]);

    const handleInputFocus = useCallback(() => {
        setFocusedIndex(-1);
        setIsFocused(true);
        if (selected?.name) {
            onSearch?.(selected.name);
            setSearchQuery(selected?.name);
        }
    }, [selected, onSearch]);

    useOutsideClick(containerRef, handleReset);

    const handleClear = useCallback(() => {
        if (isFocused) {
            inputRef.current?.focus();
            setSearchQuery('');
            setFocusedIndex(-1);
        } else {
            handleItemClick(undefined);
        }
        onClear?.();
    }, [isFocused, onClear]);

    return (
        <div className="autocomplete-wrapper" ref={containerRef}>
            <AutocompleteInput
                ref={inputRef}
                value={isFocused ? searchQuery : selected?.name || ''}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                onClear={handleClear}
            />
            {searchQuery &&  isFocused && (
                <ul
                    ref={dropdownRef}
                    className={`autocomplete-dropdown ${searchQuery ? 'show' : ''}`}
                >
                    {loading && <AutocompleteLoading />}
                    {!loading && error && <AutocompleteErrorState error={error} />}
                    {!loading && !error && (items.length === 0 ? (
                        <AutocompleteEmptyState />
                    ) : (
                        items.map((option, index) => (
                            <AutocompleteItem
                                isSelected={option.id === selected?.id}
                                onClick={handleItemClick}
                                key={option.id}
                                item={option}
                                searchQuery={searchQuery}
                                isFocused={index === focusedIndex}
                            />
                        ))
                    ))}
                </ul>
            )}
        </div>
    );
};
