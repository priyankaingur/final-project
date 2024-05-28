const mongoose = require("mongoose").set("strictQuery", true);

const expenseSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cakes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cake"
    }], profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
});

expenseSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Expense", expenseSchema);