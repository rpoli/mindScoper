
'use strict';

define(['controllers/controllerModule'], function (controllerModule) {

	controllerModule.controller('listController', ['userDetailsService', 'userTypeService', 'ngDialog', function (userDetailsService, userTypeService, ngDialog) {

		this.filter = false;
		this.selected = {};
		var that = this;
		console.log(ngDialog);

		this.showFilter = function () {
			console.log("get log");
			this.filter = !this.filter;
		};

		this.render = function () {
			userDetailsService.get({ q: "", page: 1 }, function (resObj) {

				that.userList = resObj.searchResults;
			});

			userTypeService.query({}, function (resObj) {

				that.userTypes = resObj;
			});
		};
		this.search = function () {

			if (typeof this.searchQ == "undefined" || this.searchQ == "") return;
			this.selectedGender = this.selectedUserTypes = false;
			this.minAge = this.maxAge = "";
			console.log("add loader");

			userDetailsService.get({ q: this.searchQ, page: 1 }, function (resObj) {
				that.userList = resObj.searchResults;
				console.log("remove Loader");
			});
		};
		this.getSelectedFromObject = function (obj) {
			var keys = Object.keys(obj);
			var filtered = keys.filter(function (key) {
				return obj[key];
			});
			return filtered;
		};
		this.filterSearch = function () {
			//alert(JSON.stringify(this.selected));

			//this.selectedFilter =
			//this.selectedFilter = angular.copy(this.selected);
			//alert(JSON.stringify(this.selectedFilter));
			if (typeof this.searchQ == "undefined" || this.searchQ == "") return;
			console.log("add loader");
			var filterObj = {
				q: this.searchQ,
				page: 1
			};
			this.minAge !== "" ? filterObj.minAge = this.minAge : false;
			this.maxAge !== "" ? filterObj.maxAge = this.maxAge : false;
			if (typeof this.selectedUserTypes !== undefined) {
				var str = this.getSelectedFromObject(this.selectedUserTypes).toString();
				str ? filterObj.userType = str : false;
			}
			if (typeof this.selectedGender !== undefined) {
				var str = this.getSelectedFromObject(this.selectedGender).toString();
				str ? filterObj.gender = str : "";
			}
			userDetailsService.get(filterObj, function (resObj) {
				that.userList = resObj.searchResults;
				that.filteredWith();
				console.log("remove Loader");
			});
		};
		this.callBack = function (obj) {
			ngDialog.open({ template: 'views/common/confirmOverlay.html', className: 'ngdialog-theme-plain', 'this': this });
		};
		this.filteredWith = function () {

			this.selectedFilter = [];
			var minMaxAge = [];
			var selectedUserTypes = this.selectedUserTypes;
			var keys = Object.keys(this.selectedUserTypes);
			var selectedUserFilter = this.userTypes.filter(function (user) {
				if (keys.indexOf(user.userTypeId) != -1 && selectedUserTypes[user.userTypeId]) {
					return true;
				}
			});

			var selectedGender = this.getSelectedFromObject(this.selectedGender);

			selectedUserFilter = selectedUserFilter.map(function (user) {

				return { "filterName": user.userTypeName, "filterObj": function filterObj() {

						that.selectedUserTypes[user.userTypeId] = false;
						that.filterSearch();
					} };
			});
			console.log(selectedUserFilter);

			selectedGender = selectedGender.map(function (gender) {

				return { "filterName": that.getGender(gender), "filterObj": function filterObj() {

						that.selectedGender[gender] = false;
						that.filterSearch();
					} };
			});
			console.log(selectedGender);

			if (this.minAge !== "" && this.maxAge !== "") {
				minMaxAge.push({ "filterName": "Age " + this.minAge + " to " + this.maxAge, "filterObj": function filterObj() {
						console.log("minAge");
						that.minAge = that.maxAge = "";
						that.filterSearch();
					} });
			}

			this.selectedFilter = this.selectedFilter.concat(selectedUserFilter, selectedGender, minMaxAge);

			console.log(this.selectedFilter);
		};

		this.getGender = function (gender) {
			return gender === 'M' ? "Male" : "Female";
		};

		this.removeSelectedFilter = function (opt) {
			alert(opt);
		};

		this.enableDisableOption = function () {
			var selectedUsers = this.getSelectedFromObject(this.selectedUsers);
			// disable edit button
			this.disableEdit = selectedUsers.length > 1 ? "grey" : "";
		};

		this.render();
	}]);
});
//# sourceMappingURL=listController.js.map
