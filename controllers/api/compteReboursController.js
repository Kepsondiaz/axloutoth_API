const CompteAReboursService = require('../../services/api/compteReboursService');

const addBacDate = async (req, res) => {
  try {
    const { dateExamen } = req.body;
    const result = await CompteAReboursService.addBacDate(dateExamen);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTimeUntilExam = async (req, res) => {
  try {
    const countdown = await CompteAReboursService.getTimeUntilExam();
    res.json({ compte_a_rebours: countdown });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBacDate,
  getTimeUntilExam,
};