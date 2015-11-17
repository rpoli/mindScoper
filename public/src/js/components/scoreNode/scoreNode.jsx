import React from 'react';
import classNames from 'classnames';

class ScoreNode extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    let activeScoreArrow = ((comp)=>{
        if(comp.props.scoreObj.active){
          return <span aria-hidden="true" className="glyphicon glyphicon-chevron-right"></span>;
        } else {
         return null;
        }
      })(this);  

    return (
      <li className={classNames("score-node",this.props.cqSerial >= this.props.scoreObj.serial ? 'active':'')}>
        <div className="row">
          <div className="col-md-1">
             {activeScoreArrow}
          </div>
          <div className="col-md-1">{this.props.scoreObj.serial}</div>
          <div className="col-md-8">{this.props.scoreObj.value}</div>
        </div>
      </li>
    );
  }
}

export default ScoreNode;