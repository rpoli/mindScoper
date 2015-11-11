import React from 'react';
import ReactDom from 'react-dom';
import appStore from 'stores/appStore';

function getInitialAppData() {
  return appStore.getAll();
}

class BaseReactComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = getInitialAppData();
  }

  componentDidMount(){
    appStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    appStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState(getInitialAppData());
  }

};

export default BaseReactComponent;