Vue.component('calc-from-date', {
	props: { displayResult: { type: Function } },
	data() {
		return {
			startDate: null,
			operationType: null,
			amount: null,
			unitType: null,
			operationTypes: [
				{ value: '+', text: 'Add' },
				{ value: '-', text: 'Subtract' }
			],
			unitTypes: [
				{ value: 'day', text: 'Days' },
				{ value: 'month', text: 'Months' },
				{ value: 'year', text: 'Years' }
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

			var amount = parseInt(this.amount);
			
			// TODO - Perform the actual calculcation...
			result = this.startDate + " " + this.operationType + " " + this.amount + " " + this.unitType;
			calculateDaysFromDate(this.startDate, this.amount, this.operationType);
			this.displayResult('Result: ' + result);
		},
		clearInputs: function () {
			this.startDate = null;
			this.operationType = null;
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
						<b-form-select v-model="operationType" placeholder="Add/Subtract" :options="operationTypes" required>
							<!-- This slot appears above the options from 'options' prop -->
							<template #first>
								<b-form-select-option :value="null" disabled>-- Opertation? --</b-form-select-option>
							</template>
						</b-form-select>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-input type="number" v-model="amount" name="amount" id="amount" placeholder="Amount" required></b-form-input>
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