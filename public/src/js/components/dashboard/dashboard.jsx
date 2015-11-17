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

  getValue(cqIndex, qSet, key) {
    
    switch(key){
      case "currentQuestion" :
        return qSet[cqIndex];
      case "currentOptions" :
        return qSet[cqIndex].optionSet;
      case "selectedOption" :
        return qSet[cqIndex].selectedOption; 
      case "solutionKey" :
        return qSet[cqIndex].solutionKey; 
      case "optionStatus" :
        return qSet[cqIndex].optionStatus; 
      case "answered" :
        return qSet[cqIndex].answered; 
      default :
        return; 
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Score currentScore = {this.state.score.currentScore}/>
        <div className="row">
          <QuestionBlock 
            cqIndex={this.state.cqIndex}
            currentQuestion={this.getValue(this.state.cqIndex, this.state.qSet, "currentQuestion")} 
            currentOptions={this.getValue(this.state.cqIndex, this.state.qSet, "currentOptions")}            
            solutionKey={this.getValue(this.state.cqIndex, this.state.qSet, "solutionKey")}            
            selectedOption={this.getValue(this.state.cqIndex, this.state.qSet, "selectedOption")}
            optionStatus={this.getValue(this.state.cqIndex, this.state.qSet, "optionStatus")}
            answered={this.getValue(this.state.cqIndex, this.state.qSet, "answered")}
          />    
          <ScoreBoard
            scoreData={this.state.score.scoreJson}            
          />
        </div>
      </div> 
    );
  }
}

export default Dashboard;