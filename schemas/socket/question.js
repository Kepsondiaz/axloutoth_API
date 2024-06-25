const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({


  title: {
    type: String
  },

  forumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forum",
    required: true,
  },
  // celui qui à poser la question
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  contenu: {
    type: String,
    required: true,
  },

  /*
  imagepath:{

   type: String,
    required: true,
    unique: false,
    default: null,
 },
 */
  // ceux qui ont répondu à la question
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],

  // Ceux qui ont liker une question
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],


  responses: [{ 
    contenu: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],

  nombreReponse: {
    type: Number,
    default: 0
  },
  
  nombreLike: {
    type: Number,
    default: 0
  },
 
  isCompleted: {
    type: Boolean,
    default: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

QuestionSchema.pre("find", skipDeleted);
QuestionSchema.pre("findOne", skipDeleted);
QuestionSchema.pre("findById", skipDeleted);
QuestionSchema.pre("updateOne", skipDeleted);
QuestionSchema.pre("updateMany", skipDeleted);
QuestionSchema.pre("findOneAndUpdate", skipDeleted);
QuestionSchema.pre("deleteOne", skipDeleted);
QuestionSchema.pre("deleteMany", skipDeleted);

module.exports = {
  QuestionSchema,
};



// Endpoints a ajouter - nombre de reponses -nombre de question aime
// nombre de like et nombre de reponse

