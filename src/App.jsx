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
    <div className="container mx-auto p-4">
      <section className="text-center mb-10">
        <h2 className="text-3xl mb-4">Counter</h2>
        <div className="flex justify-center items-center gap-4 mb-2">
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            +
          </button>
          <span className="text-xl font-bold">{counter}</span>
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            -
          </button>
        </div>
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </section>

      <section className="text-center mb-10">
        <h2 className="text-3xl mb-4">Modal</h2>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Toggle Modal
        </button>
        {modal && (
          <div className="mt-4 border p-4 bg-yellow-200">
            <h2 className="text-xl">Modal ishladi</h2>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl mb-4 text-center">Todo List</h2>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Yangi vazifa qo'shing"
            className="border p-2 rounded w-full max-w-md"
          />
          <button
            onClick={handleAddTodo}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Qo'shish
          </button>
        </div>
        <ul className="space-y-2">
          {todos.length > 0 &&
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center border p-2 rounded ${
                  todo.completed ? "bg-green-100 line-through" : "bg-white"
                }`}
              >
                <span>{todo.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(changeStatus(todo.id))}
                    className={`px-4 py-1 rounded ${
                      todo.completed
                        ? "bg-gray-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {todo.completed ? "Bekor qilish" : "Bajarildi"}
                  </button>
                  <button
                    onClick={() => dispatch(remove(todo.id))}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    O'chirish
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default App;
