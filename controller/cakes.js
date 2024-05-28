const cakesRouter = require("express").Router();
const Cake = require("../models/cake");
const Profile = require("../models/profile");

cakesRouter.get("/", async (request, response) => {
    const cakes = await Cake.find({})
        .populate("profile", {})

    response.json(cakes);
});

cakesRouter.get("/:id", (request, response, next) => {
    Cake.findById(request.params.id)
        .then(cake => {
            if (cake) response.json(cake);
            else response.status(404).end();
        })
        .catch(error => next(error));

});

cakesRouter.post("/", async (request, response) => {

    const name = request.body.name;
    const price = request.body.price;
    const id = request.body.profileId;
    const cake = new Cake({
        name: name, price: price
    });
    await cake.save().then(async newCake => {
        const profile = await Profile.findById(id)
        profile.cakes = profile.cakes.concat(newCake._id)
        await profile.save()
        response.json(newCake);
    })

});

module.exports = cakesRouter;