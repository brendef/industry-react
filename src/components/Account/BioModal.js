import React, { useState, useEffect } from 'react'

const BioModal = (props) => {

  const [state, setState] = useState({ 
    textareaVal: ""
  })

  useEffect(() => {
  props.firebase.user().get()
  .then(doc => {
      setState({textareaVal: doc.data().bio })
  })
  }, [props.firebase])

  const resetModal = () => {
    props.firebase.user().get()
    .then(doc => {
      setState({ textareaVal: doc.data().bio })
    })
  }

const handleInput = (event) => {
  setState({ textareaVal: event.target.value })
}

  const updateBioHandler = () => {
    props.firebase.updatebio( state.textareaVal )

  }

  return (
    <div id="BioModal" className="modal fade container-fluid" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Bio</h5>
            <button onClick={resetModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <textarea id="bio-text-area" onChange={handleInput} value={state.textareaVal}></textarea>

          <div className="modal-footer">
            <button onClick={resetModal} type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-dark"  data-dismiss="modal" onClick={updateBioHandler}>Update</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BioModal