"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteForm = () => {
  const id = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    heading: "",
    note: "",
    userId: id,
  });
  const [notes, setNotes] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [editableNote, setEditableNote] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditableNote({ ...editableNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(notes);

    try {
      const response = await axios.post(
        "http://localhost:4000/notes",
        formData
      );
      console.log(response.data);
      setNotes([...notes, response.data]);
      setFormData({ heading: "", note: "", userId: id });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log(editableNote);
    const editableNoteId = editableNote.id;

    try {
      const response = await axios.patch(
        `http://localhost:4000/notes/${editableNoteId}`,
        editableNote
      );
      console.log(response.data);
      setNotes((prevNotes) => {
        let updatedNotes = prevNotes.map((note) => {
          if (note.id !== editableNoteId) return note;
          else {
            return editableNote;
          }
        });
        console.log(updatedNotes);
        return updatedNotes;
      });
      setEditableNote(undefined);
      setIsEditing(!isEditing);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("id");
    console.log(id);

    try {
      const response = await axios.delete(`http://localhost:4000/notes/${id}`);
      console.log(response);
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note.id !== id);
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleEdit = (e) => {
    setIsEditing(true);
    const id = e.target.getAttribute("id");
    let note = notes.filter((note) => note.id === id);
    console.log(note[0]);
    setEditableNote(note[0]);
  };

  useEffect(() => {
    const fetch = async () => {
      console.log(id);
      const response = await axios.get(`http://localhost:4000/notes/${id}`);
      console.log(response.data, "at useEffect");
      setNotes([...notes, ...response.data]);
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {isEditing ? (
        <div className="w-4/5 mx-0 my-auto relative left-[10%]  ">
          <form
            onSubmit={handleEditSubmit}
            className=" w-5/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative top-10 border border-2 border-blue-500 "
          >
            <div className="mb-4 w-5/5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="heading"
              >
                Heading
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="heading"
                type="text"
                placeholder="Heading"
                name="heading"
                value={editableNote.heading}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="notes"
                placeholder="Note"
                name="note"
                value={editableNote.note}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleEditSubmit}
              >
                update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-4/5 mx-0 my-auto relative left-[10%]  ">
          <form
            onSubmit={handleSubmit}
            className=" w-5/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative top-10 border border-2 border-blue-500 "
          >
            <div className="mb-4 w-5/5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="heading"
              >
                Heading
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="heading"
                type="text"
                placeholder="Heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="notes"
                placeholder="Note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="w-full flex items-center flex-col relative top-10">
        {notes.map((note) => (
          <div
            id={note.id}
            key={note.id}
            className="w-3/5  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl text-center text-blue-900 relative -top-3">
              {note.heading}
            </h2>
            <p className="text-gray-700">{note.note}</p>
            <button
              id={note.id}
              className="bg-red-500 float-right hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              id={note.id}
              className="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteForm;
