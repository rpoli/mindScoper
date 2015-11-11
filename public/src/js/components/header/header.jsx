import React from 'react';
import BaseReactComponent from 'components/base/baseReactComponent';

class Header extends BaseReactComponent {
  
  constructor(props) {
    super(props);
    console.log(this.state);
  }
  
  render() {
    return (
    	<div>
    		<div className="header-top user-settings">
        <div className="row user-name">
          <div className="col-md-12 text-right">RAMESH POLISHETTI </div>
        </div>
      </div>
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 total-score">
            <span>1,30,000</span>
          </div>
        </div>
      </div>
      </div>
    	);
  }
}

export default Header;