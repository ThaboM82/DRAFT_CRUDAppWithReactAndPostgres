import React, { Component } from "react";
const axios = require("axios");
import { Link } from 'react-router-dom';

export default class employeeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee_name: "",
      employee_id: ""
    };
  }

  handleChange(e) {
    const letter = e.target.value;
    this.setState({
      employee_name: letter
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.employee_name
    };
    if (this.props.match.params.id) {
      axios
        .post(`/employee/edit/${this.props.match.params.id}`, data)
        .then(() => {
          console.log(`Employee CHANGED to ${this.state.employee_name}`);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
      .post("/employee/add", data)
      .then(() => {
        console.log(`Employee ${data.name} ADDED`);
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({
        employee_name: ""
      });
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
      .get(`/employee/list/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          employee_name: response.data.employee.name,
          employee_id: response.data.employee.id
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  resetState() {
    this.setState({
      employee_id:"",
      employee_name:""
    });

  }

  render() {
    // console.console.log("props de route");
    return (
      <div id="main-frame" className="employee-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1>Name:</h1><br />
          <input
            type="text"
            placeholder="Write a name..."
            value={this.state.employee_name}
            onChange={this.handleChange.bind(this)}
            disabled={this.props.data.disabled}
          />
          <br />
          <input type={this.props.data.type} value={this.props.data.labelButton} />
        </form>
        <p><Link to='/list'>Back</Link></p>
      </div>
    );
  }
}
