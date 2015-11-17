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
	setActiveOption : function(title, index, cqIndex) {
		AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ACTIVE_OPTION,
      data: {
        title : title,
      	index : index,
      	cqIndex : cqIndex        
      }
    });
	},


  updateOptionStatus : function(cqIndex, result){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_STATUS,
      data: {
        cqIndex : cqIndex,
        optionStatus : result        
      }
    });
  }


};

export default AppViewActions;
