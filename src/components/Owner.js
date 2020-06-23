import React from 'react';
// import event from 'event-module';

class Owner extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.owner,
            editMode: false,
            isOwnerBlank: false
        }

        this.enableEditMode = this.enableEditMode.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateOwner = this.updateOwner.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
    }

    enableEditMode() {
        this.setState({
            owner: this.props.owner,
            editMode: true
        });
    }
    handleChange(event) {
        this.setState({
            owner: event.target.value
        })
    }
    handleKeypress(event) {
        if(event.key === 'Enter') this.updateOwner()
    }
    updateOwner() {
        if (this.state.owner === '') {
            this.setState({
                isOwnerBlank: true
            })
        } else {
            this.setState({
                editMode: false,
                isOwnerBlank: false
            })
            this.props.updateOwner(this.state.owner)
        }
    }

    render() {
        let ownerDisplay = (this.state.editMode) 
            ? <div>
                <p>
                    <input type="text" value={this.state.owner} onChange={this.handleChange} onKeyPress={this.handleKeypress}></input>
                    <button onClick={this.updateOwner}>Save</button>
                </p>
            </div>
            : <div>
                <h2>Owner: {this.props.owner}
                    <button onClick={this.enableEditMode}>Edit</button>
                </h2>
            </div>
        let errorDisplay = (this.state.isOwnerBlank)
            ? <p className="error">Owner name cannot be blank</p>
            : ''

        return (
            <div className="Header"> 
                {ownerDisplay}
                {errorDisplay}
                {/* {this.state.owner}
                {this.state.isOwnerBlank.toString()} */}
            </div>
        );
    }
}

export default Owner;