
import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <header className={styles.header}>
      <p>SearchBar Placeholder</p>
    </header>
  );
};

export default SearchBar;