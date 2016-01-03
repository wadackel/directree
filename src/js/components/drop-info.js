import React, {Component, PropTypes} from "react"
import Spinner from "./spinner"

export default class DropInfo extends Component {
  static propTypes = {
    isShow: PropTypes.bool
  }

  static defaultProps = {
    isEnter: false,
    isProgress: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {isEnter, isProgress} = this.props;
    let className = "drop-info";
    className += isEnter ? " is-enter" : "";
    className += isProgress ? " is-progress" : "";

    return (
      <div className={className}>
        <div className="drop-info__body">
          <h3 className="drop-info__title">ファイルをドロップ</h3>
          <p className="drop-info__text">単一のフォルダのみサポートしています。</p>
        </div>
        <div className="drop-info__spinner">
          <Spinner />
          <p className="drop-info__text">ファイルをパース中...</p>
        </div>
      </div>
    );
  }
}
