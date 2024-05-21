import { useEffect, useContext } from "react";
import "./App.css";
import BookList from "./Components/BookList";
import BookCreate from "./Components/BookCreate";
import BookContext from "./Context/book";

function App() {
  const { fetchBooks } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <h1>Reading list</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
