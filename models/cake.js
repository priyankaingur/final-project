const mongoose = require("mongoose").set("strictQuery", true);

const cakeSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
    }],
    incomes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income"
    }], profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
});

cakeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Cake", cakeSchema);