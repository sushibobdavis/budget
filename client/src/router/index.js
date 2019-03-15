import Vue from 'vue'
import Router from 'vue-router'
import CreateBudget from '@/components/CreateBudget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateBudget',
      component: CreateBudget
    }
  ]
})
