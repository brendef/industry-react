import React, { Component } from 'react'

class BioModal extends Component {
    // constructor() {
    //   super()
  
    
    // }

    clearModal = () => {
      this.setState({
        selectedFile : null,
        error : null
      })
      document.getElementById('bio-text-area').value = ''
    }

    render() {
        return (
          <div id="BioModal" className="modal fade container-fluid" aria-hidden="true"> 
            <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Edit Bio</h5>
                      <button onClick={this.clearModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <textarea id="bio-text-area">
                        
                    </textarea>

                    <div className="modal-footer">
                      <button onClick={this.clearModal} type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-outline-dark" onClick={ this.uploadFileHandler }>Update</button>
                    </div>
                    
                  </div>
                </div>
          </div>

        )
    }
}

export default BioModal