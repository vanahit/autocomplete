# AutoComplete Component

## Overview

The `AutoComplete` component is a flexible and customizable autocomplete input field built with React. It includes
features such as searching, filtering, and selection of items, delete of selected item or search value, and supports loading and error states.

## Features

- **Search & Filter:** Filter items based on user input with case-insensitive search.
- **Selection:** Select an item from the dropdown list.
- **Clear:** Clear either search value or selected value based on focus state.
- **Loading State:** Show a loading indicator while fetching data.
- **Error Handling:** Display an error message if something goes wrong.
- **Customizable:** Pass items and handlers for dynamic data handling.

## Project Structure

The project directory is organized as follows:

**src/**

- **hooks/**
    - `useDebounce.ts`: A custom hook for debouncing user input.
    - `useOutsideClick.tsx`: A custom hook for detecting clicks outside a component.
  
- **apis/**-
    - **hooks/**
        - `useFetchCountries.tsx`: Api hook for fetching data based on query string
        - `useFetchAllCountries.tsx`: Api hook for fetching all countries from backend and filtering data in frontend
          side based on query.
    - **types/**
        - `country.types.ts`: TypeScript types for API responses.
        - `general.types.ts`: General types related to types for API responses.

- **components/**
    - **Autocomplete/**
        - `index.tsx`: The main autocomplete component.
        - `Autocomplete.css`: The CSS file for styling the autocomplete component.
        - `AutocompleteInput/index.tsx`: The input field component for the autocomplete.
        - `AutocompleteItem/index.tsx`: The item component for the autocomplete dropdown.
        - `AutocompleteLoading/index.tsx`: The loading indicator component.
        - `AutocompleteEmptyState/index.tsx`: The component shown when there are no items.
        - `AutocompleteErrorState/index.tsx`: The component for displaying error messages.
- `App.tsx`: The main application component.
- `index.tsx`: The entry point for the React application.
- `index.css`: Global CSS styles for the application.

**.gitignore**: Git ignore file for excluding files from version control.

**package.json**: The package file containing project dependencies and scripts.

**README.md**: This README file.

**tsconfig.json**: TypeScript configuration file.

## Installation

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm start
    ```

   The application will run on `http://localhost:3000`.

## Usage

To use the `AutoComplete` component, import it into your React component and provide the necessary props:

```tsx
import AutoComplete from './components/Autocomplete';

const MyComponent = () => {
  const handleItemChange = (value: TOptionUI) => {
    // Handle the selected item
  };

  const handleSearch = (query: string) => {
    // Handle search input
  };
  const handleClear= () => {
    // Handle clear input
  };
  return (
    <AutoComplete
      items={/* Array of items */}
      onChange={handleItemChange}
      onClear={handleClear}
      onSearch={handleSearch}
      loading={/* Boolean indicating loading state */}
      error={/* Error message, if any */}
    />
  );
};
