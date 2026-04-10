import { useContext, useEffect, useState } from "react";
import { BookContext } from "@/Context/AppContext";
import { toast } from "react-toastify";

// shadcn
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ManageBooks = () => {
  const { books, addBook, getAllBooks, searchBooks, updateBook, deleteBook, loading } = useContext(BookContext);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // ── Edit state ─────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "", author: "", isbn: "", totalCopies: "", availableCopies: "", category: "",
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") getAllBooks();
      else searchBooks(search);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const [form, setForm] = useState({
    title: "", author: "",  totalCopies: "", availableCopies: "", category: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // ── Open edit dialog ──────────────────────────────
  const handleEditClick = (book) => {
    setEditingBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
      category: book.category || "",
    });
    setEditOpen(true);
  };

  // ── Submit add ────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding book...");
    const payload = {
      ...form,
      totalCopies: Number(form.totalCopies),
      availableCopies: Number(form.availableCopies),
    };
    const res = await addBook(payload);
    if (res.success) {
      toast.update(toastId, { render: "Book added!", type: "success", isLoading: false, autoClose: 2000 });
      setOpen(false);
      setForm({ title: "", author: "", isbn: "", totalCopies: "", availableCopies: "", category: "" });
    } else {
      toast.update(toastId, { render: res.message, type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  // ── Submit update ─────────────────────────────────
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingBook) return;
    const toastId = toast.loading("Updating book...");
    const payload = {
      ...editForm,
      totalCopies: Number(editForm.totalCopies),
      availableCopies: Number(editForm.availableCopies),
    };
    const res = await updateBook(editingBook._id, payload);
    if (res.success) {
      toast.update(toastId, { render: "Book updated!", type: "success", isLoading: false, autoClose: 2000 });
      setEditOpen(false);
      setEditingBook(null);
    } else {
      toast.update(toastId, { render: res.message, type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  // ── Delete ────────────────────────────────────────
  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    const toastId = toast.loading("Deleting book...");
    const res = await deleteBook(bookId);
    if (res.success) {
      toast.update(toastId, { render: "Book deleted!", type: "success", isLoading: false, autoClose: 2000 });
    } else {
      toast.update(toastId, { render: res.message, type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      {/* HEADER */}
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-1.5 rounded outline-none focus:ring-1 focus:ring-gold w-40"
          placeholder="Search books..."
        />

        {/* ADD BOOK DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-gold text-navy text-xs font-medium px-3 py-1.5 rounded">
              + Add Book
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Add Book</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <Input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
              <Input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
              <Input type="number" name="totalCopies" placeholder="Total Copies" value={form.totalCopies} onChange={handleChange} required />
              <Input type="number" name="availableCopies" placeholder="Available Copies" value={form.availableCopies} onChange={handleChange} required />
              <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
              <DialogFooter><Button type="submit">Add Book</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* EDIT BOOK DIALOG */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Update Book</DialogTitle></DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <Input name="title" placeholder="Title" value={editForm.title} onChange={handleEditChange} required />
              <Input name="author" placeholder="Author" value={editForm.author} onChange={handleEditChange} required />
             
              <Input type="number" name="totalCopies" placeholder="Total Copies" value={editForm.totalCopies} onChange={handleEditChange} required />
              <Input type="number" name="availableCopies" placeholder="Available Copies" value={editForm.availableCopies} onChange={handleEditChange} required />
              <Input name="category" placeholder="Category" value={editForm.category} onChange={handleEditChange} />
              <DialogFooter><Button type="submit">Update Book</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {["Title", "Author", "Category", "Total", "Available", "Actions"].map((h) => (
              <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} className="text-center py-4 text-text-muted">Loading...</td></tr>
          ) : books.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-4 text-text-muted">No books found</td></tr>
          ) : (
            books.map((b) => (
              <tr key={b._id} className="hover:bg-navy-elevated/30">
                <td className="px-3.5 py-2.5 text-text-base">{b.title}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{b.author}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{b.category}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{b.totalCopies}</td>
                <td className={`px-3.5 py-2.5 font-medium ${b.availableCopies === 0 ? "text-red-400" : "text-green-400"}`}>
                  {b.availableCopies}
                </td>
                <td className="px-3.5 py-2.5 flex gap-2">
                  <button
                    onClick={() => handleEditClick(b)}
                    className="border border-navy-border text-text-muted text-[11px] px-2.5 py-1 rounded hover:text-text-base"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500/10 text-red-400 text-[11px] px-2.5 py-1 rounded hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
