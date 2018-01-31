import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Page404 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Grid className="home">

          <Row>
            <Col xs={12} className="heading"><h1>404 Not Found</h1></Col>
            <Col xs={12}><Link to="/">Back to home</Link></Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Page404;
