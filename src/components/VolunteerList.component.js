import React, {Component} from 'react'
import axios from 'axios';


const Volunteer = props => (
    <tr>
        <td>{props.volunteer.name}</td>
        <td>{props.volunteer.username}</td>
        <td>
        <input type="submit" value="Edit" onClick={() => {props.EditVolunteer(props.volunteer.username)}} className="btn btn-info"/>
        </td>
        <td>
        <input type="submit" value="Delete" onClick={() => {props.deleteVolunteer(props.volunteer.username)}} className="btn btn-danger"/>
        </td>
    </tr>
)

export default class VolunteerList extends Component {
   constructor(props)
   {
       super(props);
        this.deleteVolunteer = this.deleteVolunteer.bind(this)
       this.state = {volunteers: []};
   }

    componentDidMount(){

        axios.get('http://localhost:8000/volunteer/').then(res => {
            
            this.setState({volunteers: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getVolunteerList(){
        return this.state.volunteers.map(currVolunteer => {
            return <Volunteer volunteer={currVolunteer} deleteVolunteer={this.deleteVolunteer} key={currVolunteer.username}/>;
        })
    }
    deleteVolunteer(userName)
    {
        axios.delete('http://localhost:8000/volunteer/'+ userName).then(res=>console.log(res.data)).catch((err) => {console.log(err.response)});

       this.setState({
            volunteers: this.state.volunteers.filter(el =>el.userName !== userName)
        })
        window.location = '/volunteer';
    }

    EditVolunteer(username)
    {
        console.log("called edit on user: " + username);
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Volunteer List</h3>
                <table className = "table table-hover">
                    <thead className = "thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.getVolunteerList()}            
                    </tbody>
                </table>
            </div>           
        )
    }
}