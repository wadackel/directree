import React, {Component} from "react"
import ReactDOM from "react-dom"
import Select from "react-select"
import Clipboard from "clipboard"
import Modal from "./modal"
import Footer from "./footer"
import Editor from "./editor"
import Dropfile from "../utils/dropfile"
import sleep from "../utils/sleep"
import * as tabSizes from "../constants/tab-sizes"
import * as outputStyles from "../constants/output-styles"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      isSettingOpen: false,
      isAboutOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchDefault();

    this.dropFile = new Dropfile(document.body);
    this.dropFile.on(Dropfile.Event.DROP_START, ::this.handleDropStart);
    this.dropFile.on(Dropfile.Event.DROP_END, ::this.handleDropEnd);

    this.clipboard = new Clipboard(this.refs.btnCopy, {
      text: trigger => {
        return this.props.editor.output;
      }
    });
    this.clipboard.on("success", ::this.handleClipboardSuccess);
  }

  componentWillReceiveProps(nextProps) {
    const {editor: {ignorePattern}} = nextProps;
    this.dropFile.ignorePattern = ignorePattern;
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

  handleClipboardSuccess(e) {
    console.log(e);
  }

  openSettingModal() {
    this.setState({isSettingOpen: true});
  }

  closeSettingModal() {
    this.setState({isSettingOpen: false});
  }

  openAboutModal() {
    this.setState({isAboutOpen: true});
  }

  closeAboutModal() {
    this.setState({isAboutOpen: false});
  }

  render() {
    const {
      changeInput,
      changeOutputStyle,
      changeTabSize,
      changeIgnorePattern,
      editor
    } = this.props;

    const {
      isSettingOpen,
      isAboutOpen
    } = this.state;

    const {
      input,
      output,
      outputBlob,
      tabSize,
      outputStyle,
      ignorePattern
    } = editor;

    const fileName = `directree.${outputStyles.extensions[outputStyle]}`;

    return (
      <div className="container">
        <div className="container__row">
          <div className="editor-header container__col">
            <h1 className="editor-header__title--brand"><a href="./">Directree</a></h1>
            <div className="editor-header__control">
              <button className="btn" onClick={::this.openAboutModal}><i className="fa fa-info-circle"></i> About</button>
              <button className="btn" onClick={::this.openSettingModal}><i className="fa fa-cog"></i> Setting</button>
            </div>
          </div>
          <div className="editor-header container__col">
            <h2 className="editor-header__title">Output</h2>
            <div className="editor-header__control">
              <button className="btn" ref="btnCopy"><i className="fa fa-clipboard"></i> Copy</button>
              <a
                className="btn"
                download={fileName}
                href={outputBlob}
                target="_blank">
                <i className="fa fa-download"></i> Download
              </a>
            </div>
          </div>
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
            onScroll={::this.handleScroll} />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            value={output}
            tabSize={tabSize}
            readOnly={true}
            scrollTop={this.state.scrollTop}
            onScroll={::this.handleScroll} />
        </div>

        <Modal title="About" icon="info-circle" isOpen={isAboutOpen} onRequestClose={::this.closeAboutModal}>
          @TODO
        </Modal>

        <Modal title="Setting" icon="cog" isOpen={isSettingOpen} onRequestClose={::this.closeSettingModal}>
          <dl>
            <dt>スペースの数</dt>
            <dd>
              <Select
                className=""
                clearable={false}
                searchable={false}
                value={tabSize}
                options={tabSizes.options}
                onChange={changeTabSize} />
            </dd>
            <dt>出力の種類</dt>
            <dd>
              <Select
                className=""
                clearable={false}
                searchable={false}
                value={outputStyle}
                options={outputStyles.options}
                onChange={changeOutputStyle} />
            </dd>
            <dt>除外ファイル</dt>
            <dd>
              <input
                type="text"
                value={ignorePattern}
                onChange={e => changeIgnorePattern(e.target.value.trim())}
                placeholder="**/*.DS_Store" />
              <p className="_help">フォルダをドロップした際に除外したいファイルのパターンを指定します。</p>
            </dd>
          </dl>
        </Modal>

        <Footer />
      </div>
    );
  }
}
