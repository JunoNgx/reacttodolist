import React, { Component } from 'react'

export default class Task extends Component {

    constructor(props) {
        super(props)

        this.handleCheck = this.handleCheck.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    
    handleCheck(event) {
        this.props.updateTask(this.props.index, !(this.props.isCompleted))
    }

    handleRemove() {
        this.props.removeTask(this.props.index)
    }

    render() {
        let className, deleteDisplay
        className = 'task'
        if (this.props.isCompleted) {
            className += ' task-completed'
            deleteDisplay = <button className="delete-button" onClick={this.handleRemove}>x</button>
        }

        return (            
            <div className={className}>
                <input type="checkbox" id="isCompleted" name="task" checked={this.props.isCompleted} onChange={this.handleCheck}></input>
                <label className="task-name">{this.props.name}</label>
                {deleteDisplay}
            </div>
        )
    }
}
