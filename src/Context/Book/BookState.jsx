import { useEffect, useState } from "react";
import axios from "axios";
import { BookContext } from "../AppContext";

const BASE = "http://localhost:5000/api";

const authHeaders = () => ({
  headers: {
    Auth: localStorage.getItem("token"),
  },
  withCredentials: true,
});

const BookState = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Add Book ──────────────────────────────────────────
  const addBook = async (bookData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/admin/addBook`,
        bookData,
        authHeaders(),
      );
      setBooks((prev) => [...prev, data.book]);
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Update Book ───────────────────────────────────────
  const updateBook = async (bookId, updates) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE}/admin/book/update/${bookId}`,
        updates,
        authHeaders(),
      );
      setBooks((prev) => prev.map((b) => (b._id === bookId ? data.book : b)));
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Delete Book ───────────────────────────────────────
  const deleteBook = async (bookId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${BASE}/admin/book/delete/${bookId}`,
        authHeaders(),
      );
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Get Book Details ──────────────────────────────────
  const getBookDetails = async (bookId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE}/admin/book/${bookId}`,
        authHeaders(),
      );
      setBookDetails(data.book);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Search Books ──────────────────────────────────────
  const searchBooks = async (query) => {
    try {
      setLoading(true);
      console.log("searching for:", query);
      const { data } = await axios.get(
        `${BASE}/admin/books/search?query=${query}`,
        authHeaders(),
      );
      console.log("search response:", data);
      setBooks(data.data);
      return { success: true };
    } catch (err) {
        console.log("search error:", err.response?.status, err.response?.data);
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Issue Book ────────────────────────────────────────
  const issueBook = async (bookId, studentId, reservationId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/admin/book/issue`,
        { bookId, studentId, reservationId },
        authHeaders(),
      );
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Return Book ───────────────────────────────────────
  const returnBook = async (issueId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE}/admin/book/return`,
        { issueId },
        authHeaders(),
      );
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Get All Issued Books ──────────────────────────────
  const getAllIssuedBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE}/admin/book/issued/all`,
        authHeaders(),
      );
      setIssuedBooks(data.issuedBooks);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  //----Get all book----
  const getAllBooks = async () => {
    try {
      
      const token = localStorage.getItem("token");
      console.log("getAllBooks fired, token:", token);
      const { data } = await axios.get(`${BASE}/admin/book/all`, authHeaders());

      console.log("BOOKS API RESPONSE:", data);

      setBooks(data.books);

      return { success: true };
    } catch (err) {
      console.log("GET ALL BOOKS ERROR:", err.response?.data || err.message);

      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        bookDetails,
        issuedBooks,
        loading,
        addBook,
        updateBook,
        deleteBook,
        getBookDetails,
        searchBooks,
        issueBook,
        returnBook,
        getAllIssuedBooks,
        getAllBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookState;
