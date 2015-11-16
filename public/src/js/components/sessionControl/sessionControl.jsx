import React from 'react';
import AppViewActions from 'actions/appViewActions';
class SessionControl extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(props);
  }
  
  setPreviousQuestionSerial(cqSerial) {
    var cqSerial = Number(cqSerial);
    if(cqSerial>1){
      AppViewActions.setCurrentQuestionSerial(cqSerial-1);
    }
  }

  setNextQuestionSerial(cqSerial, answerStatus) {

    console.log(answerStatus);

    var cqSerial = Number(cqSerial);
    if(cqSerial<15){
      AppViewActions.setCurrentQuestionSerial(cqSerial+1);
    }
  }

  animateSelectedOption(){

  }

  lockOption(cqSerial, qKey, selectedOption){
    console.log(cqSerial, qKey, selectedOption);
    if(selectedOption){
      if(selectedOption == qKey){
        AppViewActions.updateOptionStatus(cqSerial, true);
      }else{
        AppViewActions.updateOptionStatus(cqSerial, false);
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
            onClick={this.setPreviousQuestionSerial.bind(this, this.props.cqSerial)}>
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-left prev-btn"></span>Previous
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="btn btn-primary evn-btn" 
          onClick={this.lockOption.bind(this,this.props.cqSerial, this.props.qKey, this.props.selectedOption)}
          >Lock
            <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="evn-btn btn btn-primary"
          onClick={this.setNextQuestionSerial.bind(this, this.props.cqSerial, this.props.answerStatus)}>Next
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-right next-btn"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default SessionControl;