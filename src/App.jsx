import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, incrementQuantity, decrementQuantity } from "./store/cartSlice";
import { decrement, increment, reset } from "./store/counter";
import { closeModal, openModal } from "./store/modal";
import { add, changeStatus, remove } from "./store/todo";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const modal = useSelector((state) => state.modal.isOpen);
  const todos = useSelector((state) => state.todo.value);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const toggleModal = () => dispatch(modal ? closeModal() : openModal());

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(
        add({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-gray-50 shadow-lg rounded-xl relative">
      {/* Counter Section */}
      <section className="mb-16 text-center bg-white p-8 rounded-lg shadow">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Counter</h2>
        <div className="flex flex-col items-center gap-6">
          <span className="text-5xl font-bold text-gray-900">{counter}</span>
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => dispatch(increment())}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Increase
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Decrease
            </button>
          </div>
        </div>
      </section>

      {/* Shopping Cart Section */}
      <section className="mb-16 text-center bg-white p-8 rounded-lg shadow">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() =>
              handleAddToCart({ id: Date.now(), name: "Product 1", quantity: 1 })
            }
            className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
          >
            Add Product 1
          </button>
          <button
            onClick={() =>
              handleAddToCart({ id: Date.now() + 1, name: "Product 2", quantity: 1 })
            }
            className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
          >
            Add Product 2
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {cart.length > 0 &&
            cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-5 rounded-lg border shadow-md bg-white"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementQuantity(item.id)}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>

      {/* Reset Button - Bottom Right */}
      <button
        onClick={() => dispatch(reset())}
        className="fixed bottom-6 right-6 px-8 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg"
      >
        Reset Counter
      </button>

      {/* Modal Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Modal</h2>
        <button
          onClick={toggleModal}
          className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
        >
          Toggle Modal
        </button>
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-medium text-gray-800">This is a modal</h2>
              <button
                onClick={toggleModal}
                className="mt-4 w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Todo List Section */}
      <section>
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">
          Todo List
        </h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-5 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="ml-4 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-4">
          {todos.length > 0 &&
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-5 rounded-lg border shadow-md ${
                  todo.completed ? "bg-green-200 line-through" : "bg-white"
                }`}
              >
                <span className="font-medium">{todo.text}</span>
                <div className="flex gap-4">
                  <button
                    onClick={() => dispatch(changeStatus(todo.id))}
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      todo.completed
                        ? "bg-gray-500 text-white"
                        : "bg-green-600 text-white"
                    } hover:opacity-80 transition`}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => dispatch(remove(todo.id))}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
