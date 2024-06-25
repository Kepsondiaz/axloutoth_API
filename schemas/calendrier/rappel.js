const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RappelSchema = new Schema({

    title: { 
        type: String,
        required: true 
    },

    description: { 
        type: String 
    },

    startTime: { 
        type: Date, 
        required: true 
    },

    endTime: { 
        type: Date, 
        required: true 
    },

    recurrence: { 
        type: String, 
        enum: ['quotidienne', 'hebdomadaire', 'mensuel', 'annuel', 'jamais'] 
    },

    reminder: {
        type: String
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true 
    },

    isDeleted: { 
        type: Boolean, 
        default: false 
    },

    date:{
        type: Date,
        default: Date.now()
    }
});
const skipDeleted = function () {
    this.where({ isDelete: false });
};

RappelSchema.pre("find", skipDeleted);
RappelSchema.pre("findOne", skipDeleted);
RappelSchema.pre("findById", skipDeleted);
RappelSchema.pre("updateOne", skipDeleted);
RappelSchema.pre("updateMany", skipDeleted);
RappelSchema.pre("findOneAndUpdate", skipDeleted);
RappelSchema.pre("deleteOne", skipDeleted);
RappelSchema.pre("deleteMany", skipDeleted);

module.exports = {
    RappelSchema
}

