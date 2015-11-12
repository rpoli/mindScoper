import React from 'react';
import OptionBlock from 'components/optionBlock/optionBlock';
import SessionControl from 'components/sessionControl/sessionControl';
class QuestionBlock extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(this.state);
  }
  
  render() {
    return (
      <div className="col-md-7 question-section">        
        <div className="row q-div">
          <div className="col-md-2 q-serial">
            <span>09</span>
          </div>
          <div className="col-md-10 q-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ?
          </div>
        </div>
        <OptionBlock />
        <SessionControl />
      </div>
    );
  }
}

export default QuestionBlock;