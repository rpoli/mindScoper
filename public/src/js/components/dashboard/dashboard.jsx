import React from 'react';
import BaseReactComponent from 'components/base/baseReactComponent';
import ScoreBoard from 'components/scoreBoard/scoreBoard';
import Score from 'components/score/score';
import QuestionBlock from 'components/questionBlock/questionBlock';

class Dashboard extends BaseReactComponent {
  
  constructor(props) {
    super(props);
  }

  getCurrentQuestion(qSerial, qSet) {
    var qIndex = qSerial-1;
    return qSet[qIndex];
  }

  getCurrentOptions(qSerial, qSet){
    var qIndex = qSerial-1;
    return qSet[qIndex].optionSet;
  }

  getSelectedOption (qSerial, qSet) {
    var qIndex = qSerial-1;
    return qSet[qIndex].optionSet; 
  }

  getSolutionKey(){
    var qIndex = qSerial-1;
    return qSet[qIndex].optionSet; 
  }

  getOptionStatus(qSerial, qSet){
    var qIndex = qSerial-1;
    return qSet[qIndex].optionStatus; 
  }

  getAnswerStatus(qSerial, qSet){
    var qIndex = qSerial-1;
    return qSet[qIndex].answerStatus; 
  }

  getValue(qSerial, qSet, key) {
    var qIndex = qSerial-1;

    switch(key){
      case "currentQuestion"
      return 
      break;
      case "currentQuestion"
      break;
      case "currentQuestion"
      break;
      case "currentQuestion"
      break;
      case "currentQuestion"
      break;
      case "currentQuestion"
      break;
      case "currentQuestion"
      break;






    }
  }

















  render() {
    return (
      <div className="container-fluid">
        <Score currentScore = {this.state.score.currentScore}/>
        <div className="row">
          <QuestionBlock 
            cqSerial={this.state.cqSerial}
            currentQuestion={this.getCurrentQuestion(this.state.cqSerial, this.state.qSet)} 
            currentOptions={this.getCurrentOptions(this.state.cqSerial, this.state.qSet)}            
            solutionKey={this.getSolutionKey(this.state.cqSerial, this.state.qSet)}
            selectedOption={this.getSelectedOption(this.state.cqSerial, this.state.qSet)}
            optionStatus={this.getOptionStatus(this.state.cqSerial, this.state.qSet)}
            answerStatus={this.getAnswerStatus(this.state.cqSerial, this.state.qSet)}
          />    
          <ScoreBoard scoreData={this.state.score.scoreJson}
          cqSerial={this.state.cqSerial}/>
        </div>
      </div> 
    );
  }
}

export default Dashboard;