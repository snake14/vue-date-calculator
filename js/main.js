// I wouldn't normally commit an API key, but ths page has to be static and
// the key is for a free RapidApi account with a daily limit of 100 requests.
// It's also exposed in the client when the user inspects anyway.
const RAPID_API_KEY = '402eeb277fmsh81bbbf75eeda631p180c87jsn797f463f3dbc';
const RAPID_API_HOST = 'date-calculator2.p.rapidapi.com';
const RAPID_API_BASE_URL = 'https://' + RAPID_API_HOST;
const RAPID_API_SDATE_PATH = '/datetime/sdate'
const RAPID_API_DATEDIF_PATH = '/datetime/datedif'

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
	start_date = '';
	years = 0;
	months = 0;
	weeks = 0;
	days = 0;
	hours = 0;
	minutes = 0;
	seconds = 0;

	constructor(dateString) {
		this.start_date = dateString;
	}

	getUrl() {
		return RAPID_API_BASE_URL + RAPID_API_SDATE_PATH;
	}

	hasValidResponse(response) {
		return typeof response !== 'undefined' && typeof response.sdate !== 'undefined' && response.sdate;
	}

	formatResponse(response) {
		return response.sdate;
	}
}

class ApiRequestDateDif {
	start_date = '';
	end_date = '';

	constructor(startDate, endDate) {
		this.start_date = startDate;
		this.end_date = endDate;
	}

	getUrl() {
		return RAPID_API_BASE_URL + RAPID_API_DATEDIF_PATH;
	}

	hasValidResponse(response) {
		return typeof response !== 'undefined' && typeof response.datedif !== 'undefined' && response.datedif;
	}

	formatResponse(response) {
		const diffResponse = response.datedif;
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
		data: apiRequest,
		method: "GET",
		headers: {
			"X-RapidAPI-Key": RAPID_API_KEY,
			"X-RapidAPI-Host": RAPID_API_HOST
		},
		success: function(response) {
			var message = '';
			// If there was no response, display an error message.
			if(apiRequest.hasValidResponse(response)) {
				message = apiRequest.formatResponse(response);
			} else {
				message = 'There was an issue calculating the result.';
				if(apiRequest.hasResponseMessage(response)) {
					console.log(response.message);
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
	switch (unitType) {
		case 'year':
			request.years = amount;
			break;
		case 'month':
			request.months = amount;
			break;
		case 'week':
			request.weeks = amount;
			break;
		case 'day':
			request.days = amount;
			break;
		case 'hour':
			request.hours = amount;
			break;
		case 'minute':
			request.minutes = amount;
			break;
		case 'second':
			request.seconds = amount;
	}

	makeApiRequest(request, displayResultCallback);
};

const calculateDiffBetweenDates = function(startDate, endDate, displayResultCallback) {
	const request = new ApiRequestDateDif(startDate, endDate)
	makeApiRequest(request, displayResultCallback);
}