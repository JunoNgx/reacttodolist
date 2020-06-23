import React from 'react';
import './style.scss';
import Owner from './components/Owner.js'
import Task from './components/Task.js'
import AddTask from './components/AddTask.js'

class App extends React.Component {
    defaultOwner = "Emky"
    defaultTasks = [
        { name: "Learn Elm", isCompleted: false },
        { name: "Practice StarCraft", isCompleted: false },
        { name: "Dissect TIC-80", isCompleted: false },
        { name: "Build Siege Tank", isCompleted: true },
    ]
    constructor(props) {
        super(props)

        const owner = (localStorage.getItem('owner')) || Array.from(this.defaultOwner)
        const tasks = JSON.parse((localStorage.getItem('tasks'))) || this.defaultTasks

        this.state = {
            owner: owner,
            tasks: tasks
        }

        this.updateOwner = this.updateOwner.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.addTask = this.addTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.resetToDefault = this.resetToDefault.bind(this)
    }

    componentDidUpdate() {
        localStorage.setItem('owner', this.state.owner)
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    updateOwner(newOwner) {
        this.setState(()=>({
            owner: newOwner
        }))
    }

    updateTask(index, completion) {
        let tasks, task
        tasks = this.state.tasks

        tasks[index].isCompleted = completion
        if (completion === true) {
            task = tasks[index]
            tasks.splice(index, 1)
            tasks.push(task)
        }

        this.setState({
            tasks: tasks
        })
    }

    addTask(taskName) {
        let tasks = this.state.tasks
        tasks.unshift({name: taskName, isCompleted: false})

        this.setState({
            tasks: tasks
        })
    }
    removeTask(index) {
        let tasks = this.state.tasks
        tasks.splice(index, 1)

        this.setState({
            tasks: tasks
        })
    }
    resetToDefault() {
        this.setState({
            owner: this.defaultOwner,
            tasks: this.defaultTasks.map(task=>Object.assign({}, task))
        })
    }
    render() {
        return (
            <div className="app">
                <h1 className="title">Another React TODO</h1>
                <span className="author">by Juno Nguyen</span>
                <Owner owner={this.state.owner} updateOwner={this.updateOwner}/>
                <AddTask addTask={this.addTask}/>
                <div className="task-list">
                    {this.state.tasks.map((task, index) => 
                            <Task key={index} name={task.name} index={index} isCompleted={task.isCompleted} updateTask={this.updateTask} removeTask={this.removeTask}/>
                        )
                    }
                </div>
                <button onClick={this.resetToDefault}>Reset all</button>
            </div>
        );
    }
}

export default App;
