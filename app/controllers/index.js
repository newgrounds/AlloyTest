$.firstName.SetValidator(alphaValidator);
$.lastName.SetValidator(alphaValidator);
$.confirmPassword.SetValidator(passwordValidator, $.password);

// validate all fields
//TODO: ideally, you wouldn't have to manually add each field with a validator
function validate() {
	return	$.firstName.validate() &&
			$.lastName.validate() &&
			$.confirmPassword.validate();
}

// only allow alphas
function alphaValidator(text) {
	return {
		valid : text.search(/[^a-zA-Z]+/) === -1,
		errorMessage : "Only alpha characters allowed."
	};
}

// make sure passwords match
function passwordValidator(text, compareObj) {
	return {
		valid : compareObj != null && text == compareObj.textField.value,
		errorMessage : "Password fields must match."
	};
}

function register(e) {
	// validate all fields
	if (validate()) {
		//submit to service
		$.activityIndicator.show();
		registerService.send({
			url: 'this would be the url where we hit the service',
			method: 'POST',
			//TODO: this should be encrypted for transit
			data: {
				firstName: $.firstName.GetValue(),
				lastName: $.lastName.GetValue(),
				username: $.username.GetValue(),
				password: $.password.GetValue()
			},
			success: function(e) {
				$.activityIndicator.hide();
				//we did it
				if (Ti.Platform.osname == "android") {
					$.successToast.show();
				} else {
					//TODO: use local notifications for iOS
					alert("Account created successfully!");
				}
			},
			error: function(e) {
				$.activityIndicator.hide();
				//:(
				if (Ti.Platform.osname == "android") {
					$.errorToast.show();
				} else {
					//TODO: use local notifications for iOS
					alert("There was an error creating your account. Please try again.");
				}
			}
		});
	}
}

// mock the register service
// NOTE: this is successful if your username is "success"
var registerService = {
	send : function(serviceArgs) {
		Ti.API.log(serviceArgs);
		// wait a couple of seconds to show off that activity indicator
		setTimeout(function() {
	        if (serviceArgs.data.username == "success") {
				serviceArgs.success();
			} else {
				serviceArgs.error();
			}
	    }, 2000);
	}
};

$.index.open();
