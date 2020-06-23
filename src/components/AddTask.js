import React, { Component } from 'react'

export default class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskName: '',
            isTaskBlank: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitTask = this.submitTask.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
    }
    handleChange(event) {
        this.setState({
            taskName: event.target.value
        })
    }
    handleKeypress(event) {
        if (event.key === "Enter") this.submitTask()
    }
    submitTask() {
        if (this.state.taskName === '') {
            this.setState({
                isTaskBlank: true
            })
        } else {
            this.props.addTask(this.state.taskName)
            this.setState({
                taskName: '',
                isTaskBlank: false
            })
        }
    }
    render() {
        let errorDisplay = (this.state.isTaskBlank)
            ? <p className="error">Task cannot be blank</p>
            : ''

        return (
            <div>
                <div className="new-task">
                    <label>Enter New Task: </label>
                    <input type="text" value={this.state.taskName} onChange={this.handleChange} onKeyPress={this.handleKeypress}></input>
                    <button onClick={this.submitTask}>+</button>
                    {errorDisplay}
                </div>
            </div>
        )
    }
}
