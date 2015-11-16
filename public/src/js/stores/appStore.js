
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
  score : {
    currentScore : 0,
    scoreJson : dataJson.score.scoreJson.reverse()
  },
  qSet: dataJson.qSet,
  cqSerial: 1,
  qElapsed: 0
}; 

function setCurrentQuestionSerial(data) {
  appData.cqSerial = data;
}

function setQuestionsElapsed(data) {
  appData.qElapsed = data
}

function setActiveOption (data) {
  
  console.log("hello")
  console.log(data);
  for(var i=0; i<appData.qSet[data.qSerial-1].optionSet.length; i++){
      appData.qSet[data.qSerial-1].optionSet[i].selected = false;    
  }
  appData.qSet[data.qSerial-1].optionSet[data.optionIndex].selected = true;
    console.log(data.optionKey);
  appData.selectedOption = data.optionKey;
  appData.qKey = data.qKey;    
}

function updateOptionStatus(data){
   appData.qSet[data.cqSerial-1].optionStatus = data.optionStatus;
   appData.qSet[data.cqSerial-1].answerStatus = true;
}


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
    var data;

    switch(action.actionType) {
      case AppConstants.SET_CURRENT_QUESTION_SERIAL:
        data = action.data;
        setCurrentQuestionSerial(data)
        AppStore.emitChange();
        break;

      case AppConstants.SET_QUESTIONS_ELAPSED:
        AppStore.emitChange();
        break;

      case AppConstants.SET_ACTIVE_OPTION:
        setActiveOption(action.data);
        AppStore.emitChange();
        break;

       case AppConstants.UPDATE_OPTION_STATUS:
        updateOptionStatus(action.data);
        AppStore.emitChange();
        break;   

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;