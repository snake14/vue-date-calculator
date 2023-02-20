Vue.component('calc-from-date', {
	props: { displayResult: { type: Function } },
	data() {
		return {
			startDate: null,
			amount: null,
			unitType: null,
			unitTypes: [
				{ value: 'year', text: 'Years' },
				{ value: 'month', text: 'Months' },
				{ value: 'week', text: 'Weeks' },
				{ value: 'day', text: 'Days' }
			],
			modalId: 'from_date_result'
		}
	},
	methods: {
		calculateFromDate: function () {
			// Validate the form before trying to select a number.
			$form = $('#calcFromDate');
			var isValid = $form[0].checkValidity();
			$form.addClass('was-validated');
			// If validation failed, don't submit the form.
			if(isValid === false) {
				return false;
			}
			
			// Perform the actual calculcation and display the result
			calculateFromDate(this.startDate, this.amount, this.unitType, this.displayResult);
		},
		clearInputs: function () {
			this.startDate = null;
			this.amount = null;
			this.unitType = null;
		}
	},
	template: `
		<div>
			<form id="calcFromDate">
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-datepicker v-model="startDate" id="date" name="date" required></b-form-datepicker>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-input type="number" v-model="amount" name="amount" id="amount" placeholder="Offset (+/-amount)" required></b-form-input>
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
						<b-button variant="primary" @click="calculateFromDate">Submit</b-button>
						<b-button variant="secondary" @click="clearInputs">Clear</b-button>
					</div>
				</div>
			</form>
		</div>
	`
});