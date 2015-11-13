import React from 'react';
import BaseReactComponent from 'components/base/baseReactComponent';
import ScoreBoard from 'components/scoreBoard/scoreBoard';
import Score from 'components/score/score';
import QuestionBlock from 'components/questionBlock/questionBlock';

class Dashboard extends BaseReactComponent {
  
  constructor(props) {
    super(props);
    console.log(this.state);
  }

  getCurrentQuestion(qNo, qSet) {
    var qIndex = qNo-1;
    return qSet[qIndex];
  }

  getCurrentOptionSet(qNo, qSet){
    var qIndex = qNo-1;
    return qSet[qIndex].optionSet;
  }

  render() {
    return (
      <div className="container-fluid">
        <Score currentScore = {this.state.score.currentScore}/>
        <div className="row">
          <QuestionBlock currentQuestion={this.getCurrentQuestion(this.state.cqSerial, this.state.qSet)} 
          currentOptions={this.getCurrentOptionSet(this.state.cqSerial, this.state.qSet)}
          cqSerial={this.state.cqSerial}/>    
          <ScoreBoard scoreData={this.state.score.scoreJson}
          cqSerial={this.state.cqSerial}/>
        </div>
      </div> 
    );
  }
}

export default Dashboard;