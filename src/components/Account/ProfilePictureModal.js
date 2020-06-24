import React, { Component } from 'react'

class ProfilePictureModal extends Component {
    constructor() {
      super()
  
      this.state = { 
        selectedFile : null,
        error : null
      }  
    }

    clearModal = () => {
      this.setState({
        selectedFile : null,
        error : null
      })
      document.getElementById('uploadInput').value = ''
      document.getElementById('progressbar').value = 0
      document.getElementById('upload-complete-text').innerHTML = ''
    }

    selectFileHandler = event => {
      this.setState({
        selectedFile : event.target.files[0]
      })  
    }
  
    uploadFileHandler = () => {
      if(this.state.selectedFile === null) {
        this.setState({ 
          error : "Please select a photo"
        })
      } else {
        // this.uploadProfilePicture(this.state.selectedFile)
        this.props.firebase.uploadProfilePicture(this.props.authUser.uid, this.state.selectedFile)
      }
    } 

    render() {
        return (
          <div id="profilePictureModal" className="modal fade container-fluid" aria-hidden="true"> 
            <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Upload Profile Picture</h5>
                      <button onClick={this.clearModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div className="modal-body d-flex flex-column">
                      <div className="row align-items-center">
                        <div className="col-md-4 mt-3 mb-3">
                          <img id="profile-picture-modal" className="profile-picture" src={this.props.authUser.photoURL} width="150" height="150" alt="" /> 
                        </div>
                        <div className="col-md-8 mt-3 mb-3">
                        { 
                          this.state.error ? 
                          <input id="uploadInput" className="text-danger" type="file" onChange={ this.selectFileHandler } />
                          : 
                          <input id="uploadInput" className="" type="file" onChange={ this.selectFileHandler } />
                        }
                        </div>
                      </div>
                      {this.state.error && <p className="text-danger">{ this.state.error }</p>}

                      <progress id="progressbar" style={{width:"100%"}} value="0" max-value="100"></progress>

                      <button className="btn btn-outline-dark mt-3 mb-3" onClick={ this.uploadFileHandler }> Upload </button>

                      <p id="upload-complete-text" className="text-successful"></p>

                    </div>

                    {/* <div className="modal-footer">
                      <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-outline-dark" onClick={ this.uploadFileHandler }>Upload</button>
                    </div> */}
                    
                  </div>
                </div>
          </div>

        )
    }
}

export default ProfilePictureModal