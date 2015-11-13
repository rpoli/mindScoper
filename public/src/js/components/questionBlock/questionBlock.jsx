import React from 'react';
import OptionBlock from 'components/optionBlock/optionBlock';
import SessionControl from 'components/sessionControl/sessionControl';
class QuestionBlock extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(props);
  }
  
  render() {
    return (
      <div className="col-md-7 question-section">        
        <div className="row q-div">
          <div className="col-md-2 q-serial">
            <span>{this.props.currentQuestion.serial}</span>
          </div>
          <div className="col-md-10 q-text">
            {this.props.currentQuestion.text}
          </div>
        </div>
        <div className="row option-section">
          {
            this.props.currentOptions.map((optObj, index)=>{
              return (<OptionBlock key={optObj.key} optionObj={optObj}
                index={index} 
                qSerial={this.props.currentQuestion.serial}
                qKey={this.props.currentQuestion.key}/>)
            })
          }
        </div>
        <SessionControl cqSerial={this.props.cqSerial}/>
      </div>
    );
  }
}

export default QuestionBlock;