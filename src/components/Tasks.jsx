import NewTask from "./NewTask";

export default function Tasks({ tasks, onDelTask, onAddTask }) {
  console.log(tasks);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask placeholder="New Task" onAddTask={onAddTask} />
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => {
            return (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.name}</span>
                <button
                  onClick={() => onDelTask(task.id)}
                  className="text-stone-900 hover:text-red-500"
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {tasks.length == 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet
        </p>
      )}
    </section>
  );
}
