import  {FC, memo, useMemo} from 'react';
import {TOptionUI} from '../../../apis/types/general.types.ts';

interface AutocompleteItemProps {
    item: TOptionUI;
    searchQuery: string;
    onClick: (option: TOptionUI) => void;
    isFocused?: boolean;
    isSelected?: boolean;
}

const AutocompleteItem: FC<AutocompleteItemProps> = memo(
    ({item, onClick, isSelected, isFocused, searchQuery}) => {
        const highlightText = (text: string) => {
            if (!searchQuery) return text;
            const parts = text.split(new RegExp(`(${searchQuery})`, 'i'));
            return parts.map((part, index) =>
                (!isSelected && part.toLowerCase() === searchQuery.toLowerCase()) ? (
                        <span key={index} className="highlight">
            {part}
          </span>
                    ) : (
                        part
                    )
            );
        };

        // Determine the appropriate class based on state
        const className = useMemo(() => {
            return [
                'autocomplete-dropdown-item',
                isFocused ? 'focused' : '',
                isSelected ? 'selected' : '',
            ].join(' ');
        }, [isSelected, isFocused, searchQuery]);


        return (
            <li onClick={() => onClick(item)} className={className}>
                {highlightText(item.name)}
            </li>
        );
    }
);

export default AutocompleteItem;
