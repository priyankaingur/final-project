const profitsRouter = require("express").Router();
const Profit = require("../models/profit");
const Profile = require("../models/profile");


profitsRouter.get("/", async (request, response,next) => {
    const { year, month,profileId } = request.query;
    try{
        if (year && month && profileId) {
            Profit.findOne({year: year, month: month,profile:profileId})
                .then(profit => {
                response.json(profit);
            });
        } else

            Profit.find({}).then(profits => {
                response.json(profits);
            });
    }catch (error){
        next(error)
    }

});

profitsRouter.post("/", async (request, response,next) => {

    const reqBody = request.body
        const profit = new Profit({
            year: reqBody.year,
            month: reqBody.month,
            overall_expenses:reqBody.overall_expenses,
            overall_gross:reqBody.overall_gross,
            cumulative_profit:reqBody.cumulative_profit,
            average_profit_per_cake:reqBody.average_profit_per_cake,
            num_of_cakes:reqBody.num_of_cakes,
            incomes:reqBody.incomes,
            expenses:reqBody.expenses,
            profile:reqBody.profileId
        });
    try{
        const  savedProfit =await profit.save()
        const profile = await Profile.findById(reqBody.profileId)
        profile.profits = profile.profits.concat(savedProfit._id)
        await profile.save()
        response.json(savedProfit)
    }catch(error) {
        next(error)
    }
});

profitsRouter.put("/:id",async (request, response,next) => {

    const updateProfit=request.body;
    await Profit.findByIdAndUpdate(request.params.id, updateProfit ,{ new: true }).then((profit)=>{
        response.json(profit);
    }).catch(error=>{
        next(error)
    });
});

module.exports = profitsRouter;