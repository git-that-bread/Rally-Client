import React, {Component} from 'react'

export default class EditVolunteer extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
            <h3>Edit Volunteer Information</h3>
            <form>
                <div className="form-group">
                    <label>Volunteer's Name:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>New Name:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}