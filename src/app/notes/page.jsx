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

  const handleChange = (e) => {
    console.log(e.target.value,e.target.name )
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(notes)

    try {
      const response = await axios.post(
        "http://localhost:4000/notes",
        formData
      );
      console.log(response.data);
      setNotes([...notes, response.data]);
      setFormData({ heading: "", note: "",userId:id });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("id")
    console.log(id)

    try {
      const response = await axios.delete(
        `http://localhost:4000/notes/${id}`
      );
      console.log(response);
      setNotes((prevNotes) => {
       return prevNotes.filter((note) => note.id !== id )
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

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
            <button id={note.id} className="bg-red-500 float-right hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2" onClick={
              handleDelete
            }>
              Delete
            </button>
            <button className="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteForm;


/* 

// Modal.tsx
import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product:Product) => void;
};

type Product = {
  name: string;
  price: number;
  quantity: number;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(productName, productPrice, productQuantity);
    onAddProduct((products: Product[]) => {
      console.log(products);
      return [
        ...products,
        {
          productName: productName,
          price: parseFloat(productPrice),
          quantity: parseInt(productQuantity),
        },
      ];
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="productQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Quantity
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
*/