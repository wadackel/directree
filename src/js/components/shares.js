import React, {Component} from "react"
import * as Constants from "../constants/application"

const ENCODE_URL = encodeURIComponent(Constants.APP_URL);
const ENCODE_TITLE = encodeURIComponent(Constants.APP_TITLE);

export default class Shares extends Component {
  handleTwitterClick(e) {
    this.requestShare(e, "tweetwindow", "width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1");
  }

  handleFacebookClick(e) {
    this.requestShare(e, "facebookwindow", "width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1");
  }

  handleHatenaClick(e) {
    this.requestShare(e, "hatenawindow", "width=500, height=450, menubar=no, toolbar=no, scrollbars=yes");
  }

  handlePocketClick(e) {
    this.requestShare(e, "pocketwindow", "width=550, height=350, menubar=no, toolbar=no, scrollbars=yes");
  }

  requestShare(e, name, prop) {
    e.preventDefault();
    const target = e.currentTarget;
    window.open(encodeURI(decodeURI(target.href)), name, prop);
  }

  render() {
    return (
      <ul className="shares">
        <li className="shares__item--twitter">
          <a className="shares__link"
            href={`http://twitter.com/intent/tweet?text=${ENCODE_TITLE}&amp;url=${ENCODE_URL}`}
            onClick={::this.handleTwitterClick}
            target="_blank"><i className="fa fa-twitter"></i>
          </a>
          <div className="shares__popup">Tweet!</div>
        </li>
        <li className="shares__item--facebook">
          <a className="shares__link"
            href={`http://www.facebook.com/share.php?u=${ENCODE_URL}`}
            onClick={::this.handleFacebookClick}><i className="fa fa-facebook"></i>
          </a>
          <div className="shares__popup">Share!</div>
        </li>
        <li className="shares__item--hatena">
          <a className="shares__link"
            href={`http://b.hatena.ne.jp/add?mode=confirm&amp;url=${ENCODE_URL}&amp;title=${ENCODE_TITLE}`}
            onClick={::this.handleHatenaClick}><i className="icon-hatena"></i>
          </a>
          <div className="shares__popup">Bookmark!</div>
        </li>
        <li className="shares__item--pocket">
          <a className="shares__link"
            href={`http://getpocket.com/edit?url=${ENCODE_URL}&amp;title=${ENCODE_TITLE}`}
            onClick={::this.handlePocketClick}><i className="fa fa-get-pocket"></i>
          </a>
          <div className="shares__popup">Save!</div>
        </li>
        <li className="shares__item--github">
          <a className="shares__link"
            href="https://github.com/tsuyoshiwada/directree"
            target="_blank"><i className="fa fa-github"></i>
          </a>
          <div className="shares__popup">Source on GitHub</div>
        </li>
      </ul>
    );
  }
}
