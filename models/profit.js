const mongoose = require("mongoose").set("strictQuery", true);

const profitSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    overall_expenses: {
        type: Number,
        required: false
    },
    overall_gross: {
        type: Number,
        required: false
    },
    cumulative_profit: {
        type: Number,
        required: false
    },
    num_of_cakes: {
        type: Number,
        defaultValue:0,
        required: false
    },
    average_profit_per_cake: {
        type: Number,
        required: false
    },
    incomes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income"
    }],
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
    }], profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }

});

profitSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Profit", profitSchema);