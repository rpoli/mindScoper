import React from 'react';

class OptionBlock extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(this.state);
  }
  
  render() {
    return (
      <div className="row option-section">
        <div className="col-md-6 option-div">
          <div className="row">
            <div className="col-md-2 option-serial">A</div>
            <div className="col-md-10 option-text">labor Ut enim ad minim veniam, quis ne et dolore magna aliqua. Ut enim ad minim ve</div>
          </div>
        </div>
        <div className="col-md-6 option-div right">
          <div className="row">
            <div className="col-md-2 option-serial">B</div>
            <div className="col-md-10 option-text">e magna aliqua. Ut enim ad minim veni Ut enim ad minim veniam, quis nam, quis nostrud e</div>
          </div>
        </div>
        <div className="col-md-6 option-div">
          <div className="row">
            <div className="col-md-2 option-serial">C</div>
            <div className="col-md-10 option-text">etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven</div>
          </div>
        </div>
        <div className="col-md-6 option-div right">
          <div className="row">
            <div className="col-md-2 option-serial">D</div>
            <div className="col-md-10 option-text">qua. Ut enim ad mini Ut enim ad minim veniam, quis nm veniam, quis nostrud</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OptionBlock;