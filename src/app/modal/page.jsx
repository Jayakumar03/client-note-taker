"use client"
import React, { useState } from "react";

const Modal = ({ }) => {
 const [productName, setProductName] = useState("");
 const [productPrice, setProductPrice] = useState("");
 const [productQuantity, setProductQuantity] = useState("");

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productName, productPrice, productQuantity);
    onAddProduct((products) => {
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