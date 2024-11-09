import { useRef, useState } from "react";
import Modal from "./Modal";
export default function NewTask({ onAddTask, ...props }) {
  // made this using Input comp because i dont want label in this input field
  const [newTask, setNewTask] = useState("");
  const modal = useRef();
  function handleNewTask(event) {
    setNewTask(event.target.value);
  }
  function handleClick() {
    if (newTask.trim() === "") {
        modal.current.open()
    //   alert("Please enter a valid task.");
      return; // this means it will return nohing and break out of the loop
    }
    onAddTask(newTask);
    setNewTask("");
  }
  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          OOps... looks like you forgot to enter a value
        </p>
        <p className="text-stone-600 mb-4">
          Please Make sure you provide a valid value for every field.
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          {...props}
          ref={modal}
          onChange={handleNewTask}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-900"
        >
          Add Task
        </button>
      </div>
    </>
  );
}
