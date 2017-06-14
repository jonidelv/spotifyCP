import React from 'react'
import PropTypes from 'prop-types'
import { CreateView } from '../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CreateActions from '../actions/create'

class Create extends React.Component {

  constructor () {
    super()
    this.state = {
      isDeleting: false,
    }
  }

  static propTypes = {
    changeInputValue: PropTypes.func.isRequired,
    clearInputValue: PropTypes.func.isRequired,
    fetchTracks: PropTypes.func.isRequired,
    generatePlaylist: PropTypes.func.isRequired,
    tracksLoaded: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    playlistName: PropTypes.string.isRequired,
    fetchingTracks: PropTypes.bool.isRequired,
    tracks: PropTypes.array.isRequired,
    generatingPlaylist: PropTypes.bool.isRequired,
    errorFetchingDescription: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.renderTask()
  }

  componentWillUpdate() {
    this.renderTask()
  }

  renderTask = () => {
    if (!this.props.loggedIn ) this.props.history.push('/')
    if (this.isFetchingTracks()) {
      this.props.tracksLoaded()
    }
  }

  isFetchingTracks = () => {
    return (this.props.playlistName.replace(/ /g, '').length - 1) === this.props.tracks.length
  }

  isKeyDownDelete = (e) => {
    if (e.keyCode === 8) {
      this.setState({
        isDeleting: true,
      })
    } else {
      this.setState({
        isDeleting: false,
      })
    }
  }

  onInputChange = (e) => {
    let isDeleting = this.state.isDeleting
    if (isDeleting) {
      return this.clearInputValue()
    }
    let value = e.target.value
    this.props.changeInputValue(value)
    if (!/[^a-z ]/i.test(value)) {
      this.props.fetchTracks(value, (value.length -1))
    }
  }

  clearInputValue = () => {
    this.props.clearInputValue()
  }

  onGeneratePlaylist = () => {
    this.props.generatePlaylist()

  }

  render() {
    return (
      <CreateView
        inputValue={this.props.inputValue}
        onInputChange={this.onInputChange}
        clearInputValue={this.clearInputValue}
        playlistName={this.props.playlistName}
        fetchingTracks={this.props.fetchingTracks}
        tracks={this.props.tracks.sort((a, b) => (a.order - b.order))}
        generatingPlaylist={this.props.generatingPlaylist}
        errorFetchingDescription={this.props.errorFetchingDescription}
        onGeneratePlaylist={this.onGeneratePlaylist}
        isKeyDownDelete={this.isKeyDownDelete}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn,
    inputValue: state.create.inputValue,
    playlistName: state.create.playlistName,
    fetchingTracks: state.create.fetchingTracks,
    tracks: state.create.tracks,
    generatingPlaylist: state.create.generatingPlaylist,
    errorFetchingDescription: state.create.errorFetchingDescription,
    deleting: state.create.deleting,
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(CreateActions, dispatch)
  return {
    changeInputValue: actions.changeInputValue,
    clearInputValue: actions.clearInputValue,
    fetchTracks: actions.fetchTracks,
    generatePlaylist: actions.generatePlaylist,
    tracksLoaded: actions.tracksLoaded,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
