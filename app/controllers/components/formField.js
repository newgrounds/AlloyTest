// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.label.text = args.text || "";
$.textField.hintText = args.text || "";
$.textField.maxLength = args.maxLength || -1;
$.textField.accessibilityHint = args.accessibilityHint || "";
$.textField.accessibilityLabel = args.text || "";
$.textField.passwordMask = args.passwordMask || false;
$.textField.onReturn = args.onReturn || null;

exports.GetValue = function() {
	return $.textField.value;
};

var validator = function() { return { valid : true, errorMessage : "" }; };
var validatorArgs = null;

exports.SetValidator = function(func, funcArgs) {
	validator = func;
	validatorArgs = funcArgs;
};

function validate() {
	var response = validator($.textField.value, validatorArgs);
	if (response.valid == true) {
		// clear error state
		$.separator.backgroundColor = 'black';
		$.error.text = "";
	} else {
		// display error message
		$.separator.backgroundColor = 'red';
		$.error.text = response.errorMessage;
	}
	return response.valid;
}
exports.validate = validate;
