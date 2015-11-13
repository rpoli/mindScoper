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
	setActiveOption : function(optionIndex, qSerial) {
		AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ACTIVE_OPTION,
      data: {
      	optionIndex : optionIndex,
      	qSerial : qSerial
      }
    });
	}

};

export default AppViewActions;
