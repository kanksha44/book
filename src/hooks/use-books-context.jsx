import { useContext } from "react";
import BookContext from "../Context/book";

function useBooksContext() {
  return useContext(BookContext);
}

export default useBooksContext;
