const mongoose = require("mongoose").set("strictQuery", true);

const profileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, cakes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cake"
    }],
    incomes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income"
    }],
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
    }],
    profits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profit"
    }]
});

profileSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Profile", profileSchema);