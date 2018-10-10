import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class tableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.employee
    }
  };

  handleDelete(employee) {
    axios.get(`/employee/delete/${employee.id}`)
    .then(() => {
      this.props.onUpdate();
    })
    .then(() => {
      console.log(`Employee (${employee.name}) DELETED`)
    })
    .catch((err) => {
      console.log(err)
    });
  };

  render() {
    // console.log("employee en tableRow:", this.state.employee )
    const employee = this.state.employee;
    return (
      <div key={employee.id}>
        <tr>
          <td>
            {employee.id}
          </td>
          <td>
            {employee.name}
          </td>
          <td className="box-actions">
            <Link to={`/view/${employee.id}`}><button >View</button></Link>
            <Link to={`/edit/${employee.id}`}><button >Edit</button></Link>
            <button onClick={this.handleDelete.bind(this, employee)} className="button-danger">Delete</button>
          </td>
        </tr>
      </div>
    );
  };
};
