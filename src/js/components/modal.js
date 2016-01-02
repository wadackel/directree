import React, {Component, PropTypes} from "react"

const TRANSITION_DURATION = 250;

export default class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    className: "",
    isOpen: false
  }

  constructor(props) {
    super(props);
    this.focusAfterRender = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.focusAfterRender = true;
    }
  }

  componentDidUpdate() {
    if (this.focusAfterRender) {
      this.focusAfterRender = false;
      setTimeout(() => {
        this.refs.content.focus();
      }, TRANSITION_DURATION);
    }
  }

  handleCloseClick(e) {
    this.requestClose();
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) this.requestClose();
  }

  requestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    const {className, title, icon, isOpen} = this.props;
    const classNames = `${isOpen ? "modal modal--show" : "modal"} ${className}`;

    return (
      <div className={classNames}>
        <div className="modal__overlay" onClick={::this.handleCloseClick}></div>
        <div className="modal__content" ref="content" onKeyDown={::this.handleKeyDown} tabIndex="-1">
          <div className="modal__heading">
            <div className="modal__title">
              <i className={`fa fa-${icon}`}></i>
              {title}
            </div>
            <button className="modal__close" onClick={::this.handleCloseClick}><i className="fa fa-close"></i></button>
          </div>
          <div className="modal__body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
