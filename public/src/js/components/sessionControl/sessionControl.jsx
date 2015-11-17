import React from 'react';
import AppViewActions from 'actions/appViewActions';
class SessionControl extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  setCurrentQuestionIndex(cqIndex, answered, nxtCtrl){
    var cqIndex = Number(cqIndex);
    
    console.log(cqIndex);
    console.log(nxtCtrl);

    if(nxtCtrl) {
      if(answered) {
        if(cqIndex<15){
          AppViewActions.setCurrentQuestionIndex(cqIndex+1);
        }else{
          console.log("Session ended");
        }
      }else{
        console.log("please lock current question")
      }    
    }else {
      if(cqIndex>=1){
        AppViewActions.setCurrentQuestionIndex(cqIndex-1);
      }else{
        console.log("You reached first question");
      }
    }
  }


  lockOption(cqIndex, selectedOption, solutionKey){
    if(selectedOption){
      if(selectedOption == solutionKey){
        AppViewActions.updateOptionStatus(cqIndex, true);
      }else{
        AppViewActions.updateOptionStatus(cqIndex, false);
      }
    }else{
      console.log("please choose option");
    }
  }

  render() {
    return (
      <div className='row user-controls'>
        <div className='col-md-2 col-md-offset-3'>
          <button type="button" className="evn-btn btn btn-primary" 
            onClick={this.setCurrentQuestionIndex.bind(this, this.props.cqIndex, this.props.answered, false)}>
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-left prev-btn"></span>Previous
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="btn btn-primary evn-btn" 
            onClick={this.lockOption.bind(this,this.props.cqIndex, this.props.selectedOption, this.props.solutionKey)}>Lock
            <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="evn-btn btn btn-primary"
            onClick={this.setCurrentQuestionIndex.bind(this, this.props.cqIndex, this.props.answered, true)}>Next
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-right next-btn"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default SessionControl;