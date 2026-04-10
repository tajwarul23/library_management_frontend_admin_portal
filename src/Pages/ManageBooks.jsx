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
  // console.log("ManageBooks rendered");
  const { books, addBook, getAllBooks, searchBooks, loading } = useContext(BookContext);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getAllBooks();
  }, []);
  //search useWEffect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        console.log("search useEffect fired, search:", search);
      if (search.trim() === "") {
        getAllBooks(); // show all books if empty
      } else {
        searchBooks(search);
      }
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    totalCopies: "",
    availableCopies: "",
    category: "",
  });

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
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
      toast.update(toastId, {
        render: "Book added successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setOpen(false);

      // reset form
      setForm({
        title: "",
        author: "",
        isbn: "",
        totalCopies: "",
        availableCopies: "",
        category: "",
      });
    } else {
      toast.update(toastId, {
        render: res.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      {/* 🔥 HEADER */}
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => {console.log("inputChanged", e.target.value);
          
            setSearch(e.target.value)}}
          className="bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-1.5 rounded outline-none focus:ring-1 focus:ring-gold w-40"
          placeholder="Search books..."
        />

        {/* 🔥 ADD BOOK DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-gold text-navy text-xs font-medium px-3 py-1.5 rounded">
              + Add Book
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Book</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <Input
                name="author"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                required
              />
              <Input
                name="isbn"
                placeholder="ISBN"
                value={form.isbn}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="totalCopies"
                placeholder="Total Copies"
                value={form.totalCopies}
                onChange={handleChange}
                required
              />

              <Input
                type="number"
                name="availableCopies"
                placeholder="Available Copies"
                value={form.availableCopies}
                onChange={handleChange}
                required
              />
              <Input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <DialogFooter>
                <Button type="submit">Add Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 🔥 TABLE */}
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {[
              "Title",
              "Author",
              "Category",
              "Total",
              "Available",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b._id} className="hover:bg-navy-elevated/30">
              <td className="px-3.5 py-2.5 text-text-base">{b.title}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.author}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.category}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.totalCopies}</td>

              <td
                className={`px-3.5 py-2.5 font-medium ${
                  b.availableCopies === 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {b.availableCopies}
              </td>

              <td className="px-3.5 py-2.5 flex gap-2">
                <button className="border border-navy-border text-text-muted text-[11px] px-2.5 py-1 rounded hover:text-text-base">
                  Edit
                </button>

                <button className="bg-red-500/10 text-red-400 text-[11px] px-2.5 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
