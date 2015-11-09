var React = require('react');
var appStore = require('../stores/appStore');

function getInitialAppData() {
  return {
    allTodos: appStore.getAll()
  };
}

class BaseReactComponent extends React.Component({

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

});

export default BaseReactComponent;