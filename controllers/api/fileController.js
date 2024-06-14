const FileModel = require("../../models/FileModel");
const { ObjectId } = require("mongodb");
const Matiere = require("../../models/MatiereModel");

module.exports.getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find().select("-password");
    return res.status(200).json({ files });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.getOneFile = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown");
  try {
    const file = await FileModel.findById({ _id: req.params.id });
    return res.status(200).json({ file });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.addOneFile = async (req, res) => {
  // if (
  //   !ObjectId.isValid(req.params.id_matiere) &&
  //   !(await Matiere.exists({ _id: req.params.id_matiere }))
  // )
  //   return res.status(400).send("ID unknown");
  const { date, file } = req.body;
  console.log(date, file);
  try {
    console.log(req.file); // Ajoutez ce log pour vérifier que req.file est défini

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const file = await FileModel.create({
      date,
      size: req.file.size,
      filepath: `${req.protocol}://${process.env.HOST}:${process.env.PORT}/api/v1/file/${req.file.originalname}`,
    });

    const matiere = await Matiere.findOneAndUpdate(
      { _id: req.params.id_matiere },
      {
        $push: {
          files: file._id,
        },
      },
      { new: true } // Pour retourner le document mis à jour
    );
    res.status(200).json({ file: file, matiere: matiere });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.updateFile = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown");

  try {
    const file = await FileModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          date: req.body.date,
        },
      }
    );
    res.status(200).json({ file });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteFile = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown");

  try {
    await FileModel.remove({ _id: req.params.id }).exec();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
