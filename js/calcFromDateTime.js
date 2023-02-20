Vue.component('calc-from-date-time', {
	props: { displayResult: { type: Function } },
	data() {
		return {
			startDate: moment().format('YYYY-MM-DD'),
			startTime: moment().format('HH:mm:ss'),
			amount: null,
			unitType: null,
			unitTypes: [
				{ value: 'hour', text: 'Hours' },
				{ value: 'minute', text: 'Minutes' },
				{ value: 'second', text: 'Seconds' }
			],
			modalId: 'from_date_result'
		}
	},
	methods: {
		calculateFromDateTime: function () {
			// Validate the form before trying to select a number.
			$form = $('#calcFromDateTime');
			var isValid = $form[0].checkValidity();
			$form.addClass('was-validated');
			// If validation failed, don't submit the form.
			if(isValid === false) {
				return false;
			}

			const startDateTime = this.startDate + 'T' + (this.startTime ? this.startTime : '00:00:00');
			
			// Perform the actual calculcation and display the result
			calculateFromDate(startDateTime, this.amount, this.unitType, this.displayResult);
		},
		clearInputs: function () {
			this.startDate = moment().format('YYYY-MM-DD');
			this.startTime = moment().format('HH:mm:ss');
			this.amount = null;
			this.unitType = null;
		}
	},
	template: `
		<div>
			<form id="calcFromDateTime">
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-datepicker v-model="startDate"></b-form-datepicker>
					</div>
					<div class="form-group col-auto">
						<b-form-timepicker v-model="startTime" show-seconds></b-form-timepicker>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-input type="number" v-model="amount" placeholder="Offset (+/-amount)" required></b-form-input>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-select v-model="unitType" :options="unitTypes" required>
							<!-- This slot appears above the options from 'options' prop -->
							<template #first>
								<b-form-select-option :value="null" disabled>-- Unit type? --</b-form-select-option>
							</template>
						</b-form-select>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col mt-3">
						<b-button variant="primary" @click="calculateFromDateTime">Submit</b-button>
						<b-button variant="secondary" @click="clearInputs">Clear</b-button>
					</div>
				</div>
			</form>
		</div>
	`
});