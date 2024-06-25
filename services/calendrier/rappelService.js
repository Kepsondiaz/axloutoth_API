const Rappel = require("../../models/calendrier/RappelModel");
const User = require("../../models/auth/User");
const { HttpError } = require("../../utils/exceptions");

class RappelService {

  
    static async getRappels(userId) {
      try {
        return Rappel.find({ userId, isDeleted: false });
      } catch (err) {
        throw new Error(err.message);
      }
    }
  
    static async getRappel(userId, id) {
      try {
        return Rappel.findOne({ userId, _id: id, isDeleted: false });
      } catch (err) {
        throw new Error(err.message);
      }
    }
  
    static async createRappel(userId, title, description, startTime, endTime, recurrence, reminder) {
      try {
        const data = {
          userId,
          title,
          description,
          startTime,
          endTime,
          recurrence,
          reminder
        };
        return Rappel.create(data);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  
    static async updateRappel(id, title, description, startTime, endTime, recurrence, reminder) {
      try {
        const data = {
          title,
          description,
          startTime,
          endTime,
          recurrence,
          reminder
        };
        return Rappel.findOneAndUpdate({ 
            _id: id, 
            isDeleted: false },
            data, 
            { new: true }
        );
      } catch (err) {
        throw new Error(err.message);
      }
    }
  
    static async deleteRappel(id) {
      try {
        return Rappel.findOneAndUpdate({ 
            _id: id, 
            isDeleted: false },
            { isDeleted: true }
        );
      } catch (err) {
        throw new Error(err.message);
      }
    }
  
    static async getRappelsByDate(date) {
      try {
        return Rappel.find({ startTime: { $gte: date, $lt: date + 86400000 } });
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }
  

module.exports = RappelService;
