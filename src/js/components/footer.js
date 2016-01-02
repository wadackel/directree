import React, {Component} from "react"

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <ul className="shares">
          <li className="shares__item--twitter"><a href="http://twitter.com/intent/tweet?text=undefined&amp;url=undefined" onclick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1' ); return false;" target="_blank" className="shares__link"><i className="fa fa-twitter"></i></a>
            <div className="shares__popup">Tweet!</div>
          </li>
          <li className="shares__item--facebook"><a href="http://www.facebook.com/share.php?u=undefined" onclick="window.open(this.href, 'facebookwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'); return false;" className="shares__link"><i className="fa fa-facebook"></i></a>
            <div className="shares__popup">Share!</div>
          </li>
          <li className="shares__item--hatena"><a href="http://b.hatena.ne.jp/add?mode=confirm&amp;url=undefined&amp;title=undefined" onclick="window.open(this.href, 'hatenawindow', 'width=500, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;" className="shares__link"><i className="icon-hatena"></i></a>
            <div className="shares__popup">Bookmark!</div>
          </li>
          <li className="shares__item--pocket"><a href="http://getpocket.com/edit?url=undefined&amp;title=undefined" onclick="window.open(this.href, 'pocketwindow', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes'); return false;" className="shares__link"><i className="fa fa-get-pocket"></i></a>
            <div className="shares__popup">Save!</div>
          </li>
          <li className="shares__item--github"><a href="https://github.com/tsuyoshiwada/directree" className="shares__link"><i className="fa fa-github"></i></a>
            <div className="shares__popup">Source on GitHub</div>
          </li>
        </ul>
        <p className="copyright">&copy; 2016 Directree. Created by <a href="https://github.com/tsuyoshiwada" target="_blank">@tsuyoshiwada</a>.</p>
      </div>
    );
  }
}
