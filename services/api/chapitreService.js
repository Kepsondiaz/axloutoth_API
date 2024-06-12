const Chapitre = require("../../models/ChapitreModel");
const { HttpError } = require('../../utils/exceptions');
const Matiere = require("../../models/MatiereModel");
const { getCurrentUser } = require('../auth/authService');

class ChapitreService {

    static async createChapitre(matiereId, chapitreId, fileData, intitule) {
        try {
            // Vérifiez d'abord si le fichier a été téléchargé avec succès
            if (!fileData || !fileData.filename || !fileData.path) {
                throw new Error('Aucun fichier téléchargé ou données de fichier manquantes');
            }

            // Obtenez l'utilisateur actuel à l'aide de la fonction getCurrentUser
            const currentUser = await getCurrentUser(); // Cette fonction doit retourner l'utilisateur actuellement connecté

            // Obtenez le chapitre associé à l'ID du chapitre
            const chapitre = await Chapitre.findById(chapitreId);
            if (!chapitre) {
                throw new Error('Chapitre non trouvé');
            }

            // Obtenez la matière associée à l'ID de la matière
            const matiere = await Matiere.findById(matiereId);
            if (!matiere) {
                throw new Error('Matière non trouvée');
            }

            // Vérifiez le type de matière pour déterminer les extensions de fichier autorisées
            let allowedExtensions = [];
            if (['mathematique', 'physique', 'chimie', 'SVT'].includes(matiere.intitule)) {
                allowedExtensions = ['pdf', 'text'];
            } else if (['français', 'philosophie'].includes(matiere.intitule)) {
                allowedExtensions = ['pdf', 'audio'];
            } else {
                throw new Error('Type de matière non reconnu');
            }

            // Vérifiez si l'extension du fichier téléchargé est autorisée
            const fileExtension = fileData.filename.split('.').pop();
            if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                throw new Error(`L'extension de fichier ${fileExtension} n'est pas autorisée pour cette matière`);
            }

            // Vous pouvez maintenant utiliser les données de fileData pour enregistrer le fichier où vous le souhaitez
            // Par exemple, vous pouvez enregistrer le nom de fichier et son chemin dans la base de données
            const fileName = intitule ? intitule + '.' + fileExtension : fileData.filename; // Vérifiez si un nouveau nom de fichier a été spécifié
            const filePath = fileData.path;

            // Mettez à jour le chapitre avec les informations sur le fichier téléchargé
            chapitre.fileName = fileName;
            chapitre.filePath = filePath;
            chapitre.user_id = currentUser._id; // Assurez-vous de mettre à jour l'ID de l'utilisateur pour le chapitre

            // Enregistrez les modifications apportées au chapitre dans la base de données
            await chapitre.save();

            // Retournez le chapitre mis à jour avec les informations sur le fichier téléchargé
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async getAllChapitres() {
        try {
            return await Chapitre.find();
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    


    /*
    static async createChapitre(matiereId, chapitreData) {
        try {
            // Ajouter l'ID de la matière dans les données du chapitre
            chapitreData.matiere = matiereId;

            // Créer le chapitre avec les données fournies
            const chapitre = await Chapitre.create(chapitreData);

            // Mettre à jour la matière avec l'ID du nouveau chapitre
            await Matiere.findByIdAndUpdate(matiereId, { $push: { chapitres: chapitre._id } });

            // Retourner le chapitre créé
            return chapitre;
        } catch (error) {
            throw new HttpError(error, 400, error.message);
        }
    }


    static async getAllChapitres() {
        try {
            return await Chapitre.find();
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async getChapitreById(chapitreId) {
        try {
            const chapitre = await Chapitre.findById(chapitreId);

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async updateChapitre(chapitreId, updatedChapitreData) {
        try {
            const chapitre = await Chapitre.findByIdAndUpdate(chapitreId, updatedChapitreData, { new: true });

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async deleteChapitre(chapitreId) {
        try {
            const chapitre = await Chapitre.findByIdAndDelete(chapitreId);

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            await Matiere.updateMany({}, { $pull: { chapitres: chapitreId } });
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async searchChapitres(query) {
        try {
            return await Chapitre.find({
                intitule: { $regex: query, $options: 'i' }, // Recherche insensible à la casse
                isDelete: false
            });
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }
    
    */
}

module.exports = ChapitreService;
