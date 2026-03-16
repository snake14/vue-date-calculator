// I wouldn't normally commit an API key, but ths page has to be static and
// the key is for a free RapidApi account with a daily limit of 100 requests.
// It's also exposed in the client when the user inspects anyway.
const RAPID_API_KEY = '402eeb277fmsh81bbbf75eeda631p180c87jsn797f463f3dbc';
const RAPID_API_HOST = 'date-calculator3.p.rapidapi.com';
const RAPID_API_BASE_URL = 'https://' + RAPID_API_HOST + '/api/utilities/date-calculator/v1';

class ApiRequest {
	getUrl() {
		return RAPID_API_BASE_URL;
	}

	hasValidResponse(response) {
		return false;
	}

	hasResponseMessage(response) {
		return typeof response !== 'undefined' && typeof response.message !== 'undefined' && response.message;
	}

	formatResponse(response) {
		return response;
	}
}

class ApiRequestSDate {
	date = '';
	value = 0;
	unit = 'days';
	timezone = 'utc';
	operation = 'add';
	outputFormat = 'yyyy-mm-dd';

	constructor(dateString) {
		this.date = dateString;
	}

	getUrl() {
		return RAPID_API_BASE_URL + '/' + this.operation;
	}

	hasValidResponse(response) {
		return typeof response !== 'undefined' && typeof response.success !== 'undefined' && response.success;
	}

	formatResponse(response) {
		return response.data.result;
	}
}

class ApiRequestDateDif {
	startDate = '';
	endDate = '';
	operation = 'difference';

	constructor(startDate, endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}

	getUrl() {
		return RAPID_API_BASE_URL + '/' + this.operation;
	}

	hasValidResponse(response) {
		return typeof response !== 'undefined' && typeof response.success !== 'undefined' && response.success;
	}

	formatResponse(response) {
		return response.data.humanReadable;

		const diffResponse = response.data.age;
		var responseString = '';
		if (typeof diffResponse.years !== 'undefined' && diffResponse.years) {
			responseString += 'Years: ' + diffResponse.years + '<br/>'
		}
		if (typeof diffResponse.months !== 'undefined' && diffResponse.months) {
			responseString += 'Months: ' + diffResponse.months + '<br/>'
		}
		if (typeof diffResponse.days !== 'undefined' && diffResponse.days) {
			responseString += 'Days: ' + diffResponse.days + '<br/>'
		}
		if (!responseString) {
			responseString = 'No difference<br/>'
		}
		return responseString;
	}
}

function makeApiRequest(apiRequest, displayResultCallback) {
	$.ajax({
		url: apiRequest.getUrl(),
		async: true,
		crossDomain: true,
		data: JSON.stringify(apiRequest),
		method: "POST",
		headers: {
			"X-RapidAPI-Key": RAPID_API_KEY,
			"X-RapidAPI-Host": RAPID_API_HOST,
			"Content-Type": "application/json"
		},
		success: function(response) {
			var message = '';
			// If there was no response, display an error message.
			if(apiRequest.hasValidResponse(response)) {
				message = apiRequest.formatResponse(response);
			} else {
				message = 'There was an issue calculating the result.';
				if(apiRequest.hasResponseMessage(response)) {
					console.log(response.error);
				}
			}
	
			displayResultCallback(message);
		},
		error: function(xhr, status, error) {
			const err = JSON.parse(xhr.responseText);
			var message = 'The API returned an error.';
			if(err && typeof err.message !== 'undefined' && err.message) {
				message = err.message;
			}
			displayResultCallback(message);
		}
	});
}

const calculateFromDate = function(date, amount, unitType, displayResultCallback) {
	const request = new ApiRequestSDate(date);
	request.value = Number(amount);
	switch (unitType) {
		case 'year':
			request.unit = 'years';
			break;
		case 'month':
			request.unit = 'months';
			break;
		case 'week':
			request.unit = 'weeks';
			break;
		case 'day':
			request.unit = 'days';
			break;
		case 'hour':
			request.unit = 'hours';
			request.outputFormat = 'readable';
			break;
		case 'minute':
			request.unit = 'minutes';
			request.outputFormat = 'readable';
			break;
		case 'second':
			request.unit = 'seconds';
			request.outputFormat = 'readable';
	}

	makeApiRequest(request, displayResultCallback);
};

const calculateDiffBetweenDates = function(startDate, endDate, displayResultCallback) {
	const request = new ApiRequestDateDif(startDate, endDate)
	makeApiRequest(request, displayResultCallback);
}