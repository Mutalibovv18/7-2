import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./store/counter";
import { closeModal, openModal } from "./store/modal";
import { add, changeStatus, remove } from "./store/todo";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const modal = useSelector((state) => state.modal.isOpen);
  const todos = useSelector((state) => state.todo.value);
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

  return (
    <div className="max-w-5xl mx-auto p-10 bg-gray-50 shadow-lg rounded-xl relative">
      {/* Counter Section */}
      <section className="mb-16 text-center bg-white p-8 rounded-lg shadow">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Counter</h2>
        <div className="flex flex-col items-center gap-6">
          <span className="text-5xl font-bold text-gray-900">{counter}</span>
          <div className="flex gap-6">
            <button
              onClick={() => dispatch(increment())}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Increase
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Decrease
            </button>
          </div>
        </div>
      </section>

      {/* Reset Button - Bottom Right */}
      <button
        onClick={() => dispatch(reset())}
        className="fixed bottom-6 right-6 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-lg"
      >
        Reset Counter
      </button>

      {/* Modal Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Modal</h2>
        <button
          onClick={toggleModal}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Toggle Modal
        </button>
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-medium text-gray-800">This is a modal</h2>
              <button
                onClick={toggleModal}
                className="mt-4 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
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
            className="flex-1 px-5 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="ml-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
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
                    className={`px-4 py-2 rounded-md font-semibold ${
                      todo.completed
                        ? "bg-gray-500 text-white"
                        : "bg-green-600 text-white"
                    } hover:opacity-80 transition`}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => dispatch(remove(todo.id))}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
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
