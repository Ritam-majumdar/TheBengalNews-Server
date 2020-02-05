// Create and Save a new Upload
exports.create = (req, res) => {

    res.status(200).json({message: req.files.uploads.path});
    console.log(req.files.uploads.path);

};