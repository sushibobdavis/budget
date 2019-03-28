<template>
<v-form ref="form">
  <v-layout row justify-center>
    <v-dialog v-model="isStepOne" scrollable persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Budget</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="name" label="Enter Budget Name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="description" label="Enter a description"></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-menu
          v-model="dateFromActive"
          :close-on-content-click="false"
          transition="scale-transition"
        >
          <template>
            <v-text-field
              v-model="dateFrom"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFrom" @input="dateFromActive = false"></v-date-picker>
        </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="incrementStep">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<v-dialog v-model="isStepTwo" scrollable persistent max-width="600px">
  <v-card>
    <v-card-title>
      <span class="headline">
        Enter your incomes
      </span>
     </v-card-title>
     <v-card-text>
       <v-container>
        <v-layout v-for="(income, index) in incomes" v-bind:key="index"  wrap>
          <v-flex xs6 md4>
            <v-text-field v-model="income.name" label="Enter a description" required></v-text-field>
          </v-flex>
          <v-flex xs6 md4>
            <v-text-field type="number" v-model="income.amount" label="Enter an amount"></v-text-field>
          </v-flex>
          <v-flex xs6 md4>
          <v-btn v-if="index == 0" @click="addIncome">Add income</v-btn>
          <v-btn v-if="index > 0" @click="removeIncome(index)">X</v-btn>
          </v-flex>
        </v-layout>
        <v-card-text>Total income: {{totalIncome}}</v-card-text>
        </v-container>
     </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="decrementStep">Prev</v-btn>
          <v-btn color="blue darken-1" flat @click="incrementStep">Next</v-btn>
        </v-card-actions>
  </v-card>
</v-dialog>
<v-dialog v-model="isStepThree" scrollable persistent max-width="600px">
   <v-card>
    <v-card-title>
      <span class="headline">
        Enter your expenses
      </span>
     </v-card-title>
     <v-card-text>
       <v-container>
        <v-layout v-for="(expense, index) in expenses" v-bind:key="index"  wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="expense.name" label="Enter a description" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field type="number" v-model="expense.amount" label="Enter an amount"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-btn v-if="index == 0" @click="addExpense">Add expense</v-btn>
            <v-btn v-if="index > 0" @click="removeExpense(index)">X</v-btn>
          </v-flex>
        </v-layout>
        <v-card-text>
          Total expenses: {{totalExpenses}}
        </v-card-text>
        <v-card-text v-show="!isOverBudget">
          You have ${{budgetBalance}} remaining
        </v-card-text>
        </v-container>
     </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="decrementStep">Prev</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog3 = false">Save</v-btn>
        </v-card-actions>
  </v-card>
</v-dialog>
<v-snackbar color="red" v-model="isOverBudget">
  Danger. You are over budget
</v-snackbar>
  </v-layout>
</v-form>
</template>

<script>
export default {
  name: 'CreateBudget',
  data () {
    return {
      step: 1,
      name: '',
      expenses: [{ name: '', amount: 0 }],
      incomes: [{ name: '', amount: 0 }],
      description: '',
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      doNotUseDates: false,
      dateFromActive: true,
      dateToActive: true
    }
  },
  methods: {
    addExpense () {
      this.expenses.unshift({ name: '', amount: 0 })
    },
    addIncome () {
      this.incomes.unshift({ name: '', amount: 0 })
    },
    removeExpense (idx) {
      this.expenses.splice(idx, 1)
    },
    removeIncome (idx) {
      this.incomes.splice(idx, 1)
    },
    incrementStep () {
      this.step++
    },
    decrementStep () {
      this.step--
    }
  },
  computed: {
    totalExpenses () {
      return this.expenses.filter(x => !isNaN(Number(x.amount)))
        .map(x => ({ amount: parseFloat(x.amount) }))
        .reduce((x, y) => x + y.amount, 0)
    },
    totalIncome () {
      return this.incomes.filter(x => !isNaN(Number(x.amount)))
        .map(x => ({ amount: parseFloat(x.amount) }))
        .reduce((x, y) => x + y.amount, 0)
    },
    budgetBalance () {
      return this.totalIncome - this.totalExpenses
    },
    isOverBudget () {
      return (this.budgetBalance) < 0
    },
    isStepOne () {
      return this.step === 1
    },
    isStepTwo () {
      return this.step === 2
    },
    isStepThree () {
      return this.step === 3
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
