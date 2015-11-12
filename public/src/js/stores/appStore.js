
import AppDispatcher from 'dispatcher/appDispatcher';
import AppConstants from 'constants/appConstants';
import dataJson from 'dataJson';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var appData = {
  user: {
    name: "Ramesh Polishetti"  
  },
  session: {
    id: "AA12"
  },
  score : dataJson.score
}; 

var AppStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return appData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

 

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case AppConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
        
          AppStore.emitChange();
        }
        break;

      case AppConstants.TODO_DESTROY:
        
        AppStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;