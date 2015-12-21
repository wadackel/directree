import React, {Component} from "react"
import ReactDOM from "react-dom"
import indent2obj from "indent2obj"
import Header from "./components/header"
import Editor from "./components/editor"

class App extends Component {
  handleEditorChange(value) {
    console.log(indent2obj(value));
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="editor-titles container__row">
          <h3 className="editor-title--input container__col">Input</h3>
          <h3 className="editor-title--output container__col">Output</h3>
        </div>
        <div className="editors container__row">
          <Editor
            name="input-editor"
            className="editor--input container__col"
            readOnly={false}
            onChange={::this.handleEditorChange}
          />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            readOnly={true}
          />
        </div>
        <p className="copyright">Copyright Directree &copy; All Right Reserved.</p>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);
