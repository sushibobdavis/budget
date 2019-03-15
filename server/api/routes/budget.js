const Budget = require('../../models/budget')

module.exports = function (router) {
  router.get('/budget/:id', function (request, response) {
    Budget.findById(request.params.id).exec()
      .then(result => response.status(200).json(result))
      .catch(err => response.status(500).json({
        message: 'Error finding budget',
        error: err
      }))
  })

  router.post('/budget', function (request, response) {
    let budget = new Budget(request.body)

    budget.save(function (err, _budget) {
      if (err) {
        response.status(500)
        response.json({
          message: 'Error creating budget',
          error: err
        })
      } else {
        response.status(200)
        response.json(_budget)
      }
    })
  })
}
