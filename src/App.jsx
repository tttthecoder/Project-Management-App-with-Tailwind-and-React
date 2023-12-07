import ProjectsPanel from "./components/ProjectsPanel";
import AddingProject from "./components/AddingProject";
import { useState, useRef } from 'react'
import Project from "./components/Project";
import NoProjectSelected from './components/NoProjectSelected'

function App() {
  const [projectsState, setProjectsState] = useState(
    {
      selectedProjectId: undefined,
      projects: [],
      tasks: []
    })
  function HandleAddTask(task) {
    setProjectsState(prevState => {
      const newTask = {
        text: task,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      }
      return {

        ...prevState,
        tasks: [...projectsState.tasks, newTask]
      }
    })

  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => {
          return task.id !== id
        })
      }
    })
  }
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }
  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }
  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }
      return {

        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })

  }
  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })

  }
  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => { return project.id !== projectsState.selectedProjectId })
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  let content = <Project project={selectedProject} onDeleteProject={handleDeleteProject} onAddTask={HandleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />;
  if (projectsState.selectedProjectId === null) {
    content = <AddingProject onAdd={handleAddProject} handleCancel={handleCancelAddProject} />
  }
  else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  else {

  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsPanel onStartAddProject={handleStartAddProject} projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId} onSelectProject={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
