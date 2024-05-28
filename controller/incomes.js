const incomesRouter = require("express").Router();
const Income = require("../models/income");
const Cake = require("../models/cake");
const Profile = require("../models/profile");


incomesRouter.get("/", async (request, response, next) => {
    const {year, month} = request.query;
    try {
        if (year && month) {
            Income.findOne({year: year, month: month}).then(income => {
                response.json(income);
            });
        } else
            Income.find({}).then(groups => {
                response.json(groups);
            });
    } catch (error) {
        next(error)
    }
});

incomesRouter.get("/:id", (request, response, next) => {
    Income.findById(request.params.id)
        .then(income => {
            if (income) response.json(income);
            else response.status(404).end();
        })
        .catch(error => next(error));

});

incomesRouter.post("/", async (request, response) => {

    const date = request.body.date;
    const source = request.body.source;
    const amount = request.body.amount;

    const linkedCake = request.body.linkedCake;
    const id = request.body.profileId

    let savedIncome;
    if (linkedCake != null) {
        const cakeFromDb = await Cake.findById(linkedCake)
        // console.log("cakeFromDb", cakeFromDb)
        const income = new Income({
            date: date, source: source, amount: amount,
            cakes: cakeFromDb._id
        });
        savedIncome = await income.save()
        cakeFromDb.incomes = cakeFromDb.incomes.concat(savedIncome._id);
        // console.log("cakeFromDb", cakeFromDb)
        await cakeFromDb.save()
    } else {
        const income = new Income({
            date: date, source: source, amount: amount
        });
        savedIncome = await income.save()
    }
    const profile = await Profile.findById(id)
    profile.incomes = profile.incomes.concat(savedIncome._id)
    await profile.save()
    response.json(savedIncome);

});
module.exports = incomesRouter;