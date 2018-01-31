import React, { Component } from 'react';
import { Grid, Row, Col, Pagination, Pager } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import News from '@/components/News/News';
import Modal from '@/components/News/Modal';

import { fetchList, showModal } from '@/actions';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const page = Number(this.props.match.params.page) || 1;
    const { dispatch } = this.props;
    dispatch(fetchList(page - 1));
    this.setTitle(page);
  }

  componentWillReceiveProps(nextProps) {
    const page = Number(nextProps.match.params.page) || 1;
    const { dispatch, list } = this.props;
    if (page !== list.currentPage) {
      dispatch(fetchList(page - 1));
    }
    this.setTitle(page);
  }

  setTitle(page) {
    if (page !== 1) {
      document.title = `Page ${page || this.state.page} - ${process.env.TITLE}`;
    } else {
      document.title = process.env.TITLE;
    }
  }

  genPaginationNumberList(page) {
    let paginationItemNumbers = [];

    if (page < 3) {
      paginationItemNumbers = [1, 2, 3, 4, 5];
    } else if (page > 198) {
      paginationItemNumbers = [196, 197, 198, 199, 200];
    } else {
      paginationItemNumbers = [page - 2, page - 1, page, page + 1, page + 2];
    }

    return paginationItemNumbers.map(number => {
      return (
        <LinkContainer key={number} to={`/page/${number}`}>
          <Pagination.Item disabled={false} active={number === page}>{number}</Pagination.Item>
        </LinkContainer>
      );
    });
  }

  genPageinationLabels() {
    return (
      <Pager>
        <LinkContainer to={'/'}>
          <Pager.Item previous disabled={false}>
            First
          </Pager.Item>
        </LinkContainer>
        <LinkContainer to={'/page/200'}>
          <Pager.Item next disabled={false}>
            Last
          </Pager.Item>
        </LinkContainer>
      </Pager>
    );
  }

  showModal(e, data) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(showModal(data));
  }

  render() {
    let i = 0;
    let { isFetching, items, currentPage } = this.props.list;

    // Pagination
    let page = currentPage;

    let paginationNumberList = this.genPaginationNumberList(page);
    let paginationLabels = this.genPageinationLabels();

    return (
      <React.Fragment>
        <Grid className="home">

          <Row>
            <Col xs={12} className="heading">
              <h1><Link to="/">A news collection of {process.env.COLLECTION} at NYTimes</Link></h1>
            </Col>
          </Row>

          <Row>

            <Col xs={12} md={8} lg={9}>
              <Row>
                {
                  items.map(news =>
                    <Col key={++i} xs={12}>
                      <div className="news-container" onClick={(e) => this.showModal(e, news)}>
                        <News position={i} loaded={!isFetching} data={news} />
                      </div>
                    </Col>
                  )
                }
              </Row>
            </Col>

            <Col xs={12} md={4} lg={3} style={{textAlign: 'center'}}>
              <AutoAffix viewportOffsetTop={15} container={this}>
                <div>
                  <div>
                    <Pagination bsSize="medium">{paginationNumberList}</Pagination>
                  </div>
                  <div style={{maxWidth: '200px', margin: '0 auto'}}>
                    {paginationLabels}
                  </div>
                </div>
              </AutoAffix>
            </Col>

          </Row>

        </Grid>
        {this.props.detail.isShow ? <Modal /> : ''}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  list: PropTypes.object.isRequired,
  detail: PropTypes.object
};

const mapStateToProps = state => {
  const { list, detail } = state;
  return { list, detail };
};

export default connect(mapStateToProps)(Home);
