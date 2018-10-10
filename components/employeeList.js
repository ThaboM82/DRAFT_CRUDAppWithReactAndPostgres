import React, { Component} from 'react';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import TableRow from './tableRow';

export default class employeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  };

  componentDidMount() {
    axios.get("/employee/list")
      .then(response => {
        this.setState({
          employees: response.data.employees
        })
      })
      .catch((error => console.log(error)));
  };

  getTable() {
    return (
      this.state.employees.map((employee) => {
        return (
          <TableRow
            // key={employee.id}
            employee={employee}
            onUpdate={this.componentDidMount.bind(this)}
          />
        );
      })
    );
  };

  render() {
    // console.log("this.state.employees", this.state.employees)
    // return (this.state.employees.length == 0 || this.state.employees == undefined)
    return (this.state.employees == undefined)
    ? (<p>No employee entries</p>)
    : (
          <div id="main-frame">
            <table>
              <thead>
                <tr>
                  <th>ID #</th>
                  <th>NAME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {this.getTable()}
              </tbody>
            </table>
          </div>
    );
  }
}
