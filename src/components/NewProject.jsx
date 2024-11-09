import Input from "./Input.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";

export default function NewProject({  onAddProject, onCancel }) {
const modal = useRef()

    const title = useRef();
    const description = useRef();
    const duedate = useRef()
    
    function handleValue(){
        const enteredTitle = title.current.value
        const enteredDescription = description.current.value;
        const entereDuedate = duedate.current.value;

        if (
          enteredTitle.trim() === "" ||
          enteredDescription.trim() === "" ||
          entereDuedate.trim() === ""
        ) {
            // modal
            modal.current.open()
            return;
        }
        const formData = {
          title: enteredTitle,
          description: enteredDescription,
          duedate: entereDuedate,
        };
        onAddProject(formData)
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
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
              onClick={handleValue}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input label="Title" ref={title} placeholder="React Project" />
          <Input
            label="Description"
            textarea
            placeholder="Make a project manager in React using States, Refs etc"
            ref={description}
          />
          <Input label="Due Date" type="date" ref={duedate} />
        </div>
      </div>
    </>
  );
}
