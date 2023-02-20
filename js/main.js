// I wouldn't normally commit an API key, but ths page has to be static and
// the key is for a free RapidApi account with a daily limit of 100 requests.
const RAPID_API_KEY = '402eeb277fmsh81bbbf75eeda631p180c87jsn797f463f3dbc';
const RAPID_API_HOST = 'date-calculator2.p.rapidapi.com';
const RAPID_API_BASE_URL = 'https://' + RAPID_API_HOST;
const RAPID_API_SDATE_PATH = '/datetime/sdate'

class ApiRequestParams {
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
}

function makeSdateApiRequest(apiRequestParams, displayResultCallback) {
	const url = RAPID_API_BASE_URL + RAPID_API_SDATE_PATH;
	$.ajax({
		url: url,
		async: true,
		crossDomain: true,
		data: apiRequestParams,
		method: "GET",
		headers: {
			"X-RapidAPI-Key": RAPID_API_KEY,
			"X-RapidAPI-Host": RAPID_API_HOST
		},
		success: function(response) {
			var message = '';
			// If there was no response, display an error message.
			if(typeof response !== 'undefined' && typeof response.sdate !== 'undefined' && response.sdate) {
				message = response.sdate;
			} else {
				message = 'There was an issue calculating the result.';
				if(typeof response !== 'undefined' && typeof response.message !== 'undefined' && response.message) {
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
	const params = new ApiRequestParams(date)
	switch (unitType) {
		case 'year':
			params.years = amount;
			break;
		case 'month':
			params.months = amount;
			break;
		case 'week':
			params.weeks = amount;
			break;
		case 'day':
			params.days = amount;
			break;
		case 'hour':
			params.hours = amount;
			break;
		case 'minute':
			params.minutes = amount;
			break;
		case 'second':
			params.seconds = amount;
	}

	makeSdateApiRequest(params, displayResultCallback);
};