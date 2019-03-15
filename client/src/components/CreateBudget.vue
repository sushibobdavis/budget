<template>
  <div>
      <div v-if="isOverBudget">Danger.  You are over budget</div>
      <div class="budget-container">
        <h3>Enter a name:</h3>
        <div>
          <input type="text" v-model="name">
        </div>
        <h3>Enter your income:</h3>
        <div v-for="(income, index) in incomes" v-bind:key="index">
          <div>
            <input type="text" v-model="income.name" placeholder="Enter a name">
          </div>
          <div>
            <input type="number" v-model="income.amount" placeholder="Enter an amount">
          </div>
          <div>
            <button v-if="incomes.length-1 == index" @click="addIncome">Add income</button>
          </div>
        </div>
        <span>Total income: {{totalIncome}}</span>
        <h3>Enter your expenses:</h3>
        <div v-for="(expense, index) in expenses" v-bind:key="index">
          <div>
            <input type="text" v-model="expense.name" placeholder="Enter a name">
          </div>
          <div>
            <input type="number" v-model="expense.amount" placeholder="Enter an amount">
          </div>
          <div>
            <button v-if="expenses.length-1 == index" @click="addExpense">Add expense</button>
            <button v-if="expenses.length-1 > index" @click="removeExpense(index)">X</button>
          </div>
          <div>
          </div>
        </div>
        <span>Total expenses: {{totalExpenses}}</span>
      </div>
      <div v-show="!isOverBudget">You have ${{budgetBalance}} remaining</div>
      <div v-show="isOverBudget">You are ${{budgetBalance*-1}} over budget</div>
    </div>
</template>

<script>
export default {
  name: 'CreateBudget',
  data () {
    return {
      name: '',
      expenses: [{ name: '', amount: 0 }],
      incomes: [{ name: '', amount: 0 }]
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
      console.log('Removing at ' + idx)
      this.expenses.splice(idx, 1)
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

div.budget-container {
  float: left;
  padding: 30px;
}
div.budget-container > div div {
  width:250px;
  display: inline;
  padding: 30px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
