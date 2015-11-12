import React from 'react';
import ScoreNode from 'components/scoreNode/scoreNode';

class ScoreBoard extends React.Component {
  
  constructor(props) {
    super(props);
    this.displayName = 'Score board';
    console.log(this.state);
  }
  
  render() {
    return (
      <div className="col-md-3 col-md-offset-2">
        <div className="score-board-header">
          <h1>Score Board</h1>
        </div>
        <div className="score-board">
          <div className="score-list">
            <ul>
              {
                this.props.scoreData.reverse().map(function(nodeObj){
                  return (<ScoreNode key={nodeObj.serial} scoreObj={nodeObj}/>);
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;