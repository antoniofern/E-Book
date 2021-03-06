import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', null);

  const saveBooks = (booksFromApi) => {
    setBooks(booksFromApi);
  };

  return <BooksContext.Provider value={{ books, saveBooks }}> {children}</BooksContext.Provider>;
};

export default BooksProvider