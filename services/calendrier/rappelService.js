const Rappel = require("../../models/calendrier/RappelModel");
const User = require("../../models/auth/User");
const { HttpError } = require("../../utils/exceptions");

class RappelService {
    static async addRappel(userId, { title, description, startTime, endTime, recurrence, reminder }) {
        try {
            // Vérifier si l'utilisateur existe
            const user = await User.findById(userId);
            if (!user) {
                throw new HttpError(null, 404, 'Utilisateur non trouvé');
            }

            const rappel = new Rappel({ userId, title, description, startTime, endTime, recurrence, reminder });
            await rappel.save();

            return {
                success: true,
                message: "Rappel ajouté avec succès",
                data: rappel
            };
        } catch (error) {
            throw new HttpError(error, 500, `Impossible d'ajouter le rappel : ${error.message}`);
        }
    }

    static async getRappelsByUser(userId) {
        try {
            // Vérifier si l'utilisateur existe
            const user = await User.findById(userId);
            if (!user) {
                throw new HttpError(null, 404, 'Utilisateur non trouvé');
            }

            const rappels = await Rappel.find({ userId });
            return rappels;
        } catch (error) {
            throw new HttpError(error, 500, `Impossible de récupérer les rappels : ${error.message}`);
        }
    }

    static async getRappelById(rappelId) {
        try {
            const rappel = await Rappel.findById(rappelId);
            if (!rappel) {
                throw new HttpError(null, 404, 'Rappel non trouvé');
            }
            return rappel;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, `Impossible de récupérer le rappel : ${error.message}`);
            }
        }
    }

    static async updateRappel(rappelId, { title, description, startTime, endTime, recurrence, reminder }) {
        try {
            // Construire l'objet updatedFields avec les champs fournis
            const updatedFields = {
                title,
                description,
                startTime,
                endTime,
                recurrence,
                reminder
            };

            // Mise à jour du rappel avec les champs fournis
            const updatedRappel = await Rappel.findByIdAndUpdate(rappelId, updatedFields, { new: true });
            if (!updatedRappel) {
                throw new HttpError(null, 404, 'Rappel non trouvé');
            }
            return {
                success: true,
                message: "Rappel mis à jour avec succès",
                data: updatedRappel
            };
        } catch (error) {
            throw new HttpError(error, 500, `Impossible de mettre à jour le rappel : ${error.message}`);
        }
    }

    static async deleteRappel(rappelId) {
        try {
            const deletedRappel = await Rappel.findByIdAndDelete(rappelId);
            if (!deletedRappel) {
                throw new HttpError(null, 404, 'Rappel non trouvé');
            }
            return {
                success: true,
                message: "Rappel supprimé avec succès"
            };
        } catch (error) {
            throw new HttpError(error, 500, `Impossible de supprimer le rappel : ${error.message}`);
        }
    }
}

module.exports = RappelService;
