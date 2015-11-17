
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
  cqIndex: 0,
  qElapsed: 0
}; 

function setCurrentQuestionIndex(data) { 
  appData.cqIndex = data;
}

function setQuestionsElapsed(data) {
  appData.qElapsed = data
}

function setActiveOption (data) {
  
    console.log(data);
    console.log("q");

  for(var i=0; i<appData.qSet[data.cqIndex].optionSet.length; i++){
      appData.qSet[data.cqIndex].optionSet[i].selected = false;    
  }

  appData.qSet[data.cqIndex].optionSet[data.index].selected = true;  
  appData.qSet[data.cqIndex].selectedOption = data.title;

}

function updateOptionStatus(data){
    appData.qSet[data.cqIndex].optionStatus = data.optionStatus;
    appData.qSet[data.cqIndex].answered = true;
    if(appData.qElapsed < 15){
      appData.qElapsed =  appData.qElapsed + 1;
    }
}


var AppStore = assign({}, EventEmitter.prototype, {

  
  getAll: function() {
    return appData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

 

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var data;

    switch(action.actionType) {
      case AppConstants.SET_CURRENT_QUESTION_INDEX:
        data = action.data;
        setCurrentQuestionIndex(data)
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

    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;