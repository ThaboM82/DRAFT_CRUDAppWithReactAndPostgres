import React from 'react';
import { Switch, Route } from 'react-router-dom';

import employeeHome from './employeeHome';
import employeeList from './employeeList';
import EmployeeForm from './employeeForm';
import routeEmployees from './routeEmployees';

const viewForm = {
  type: 'hidden',
  disabled: true,
  labelButton: ''
};

const newForm = {
  type: 'submit',
  disabled: false,
  labelButton: 'Create',
};

const editForm = {
  type: 'submit',
  disabled: false,
  labelButton: 'Edit'
};

const routeMain = () =>
   (
    <main>
      <Switch>
        <Route exact path='/' component={employeeHome} />
        <Route path='/list' component={routeEmployees} />
        <Route path='/new' render={ (props) => (<EmployeeForm {...props} data={newForm}/> )} />
        <Route path='/view/:id' render={ (props) => (<EmployeeForm {...props} data={viewForm} /> )} />
        <Route path='/edit/:id' render={ (props) => (<EmployeeForm {...props} data={editForm} /> )} />
      </Switch>
    </main>
  );


export default routeMain;
