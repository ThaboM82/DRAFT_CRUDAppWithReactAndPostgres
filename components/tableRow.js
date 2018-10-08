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
    axios.get(`/employee/delete/${employee.employee_id}`)
    .then(() => {
      this.props.onUpdate();
    })
    .then(() => {
      console.log(`Employee (${employee.employee_name}) DELETED`)
    })
    .catch((err) => {
      console.log(err)
    });
  };

  render() {
    const employee = this.state.employee;
    return (
        <tr>
          <td>
            {employee.employee_id}
          </td>
          <td>
            {employee.employee_name}
          </td>
          <td className="box-actions">
            <Link to={`/view/${employee.employee_id}`}><button >View</button></Link>
            <Link to={`/edit/${employee.employee_id}`}><button >Edit</button></Link>
            <button onClick={this.handleDelete.bind(this, employee)} className="button-danger">Delete</button>
          </td>
        </tr>
    );
  };
};
