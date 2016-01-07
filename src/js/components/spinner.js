import React, {Component, PropTypes} from "react"

export default class Spinner extends Component {
  static propTypes = {
    isShow: PropTypes.bool
  };

  static defaultProps = {
    isShow: true
  };

  render() {
    const {isShow} = this.props;
    const className = `spinner${isShow ? " is-show" : ""}`;
    return (
      <div className={className}></div>
    );
  }
}
