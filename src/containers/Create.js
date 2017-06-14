import React from 'react'
import PropTypes from 'prop-types'
import { CreateView } from '../components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CreateActions from '../actions/create'

class Create extends React.Component {

  static propTypes = {
    changeInputValue: PropTypes.func.isRequired,
    clearInputValue: PropTypes.func.isRequired,
    fetchTracks: PropTypes.func.isRequired,
    generatePlaylist: PropTypes.func.isRequired,
    tracksBeingFetched: PropTypes.func.isRequired,
    isDeleting: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    playlistName: PropTypes.string.isRequired,
    fetchingTracks: PropTypes.bool.isRequired,
    tracks: PropTypes.array.isRequired,
    generatingPlaylist: PropTypes.bool.isRequired,
    errorFetchingDescription: PropTypes.string.isRequired,
    deleting: PropTypes.bool.isRequired,
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
      this.props.tracksBeingFetched(false)
    }
  }

  isFetchingTracks = () => {
    let playlistNameLgth = this.props.playlistName.replace(/ /g, '').length - 1
    return playlistNameLgth === this.props.tracks.length
  }

  isKeyDownDelete = (e) => {
    if (e.keyCode === 8) {
      this.props.isDeleting(true)
      this.props.tracksBeingFetched(false)
    } else {
      this.props.isDeleting(false)
    }
  }

  onInputChange = (e) => {
    if (this.props.deleting) {
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

//Selectors
const mapStateToProps = createStructuredSelector({
  loggedIn: createSelector(
    (state) => state.login.loggedIn,
    (loginState) => loginState
  ),
  inputValue: createSelector(
    (state) => state.create.inputValue,
    (createState) => createState
  ),
  playlistName: createSelector(
    (state) => state.create.playlistName,
    (createState) => createState
  ),
  fetchingTracks: createSelector(
    (state) => state.create.fetchingTracks,
    (createState) => createState
  ),
  tracks: createSelector(
    (state) => state.create.tracks,
    (createState) => createState
  ),
  generatingPlaylist: createSelector(
    (state) => state.create.generatingPlaylist,
    (createState) => createState
  ),
  errorFetchingDescription: createSelector(
    (state) => state.create.errorFetchingDescription,
    (createState) => createState
  ),
  deleting: createSelector(
    (state) => state.create.deleting,
    (createState) => createState
  ),
})

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(CreateActions, dispatch)
  return {
    changeInputValue: actions.changeInputValue,
    clearInputValue: actions.clearInputValue,
    fetchTracks: actions.fetchTracks,
    generatePlaylist: actions.generatePlaylist,
    tracksBeingFetched: actions.tracksBeingFetched,
    isDeleting: actions.isDeleting,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
