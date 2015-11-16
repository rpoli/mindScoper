import React from 'react';
import AppViewActions from 'actions/appViewActions';
import classNames from 'classnames';

class OptionBlock extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(props);
  }
  
  setActiveOption(optionKey, optionIndex, qSerial, qKey) {
    console.log(optionIndex, qSerial);
    AppViewActions.setActiveOption(optionKey, optionIndex, qSerial, qKey);
  }

  render() {
    return (
      <div className={classNames("col-md-6","option-div",this.props.optionObj.selected ? "selected" : null)}>
        <div className="row">
          <div className="col-md-2 option-serial">{this.props.optionObj.key}</div>
          <div className="col-md-10 option-text" 
            onClick={this.setActiveOption.bind(this, this.props.optionObj.key, this.props.index, this.props.qSerial, this.props.qKey)}>
            {this.props.optionObj.text}
          </div>
        </div>
      </div>
    );
  }
}

export default OptionBlock;