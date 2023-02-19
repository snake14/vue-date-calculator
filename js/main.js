function makeApiRequest(dateString, timeSpan, operationString, tzString) {
	var url = 'https://www.timeapi.io/api/Calculation/custom/';
	var urlOperation = 'increment';
	if (operationString && operationString === '-') {
		urlOperation = 'decrement';
	}
	url += urlOperation;
	var body = {
		timeZone: tzString ? tzString : "UTC",
		dateTime: dateString,
		timeSpan: timeSpan,
		dstAmbiguity: ""
	};
	// If we made it past the validation, lets post the request to the API.
	$.ajax({
		url: url,
		type: "POST",
        headers: {'Access-Control-Allow-Origin': 'https://snake14.github.io'},
        data: body,
        dataType: "json",
		success: function(response) {
			console.log('response', response);
			// If there was no response, display an error message.
			if(typeof response === 'undefined' || typeof response.result === 'undefined' || response.result === '') {
				$('#infoModal .modal-body').html('There was an issue calculating the result.');
			} else {
				$('#infoModal .modal-body').html(response.result);
			}
	
			// Display the result.
			$('#infoModal').modal('show');
		},
		error: function() { alert('Failed!'); }
	});
}

function formatTimeUnit(unitValue) {
	if (time < 10) {
		return '0' + unitValue;
	}

	return unitValue;
}

var calculateDaysFromDate = function(date, numDays, operation) {
	makeApiRequest(date + " 00:00:00", numDays + ":00:00:00", operation);
};

var calculateFromDateTime = function(date, time, diffSeconds, operation) {
	var numSeconds, numMinutes, numHours, numDays = 0;
	numSeconds = diffSeconds % 60;
	var diffMinutes = (diffSeconds - numSeconds) / 60;
	numMinutes = diffMinutes % 60;
	var diffHours = (diffMinutes - numMinutes) / 60;
	numHours = diffHours % 24;
	numDays = (diffHours - numHours) / 24;
	var timeSpan = numDays + ' ' + formatTimeUnit(numHours) + ' ' + formatTimeUnit(numMinutes) + ' ' + formatTimeUnit(numSeconds);
	makeApiRequest(date + " " + time, timeSpan, operation);
};