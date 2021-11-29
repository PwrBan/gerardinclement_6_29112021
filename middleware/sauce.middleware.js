const Sauce = require('../models/sauce.models');


exports.create = async (req) => {
    const sauceObject = JSON.parse(req.body.sauce);
    return new Sauce(
        {
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
}