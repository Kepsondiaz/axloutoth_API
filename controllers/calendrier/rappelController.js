const RappelService = require('../../services/calendrier/rappelService');
const { HttpError } = require('../../utils/exceptions');

const addRappel = async (req, res) => {
    const { userId } = req.params;
    const { title, description, startTime, endTime, recurrence, reminder } = req.body;
    try {
        const result = await RappelService.addRappel(userId, { title, description, startTime, endTime, recurrence, reminder });
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

const getRappelsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const rappels = await RappelService.getRappelsByUser(userId);
        res.status(200).json(rappels);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

const getRappelById = async (req, res) => {
    const { rappelId } = req.params;
    try {
        const rappel = await RappelService.getRappelById(rappelId);
        res.status(200).json(rappel);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

const updateRappel = async (req, res) => {
    const { rappelId } = req.params;
    const { title, description, startTime, endTime, recurrence, reminder } = req.body;
    try {
        const result = await RappelService.updateRappel(rappelId, { title, description, startTime, endTime, recurrence, reminder });
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

const deleteRappel = async (req, res) => {
    const { rappelId } = req.params;
    try {
        const result = await RappelService.deleteRappel(rappelId);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

module.exports = {
    addRappel,
    getRappelsByUser,
    getRappelById,
    updateRappel,
    deleteRappel
};
