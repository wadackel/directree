import React, {Component} from "react"
import Shares from "./shares"

export default class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        <Shares />
        <p className="copyright">&copy; {year} Directree. Created by <a href="https://github.com/tsuyoshiwada" target="_blank">@tsuyoshiwada</a>.</p>
      </div>
    );
  }
}
