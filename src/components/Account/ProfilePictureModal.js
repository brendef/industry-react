import React, { useState, useEffect } from 'react'

const ProfilePictureModal = (props) => {

  const [state, setState] = useState({
    selectedFile: null,
    error: null,
    photoURL: null
  })

  useEffect(() => {
    props.firebase.user().onSnapshot(doc => {
        setState(prevState => { return { ...prevState, photoURL: doc.data().photoURL } })
    })
  }, [state.photoURL, props.firebase])

  const clearModal = () => {
    document.getElementById('uploadInput').value = ''
    document.getElementById('progressbar').value = 0
    document.getElementById('upload-complete-text').innerHTML = ''
  }

  const selectFileHandler = event => {
    setState({
      selectedFile: event.target.files[0]
    })
  }

  const uploadFileHandler = () => {
    if (state.selectedFile === null) {
      setState({
        error: "Please select a photo"
      })
    } else {
      props.firebase.uploadProfilePicture(state.selectedFile)
    }
  }

    return (
      <div id="profilePictureModal" className="modal fade container-fluid" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Upload Profile Picture</h5>
              <button onClick={clearModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body d-flex flex-column">
              <div className="row align-items-center">
                <div className="col-md-4 mt-3 mb-3">
                  <img id="profile-picture-modal" className="profile-picture" src={state.photoURL} width="150" height="150" alt="" />
                </div>
                <div className="col-md-8 mt-3 mb-3">
                  {
                    state.error ?
                      <input id="uploadInput" className="text-danger" type="file" onChange={selectFileHandler} />
                      :
                      <input id="uploadInput" className="" type="file" onChange={selectFileHandler} />
                  }
                </div>
              </div>
              {state.error && <p className="text-danger">{state.error}</p>}

              <progress id="progressbar" style={{ width: "100%" }} value="0" max-value="100"></progress>

              <button className="btn btn-outline-dark mt-3 mb-3" onClick={uploadFileHandler}> Upload </button>

              <p id="upload-complete-text" className="text-successful"></p>

            </div>

          </div>
        </div>
      </div>
    )
}

export default ProfilePictureModal