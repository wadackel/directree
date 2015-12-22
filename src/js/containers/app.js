import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import App from "../components/app"
import * as editorActions from "../actions/editor"

export default connect(
  state => ({editor: state.editor}),
  dispatch => bindActionCreators(editorActions, dispatch)
)(App);
