Vue.component('calc-diff-between-dates', {
	props: {
		displayResult: { type: Function },
		showLoading: { type: Function },
		hideLoading: { type: Function }
	},
	data() {
		return {
			startDate: moment().format('YYYY-MM-DD'),
			endDate: moment().format('YYYY-MM-DD'),
			modalId: 'date_diff_result'
		}
	},
	methods: {
		calculateDateDiff: function () {
			const stopLoading = this.hideLoading;
			const displayResult = this.displayResult;

			// Validate the form before trying to select a number.
			$form = $('#diffBetweenDates');
			var isValid = $form[0].checkValidity();
			$form.addClass('was-validated');
			// If validation failed, don't submit the form.
			if(isValid === false) {
				return false;
			}

			this.showLoading();
			
			// Perform the actual calculcation and display the result
			calculateDiffBetweenDates(this.startDate, this.endDate, function(message) {
				stopLoading();
				displayResult(message);
			});
		},
		resetInputs: function () {
			this.startDate = moment().format('YYYY-MM-DD');
			this.endDate = moment().format('YYYY-MM-DD');
		}
	},
	template: `
		<div>
			<form id="diffBetweenDates">
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-datepicker v-model="startDate"></b-form-datepicker>
					</div>
					<div class="form-group col-auto">
						<b-form-datepicker v-model="endDate"></b-form-datepicker>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col mt-3">
						<b-button variant="primary" @click="calculateDateDiff">Submit</b-button>
						<b-button variant="secondary" @click="resetInputs">Reset</b-button>
					</div>
				</div>
			</form>
		</div>
	`
});