const profilesRouter = require("express").Router();
const Profile = require("../models/profile");


profilesRouter.get("/", async(request, response) => {
    Profile.find({})
        .populate("cakes",{})
        .populate("incomes",{})
        .populate("expenses",{})
        .populate("profits",{})
        .then(groups => {
        response.json(groups);
    });
});

profilesRouter.get("/:id", (request, response, next) => {
    Profile.findById(request.params.id)
        .then(profile => {
            if (profile) response.json(profile);
            else response.status(404).end();
        })
        .catch(error => next(error));

});


module.exports = profilesRouter;