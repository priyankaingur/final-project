const expensesRouter = require("express").Router();
const Expense = require("../models/expense");
const Cake = require("../models/cake");
const Profile = require("../models/profile");

expensesRouter.get("/", async (request, response) => {
    // console.log(request.query.profileId})
    Expense.find({}).then(expenses => {
        response.json(expenses);
    });
});

expensesRouter.get("/:id", (request, response, next) => {
    Expense.findById(request.params.id)
        .then(expense => {
            if (expense) response.json(expense);
            else response.status(404).end();
        })
        .catch(error => next(error));

});

expensesRouter.post("/", async (request, response) => {

    const date = request.body.date;
    const itemName = request.body.item;
    const cost = request.body.cost;
    const category = request.body.category;
    const linkedCake = request.body.linkedCake;
    const id = request.body.profileId

    const cakeFromDb = await Cake.findById(linkedCake.id)

    const expense = new Expense({
        date: date, item: itemName, cost: cost, category: category, cakes: cakeFromDb._id
    });

    await expense.save().then(async (res) => {
        const savedExpense = res
        cakeFromDb.expenses = cakeFromDb.expenses.concat(savedExpense._id);
        await cakeFromDb.save()
        const profile = await Profile.findById(id)
        profile.expenses = profile.expenses.concat(savedExpense._id)
        await profile.save()

        return response.json(savedExpense);
    })

});
module.exports = expensesRouter;