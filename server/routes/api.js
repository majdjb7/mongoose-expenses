const express = require('express')
const urllib = require('urllib')
const moment = require('moment')
const router = express.Router()
const Expense = require('./models/Expense')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensesDB', { useNewUrlParser: true })

// ********************************************************************************************************
router.get('/expenses', function(req, res) {
    if(!d1 && !d2) {
        Expense.find({}, function(err, expenses) {
            console.log(expenses)
            res.send(expenses)
        }).sort({date: -1})
    }
})
// ********************************************************************************************************
router.post('/expense', function(req, res) {
    let expenseToAdd
    let newDate = new Date()
    let isDate = req.body.date
    isDate ?
                    expenseToAdd = new Expense({
                    item: req.body.item,
                    amount: req.body.amount,
                    date: moment(req.body.date).format('LLLL'),
                    group: req.body.group}) : 
                                            expenseToAdd = new Expense({
                                            item: req.body.item,
                                            amount: req.body.amount,
                                            date: newDate,
                                            group: req.body.group
                                            })
    expenseToAdd.save().then((expense) => {
        console.log(`Amount of expense spent is: ${expense.amount}, it was spent on ${expense.group}`);
      });
    res.send(expenseToAdd)
})
// ********************************************************************************************************
router.put('/update', function(req, res) {
    let group1 = req.body.group1
    let group2 = req.body.group2

    Expense.findOneAndUpdate({group: group1}, {group: group2}, function(err, expense) {
        res.send(expense)
    })
})
// ********************************************************************************************************
router.get('/expenses/:group', function(req, res) {
    let groupName = req.params.group
    if(req.query.total == "false") {
        Expense.find({group: groupName}, function(err, expenses) {
            res.send(expenses)
        })
    }
    else{
        Expense.aggregate([
            {$match: {group: groupName}},
            {
                $group: {
                    _id: groupName,
                    totalAmount: {$sum: "$amount"},
                },
            },
            ], function(err, expense) {
                res.send(expense)
            })
    }
})



module.exports = router