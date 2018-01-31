import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';
//CSS
import '@/components/News/News.scss';

class News extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let news = {
      snippet: '',
      pub_date: '',
      source: ''
    };

    if (this.props.loaded && this.props.data !== null) {
      news = Object.assign({}, this.props.data);
      news.pub_date = `Public date: ${news.pub_date || 'N/A'}`;
      news.source = `source: ${news.source || 'N/A'}`;
      news.hasThumbnail = news.multimedia && news.multimedia.length > 0;
      if (news.hasThumbnail)
        news.thumbnail = `http://www.nytimes.com/${
          (news.multimedia[3] || news.multimedia[0]).url
        }`;
    }

    return (
      <div className={cn({
        news: true,
        'news-loading': !this.props.loaded,
        hide: this.props.loaded && !news.snippet
      })}>
        <div className="news-body">
          <Row>
            {news.hasThumbnail
              ?
              <Col xs={3}>
                <div className="news-image" style={{
                  backgroundImage: `url(${news.thumbnail})`
                }}></div>
              </Col>
              :
              ''
            }
            <Col xs={news.hasThumbnail ? 9 : 12}>
              <p className="news-title">{news.snippet}</p>
              <p className="news-date"><span>{news.pub_date}</span></p>
              <p className="news-source"><span>{news.source}</span></p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.object
};


export default News;
