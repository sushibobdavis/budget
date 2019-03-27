<template>
<v-form ref="form">
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Budget</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="name" label="Enter Budget Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="description" label="Enter a description"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false; dialog2 = true">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<v-dialog v-model="dialog2" scrollable persistent max-width="600px">
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
            <v-text-field v-model="income.amount" label="Enter an amount"></v-text-field>
          </v-flex>
          <v-flex xs6 md4>
          <v-btn v-if="incomes.length-1 == index" @click="addIncome">Add income</v-btn>
          <v-btn v-if="incomes.length-1 > index" @click="removeIncome(index)">X</v-btn>
          </v-flex>
        </v-layout>
        <v-card-text>Total income: {{totalIncome}}</v-card-text>
        </v-container>
     </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog2 = false; dialog3 = true;">Next</v-btn>
        </v-card-actions>
  </v-card>
</v-dialog>
<v-dialog v-model="dialog3" scrollable persistent max-width="600px">
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
            <v-text-field v-model="expense.amount" label="Enter an amount"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-btn v-if="expenses.length-1 == index" @click="addExpense">Add expense</v-btn>
            <v-btn v-if="expenses.length-1 > index" @click="removeExpense(index)">X</v-btn>
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
          <v-btn color="blue darken-1" flat @click="dialog3 = false">Next</v-btn>
        </v-card-actions>
  </v-card>
</v-dialog>
<v-snackbar color="red" top="true" v-model="isOverBudget">
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
      dialog: true,
      dialog2: false,
      dialog3: false,
      overBudgetDialog: false,
      name: '',
      expenses: [{ name: '', amount: 0 }],
      incomes: [{ name: '', amount: 0 }],
      description: ''
    }
  },
  methods: {
    addExpense () {
      this.expenses.push({ name: '', amount: 0 })
    },
    addIncome () {
      this.incomes.push({ name: '', amount: 0 })
    },
    removeExpense (idx) {
      this.expenses.splice(idx, 1)
    },
    removeIncome (idx) {
      this.incomes.splice(idx, 1)
    }
  },
  computed: {
    numberOfBudgetItems () {
      return this.expenses.length
    },
    alltheNames () {
      return this.expenses.map(x => x.name).join(',')
    },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
