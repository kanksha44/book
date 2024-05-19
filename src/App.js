import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./Components/BookList";
import BookCreate from "./Components/BookCreate";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    // console.log("need to add book with title", title);
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/books/${id}`);
      if (response.status === 200 || response.status === 204) {
        const updatedBooks = books.filter((book) => {
          return book.id !== id;
        });
        setBooks(updatedBooks);
      } else {
        console.error(
          `Failed to delete book with id ${id}, status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("error deleting book", error);
    }
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    const updateBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updateBooks);
  };

  return (
    <div className="app">
      <h1>Reading list</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
