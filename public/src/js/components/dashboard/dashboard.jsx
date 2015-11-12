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
  
  render() {
    return (
      <div className="container-fluid">
        <Score currentScore = {this.state.score.currentScore}/>
        <div className="row">
          <QuestionBlock />    
          <ScoreBoard scoreData={this.state.score.scoreJson}/>
        </div>
      </div> 
    );
  }
}

export default Dashboard;