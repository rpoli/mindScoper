import React from 'react';

class SessionControl extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(this.state);
  }
  
  render() {
    return (
       <div className='row user-controls'>
            <div className='col-md-2 col-md-offset-3'><button type="button" className="evn-btn btn btn-primary"><span aria-hidden="true" className="glyphicon glyphicon-chevron-left prev-btn"></span>Previous</button></div>
            <div className='col-md-2'><button type="button" className="btn btn-primary evn-btn">Lock <span className="glyphicon glyphicon-lock" aria-hidden="true"></span></button></div>
            <div className='col-md-2'><button type="button" className="evn-btn btn btn-primary">Next <span aria-hidden="true" className="glyphicon glyphicon-chevron-right next-btn"></span></button></div>
          </div>
    );
  }
}

export default SessionControl;