import React from 'react'
import PropTypes from 'prop-types'

import ShimoCabinet from 'shimo-sdk-cabinet/dist/sheet.min'

import './SheetEditor.css'

class SheetEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false
    }

    this.editorRef = React.createRef()
  }

  componentDidMount () {
    const file = this.props.file

    this.cabinet = new ShimoCabinet({
      fileGuid: file.guid,
      entrypoint: file.config.entrypoint,
      token: file.config.token,

      container: this.editorRef.current
    })
    this.cabinet.render()
      .then(() => {
        if (this.props.onReady) {
          this.props.onReady()
        }
      })
  }

  componentWillUnmount () {
    if (this.cabinet) {
      this.cabinet.destroy()
    }
  }

  render () {
    return (
      <div className='editor-container d-flex flex-grow-1 flex-column' ref={this.editorRef} />
    )
  }
}

SheetEditor.propTypes = {
  file: PropTypes.object.isRequired,
  onReady: PropTypes.func
}

export default SheetEditor
