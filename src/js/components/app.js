import React, {Component} from "react"
import ReactDOM from "react-dom"
import Select from "react-select"
import Header from "./header"
import Editor from "./editor"
import Dropfile from "../utils/dropfile"
import sleep from "../utils/sleep"
import * as tabSizes from "../constants/tab-sizes"
import * as outputStyles from "../constants/output-styles"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollTop: 0};
  }

  componentDidMount() {
    this.props.fetchDefault();

    this.dropFile = new Dropfile(document.body);
    this.dropFile.on(Dropfile.Event.DROP_START, ::this.handleDropStart);
    this.dropFile.on(Dropfile.Event.DROP_END, ::this.handleDropEnd);
  }

  handleDropStart(entry) {
    console.log("START", entry.name);
  }

  handleDropEnd(node) {
    this.props.changeInput(node.toIndentString());
  }

  handleScroll(scrollTop) {
    this.setState({scrollTop});
  }

  render() {
    const {
      changeInput,
      changeOutputStyle,
      changeTabSize,
      editor
    } = this.props;

    const {
      input,
      output,
      outputBlob,
      tabSize,
      outputStyle
    } = editor;
    
    const fileName = `directree.${outputStyles.extensions[outputStyle]}`;

    return (
      <div className="container">
        <Header />
        <Select
          className=""
          clearable={false}
          searchable={false}
          value={tabSize}
          options={tabSizes.options}
          onChange={changeTabSize}
          />
        <Select
          className=""
          clearable={false}
          searchable={false}
          value={outputStyle}
          options={outputStyles.options}
          onChange={changeOutputStyle}
          />
        <div className="editor-titles container__row">
          <h3 className="editor-title--input container__col">Input</h3>
          <h3 className="editor-title--output container__col"><a download={fileName} href={outputBlob} target="_blank">Download</a>Output</h3>
        </div>
        <div className="editors container__row">
          <Editor
            name="input-editor"
            className="editor--input container__col"
            value={input}
            tabSize={tabSize}
            readOnly={false}
            scrollTop={this.state.scrollTop}
            onChange={value => changeInput(value)}
            onScroll={::this.handleScroll}
          />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            value={output}
            tabSize={tabSize}
            readOnly={true}
            scrollTop={this.state.scrollTop}
            onScroll={::this.handleScroll}
          />
        </div>
        <p className="copyright">Copyright Directree &copy; All Right Reserved.</p>
      </div>
    );
  }
}
