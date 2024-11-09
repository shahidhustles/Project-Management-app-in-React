import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const noProject = undefined; // no project has yet been made therefor its undefined
  const startNewProject = null; // new project is being made
  const [projectState, setProjectState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });
  // const [currentProjectID, setCurrentProjectID] = useState('');
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: startNewProject,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: uuidv4(), // replace with uuid() later
      };
      return {
        ...prevState,
        selectedProjectID: noProject, // will add the project id when the showProject componenet is ready..
        projects: [...prevState.projects, newProject],
      };
    });
  }
  function handleCancelClick() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: noProject,
      };
    });
  }
  function handleShowProject(projectID) {
    // setCurrentProjectID(projectID)
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: projectID,
      };
    });
  }

  function handleDeleteSelectedProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        
        projects: prevState.projects.filter((project) => {
          project.id == prevState.selectedProjectID; // can also use project.id !== prevState.selectedProjectID
          return false; //both of these method will return an array in which the selected project is not present.
        }),
      };
    });
  }

  function handleAddtask(task) {
    setProjectState((prevState) => {
      const newTask = {
        name: task,
        projectId: prevState.selectedProjectID,
        id: uuidv4(),
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(taskID) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => {
          task.id == taskID; 
          return false; 
        }),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectID
  );
  let content = (
    <SelectedProject
      tasks={projectState.tasks}
      project={selectedProject}
      onDelete={handleDeleteSelectedProject}
      onAddTask={handleAddtask}
      onDelTask={handleDeleteTask}
    />
  );

  if (projectState.selectedProjectID === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancel={handleCancelClick}
      />
    );
  } else if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected onAddNewProject={handleStartAddProject} />;
  }
  // }else if(currentProjectID){
  //   content = <SelectedProject projects={projectState.projects} currentProjectID = {currentProjectID} />
  // }
  // console.log(projectState);
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onHandleShowProject={handleShowProject}
        onAddProject={handleStartAddProject}
        projects={projectState.projects}
        selectedProjectID={projectState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
