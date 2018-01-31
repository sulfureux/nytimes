import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '@/pages/Home';
import Page404 from '@/pages/Page404';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/page/1" render={() => <Redirect to="/" />} />
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:page" component={Home} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
