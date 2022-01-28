import React from 'react'
import "./UploadFile.css"
import PropTypes from 'prop-types'
import { BsFileEarmarkZip, BsFillImageFill } from 'react-icons/bs'

export default function ({ type, onFileDrop, onCompleted }) {

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        onFileDrop(e.dataTransfer.files[0]);
        onCompleted()
    };

    const dragLeave = (e) => {
        e.preventDefault();
    };
    return (
        <div className="container" onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver} onDrop={onDrop}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {
                    type === "code" ?
                        <BsFileEarmarkZip size={70} />
                        : <BsFillImageFill size={70} />
                }
                <div style={{ margin: "2vh 0px" }}>
                    <p style={{ fontSize: "3.6vh", textAlign: "center" }}>
                        Drag and Drop
                    </p>
                    <p></p>
                    <p style={{ fontSize: "2.4vh", fontWeight: "bold", textAlign: "center" }}>or</p>
                </div>
                <FilePicker
                    onChange={(file) => { onFileDrop(file); onCompleted() }}
                    onError={(e) => console.log(e)}
                    accept={type == "code" ? "" : "image/*"}
                >
                    <button className="buy-button">Pick</button>
                </FilePicker>
            </div>
        </div>
    )
}

class FilePicker extends React.Component {
    constructor(props) {
        super(props)

        this._validate = this._validate.bind(this)
    }

    _validate(file) {
        const { onError, onChange, } = this.props

        // make sure a file was provided in the first place
        if (!file) {
            onError('Failed to upload a file.')
            return
        }

        // return native file object
        onChange(file)
    }

    render() {
        return (
            <FileInput onChange={this._validate} style={this.props.style} accept={this.props.accept}>
                {this.props.children}
            </FileInput>
        )
    }
}

FilePicker.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    // file extension
    accept: PropTypes.string,
    // validate file contents
    validateContent: PropTypes.func,
    style: PropTypes.object
}

FilePicker.defaultProps = {
    maxSize: 2
}


class FileInput extends React.Component {
    constructor(props) {
        super(props)

        this._handleUpload = this._handleUpload.bind(this)
    }

    _handleUpload(evt) {
        const file = evt.target.files[0]
        this.props.onChange(file)

        // free up the fileInput again
        this.fileInput.value = null
    }

    render() {
        return (
            <div style={this.props.style}>
                <input
                    type="file"
                    multiple={true}
                    style={{ display: 'none' }}
                    onChange={this._handleUpload}
                    accept={this.props.accept}
                    ref={ele => (this.fileInput = ele)}
                />
                {React.cloneElement(this.props.children, {
                    onClick: () => this.fileInput.click()
                })}
            </div>
        )
    }
}

FileInput.propTypes = {
    style: PropTypes.object,
    accept: PropTypes.string,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired
}



