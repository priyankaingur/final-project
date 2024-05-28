const mongoose = require("mongoose").set("strictQuery", true);

const incomeSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
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

incomeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Income", incomeSchema);