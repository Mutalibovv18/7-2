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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-semibold text-gray-700 mb-5">Counter</h2>
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() => dispatch(increment())}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
          >
            +
          </button>
          <span className="text-3xl font-semibold text-gray-800">{counter}</span>
          <button
            onClick={() => dispatch(decrement())}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
          >
            -
          </button>
        </div>
        <button
          onClick={() => dispatch(reset())}
          className="mt-4 px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Reset
        </button>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-4xl font-semibold text-gray-700 mb-5">Modal</h2>
        <button
          onClick={toggleModal}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
        >
          Toggle Modal
        </button>
        {modal && (
          <div className="mt-6 p-6 bg-yellow-100 border border-yellow-400 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-800">This is a modal</h2>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-4xl font-semibold text-gray-700 text-center mb-5">
          Todo List
        </h2>
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="px-5 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {todos.length > 0 &&
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center px-5 py-4 rounded-lg border shadow ${
                  todo.completed
                    ? "bg-green-200 text-gray-800 line-through"
                    : "bg-white"
                }`}
              >
                <span className="font-medium">{todo.text}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => dispatch(changeStatus(todo.id))}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      todo.completed
                        ? "bg-gray-500 text-white"
                        : "bg-green-600 text-white"
                    } hover:opacity-80 transition`}
                  >
                    {todo.completed ? "Undo" : "Done"}
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
