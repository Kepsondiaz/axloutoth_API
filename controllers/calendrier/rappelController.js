const RappelService = require("../../services/calendrier/rappelService")


    const getRappels = async (req, res) => {

        try {
        const userId = req.params.userId;
        const rappels = await RappelService.getRappels(userId);
        res.json(rappels);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }



    const createRappel = async (req, res) => {

        try {

          const userId = req.params.userId;
          const { title, description, startTime, endTime, recurrence, reminder } = req.body;
          const rappel = await RappelService.createRappel(userId, title, description, startTime, endTime, recurrence, reminder);
          res.json(rappel);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    }


    const updateRappel = async (req, res) => {
        
        try {
          const rappelId = req.params.rappelId;
          const { title, description, startTime, endTime, recurrence, reminder } = req.body;
      
          const rappel = await RappelService.updateRappel(rappelId, title, description, startTime, endTime, recurrence, reminder);
      
          res.json(rappel);
        } catch (err) {
          res.status(err.statusCode || 500).json({ message: err.message });
        }
    }

    module.exports = {

        getRappels,
        createRappel,
        updateRappel
    }



