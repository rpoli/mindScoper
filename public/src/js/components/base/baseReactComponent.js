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

  componentDidMount: function() {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getInitialAppData());
  }

});

export default BaseReactComponent;