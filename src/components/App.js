import React, { Component } from "react";
import Header from '../../components/header';
import RouteMain from '../../components/routeMain';

class App extends Component {

  render() {
    return (
        <div>
          <Header />
          <RouteMain />
        </div>
    );
  }
}

export default App;
