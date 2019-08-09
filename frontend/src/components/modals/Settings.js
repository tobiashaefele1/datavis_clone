import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewButton from '../buttons/ViewButton'
class Settings extends Component {
	closeModal = () => {
	  this.props.dispatch({type: 'MODAL'});
	}
	colorchange = e =>{
		this.props.dispatch(this.changecolordispatch(e.target.value))
	};

	changecolordispatch(value){
		console.log(value)
		return(
			{
				type: 'CHANGECOLOR',
				value
			}
		)
	};


	render() {
	  if (this.props.show_modal) {
	    return (
	      <div>
	        <div id="settings" className="import_modal">
	          <div className="import_modal-content">
	            <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
	            <h2>Settings</h2>
				<h3>View</h3>
				<ViewButton/>
	            <h3>Color:</h3>
	            <label >

	              <svg width="10" height="10" className="Blues">
	                <rect width="10" height="10" className="q0-5" />
	              </svg>
	              <svg width="10" height="10" className="Blues">
	                <rect width="10" height="10" className="q1-5" />
	              </svg>
	              <svg width="10" height="10" className="Blues">
	                <rect width="10" height="10" className="q2-5" />
	              </svg>
	              <svg width="10" height="10" className="Blues">
	                <rect width="10" height="10" className="q3-5" />
	              </svg>
	              <svg width="10" height="10" className="Blues">
	                <rect width="10" height="10" className="q4-5" />
	              </svg>
	              <svg width="10" height="10" className="Purples">
	                <rect width="10" height="10" className="q5-5" />
	              </svg>

	            </label>
				  <button value={0} onClick={this.colorchange} > Blue </button>
	            <label>

	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q0-5" />
	              </svg>
	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q1-5" />
	              </svg>
	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q2-5" />
	              </svg>
	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q3-5" />
	              </svg>
	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q4-5" />
	              </svg>
	              <svg width="10" height="10" className="Reds">
	                <rect width="10" height="10" className="q5-5" />
	              </svg>

	            </label>
				  <button value={1} onClick={this.colorchange}> Red </button>

	            <label>

	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q0-5" />
	              </svg>
	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q1-5" />
	              </svg>
	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q2-5" />
	              </svg>
	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q3-5" />
	              </svg>
	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q4-5" />
	              </svg>
	              <svg width="10" height="10" className="Greens">
	                <rect width="10" height="10" className="q5-5" />
	              </svg>

	            </label>

				  <button value={2} onClick={this.colorchange}> Green </button>
				<div>
							STD:
				</div>
	          </div>

	        </div>
	      </div>);
	  } else {
	    return ('');
	  }
	}
}

function mapStateToProps(state) {
  return {
    show_modal: state.show_modal,
  };
}


export default connect(mapStateToProps)(Settings);
