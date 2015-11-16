import AppDispatcher from 'dispatcher/appDispatcher';
import AppConstants from 'constants/appConstants';

// Define actions object
let AppViewActions = {

// Set current question serial
  setCurrentQuestionSerial: function(serial){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_CURRENT_QUESTION_SERIAL,
      data: serial
    });
  },

// Set active option
	setActiveOption : function(optionKey, optionIndex, qSerial, qKey) {
		AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ACTIVE_OPTION,
      data: {
        optionKey : optionKey,
      	optionIndex : optionIndex,
      	qSerial : qSerial,
        qKey : qKey
      }
    });
	},


  updateOptionStatus : function(cqSerial, result){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_STATUS,
      data: {
        cqSerial : cqSerial,
        optionStatus : result        
      }
    });
  }


};

export default AppViewActions;
