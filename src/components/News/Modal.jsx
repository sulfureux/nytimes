import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import '@/components/News/Modal.scss';
import { closeModal } from '@/actions';
import News from '@/components/News/News';
import close from '@/assets/close.svg';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.closeModal, false);
  }

  closeModal(e) {
    if(!(e.keyCode && e.keyCode !== 27)) {
      const { dispatch } = this.props;
      dispatch(closeModal());
    }
  }

  render() {
    const { data } = this.props.detail;
    return (
      <React.Fragment>
        <div className="overlay" onClick={this.closeModal} />
        <div className={cn({'modal-container': true, error: this.props.detail.error})}>
          <div className="modal-news-header">
            <button
              className="close-btn"
              onClick={this.closeModal}
              dangerouslySetInnerHTML={{__html: close}}
            ></button>
          </div>
          <div className="modal-news-content">
            {this.props.detail.error
              ?
              data
              :
              <News loaded={true} data={data} />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Modal.propTypes = {
  detail: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { detail } = state;
  return {
    detail
  };
};

export default connect(mapStateToProps)(Modal);
