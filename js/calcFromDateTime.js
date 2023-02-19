Vue.component('calc-from-date-time', {
	props: { displayResult: { type: Function } },
	data() {
		return {
			startDate: null,
			startTime: null,
			operationType: null,
			amount: null,
			unitType: null,
			operationTypes: [
				{ value: '+', text: 'Add' },
				{ value: '-', text: 'Subtract' }
			],
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

			var amount = parseInt(this.amount);
			var seconds = 0;
			if (this.unitType === 'hour') {
				seconds = amount * 60 * 60;
			} else if (this.unitType === 'minute') {
				seconds = amount * 60;
			}
			result = calculateFromDateTime(this.startDate, this.startTime, seconds, this.operationType);
			
			// TODO - Remove this line once the actual calculation is working
			result = this.startDate + " " + this.startTime + " " + this.operationType + " " + this.amount + " " + this.unitType;
			this.displayResult('Result: ' + result);
		},
		clearInputs: function () {
			this.startDate = null;
			this.startTime = null;
			this.operationType = null;
			this.amount = null;
			this.unitType = null;
		}
	},
	template: `
		<div>
			<form id="calcFromDateTime">
				<div class="form-row">
					<div class="form-group col-auto">
						<b-form-datepicker v-model="startDate" id="date" name="date" required></b-form-datepicker>
					</div>
					<div class="form-group col-auto">
						<b-form-timepicker v-model="startTime" id="time" name="time" required></b-form-timepicker>
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
						<b-button variant="primary" @click="calculateFromDateTime">Submit</b-button>
						<b-button variant="secondary" @click="clearInputs">Clear</b-button>
					</div>
				</div>
			</form>
		</div>
	`
});