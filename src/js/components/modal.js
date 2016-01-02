import React, {Component, PropTypes} from "react"

export default class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    className: "",
    isOpen: false
  }

  constructor(props) {
    super(props);
  }

  handleCloseClick(e) {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    const {className, isOpen} = this.props;
    const classNames = `${isOpen ? "modal modal--show" : "modal"} ${className}`;

    return (
      <div className={classNames}>
        <div className="modal__overlay" onClick={::this.handleCloseClick}></div>
        <div className="modal__content">
          <div className="modal__heading">
            <div className="modal__title">{this.props.title}</div>
            <button className="modal__close" onClick={::this.handleCloseClick}><i className="fa fa-close"></i></button>
          </div>
          <div className="modal__body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
