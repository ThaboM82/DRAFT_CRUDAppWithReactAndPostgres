import React from 'react';
import { Switch, Route } from 'react-router-dom';

import employeeList from './employeeList';
// import EmployeeForm from './employeeForm';
// import employeeView from './employeeView';

const viewForm = {
  type: 'hidden',
  disabled: true,
  labelButton: ''
};

const routeEmployees = () =>
   (
    <Switch>
      <Route exact path='/list' component={employeeList} />
      {/* <Route path='/view/:id' render={ (props) => (<EmployeeForm {...props} data={viewForm} /> )} /> */}
      {/* <Route path='/view/:id' component={EmployeeForm} /> */}
    </Switch>
  );


export default routeEmployees;
