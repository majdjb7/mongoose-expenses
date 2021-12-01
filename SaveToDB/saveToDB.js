const expenses = require('./expenses.json')
const Expense = require('../server/routes/models/Expense')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensesDB', { useNewUrlParser: true })

// ------------------------------------------- We save data only once -------------------------------------------
for(expense of expenses) {
    let e1 = new Expense({
        item: expense.item,
        amount: expense.amount,
        date: expense.date,
        group: expense.group
    })
    e1.save()
}