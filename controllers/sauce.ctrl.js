const Sauce = require('../models/sauce.models');
const middlewareSauce = require('../middleware/sauce.middleware')

exports.findAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
} 
exports.createSauce = (req, res, next) => {
    middlewareSauce.create(req)
    .then((sauce) => sauce.save())
    .then(() => res.status(201).json({ message: "Objet crée !"}))
    .catch(error => res.status(400).json({ message: error}))
}
exports.findByIdSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json( sauces))
        .catch(err => res.status(400).json({ message : err }))
}
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: "Sauce modifié !"}))
    .catch(error => res.status(400).json({ error }))
}
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(err => res.status(400).json({ err }))
}
exports.likeSauce = (req,res,next) => {
    if(req.body.like === 1){
        
        Sauce.updateOne(
            { _id: req.params.id},
            {  $inc: { "likes": +1},
              $push: { "usersLiked" : req.body.userId}
        })
        .then(() => res.status(200).json({message: "Sauce like"}))
        .catch(error => res.status(400).json({ error }))
    } else if(req.body.like === 0) {

        Sauce.findOne( { _id: req.params.id})
        .then(sauce => {
            
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne(
                    { _id: req.params.id},
                    {  $inc: { "likes": -1},
                      $pull: { "usersLiked" : req.body.userId}
                })
                .then(() => res.status(200).json({message: "like supprimé"}))
                .catch(error => res.status(400).json({ error }))
            } else {
                Sauce.updateOne(
                    { _id: req.params.id},
                    {  $inc: { "dislikes": -1},
                      $pull: { "usersDisliked" : req.body.userId}
                })
                .then(() => res.status(200).json({message: "Dislike supprimé"}))
                .catch(error => res.status(400).json({ error }))
            }})

        .catch(err => console.log(err))

        } else {
        Sauce.updateOne(
            { _id: req.params.id},
            {  $inc: { "dislikes": +1},
              $push: { "usersDisliked" : req.body.userId}
        })
        .then(() => res.status(200).json({message: "Sauce dislike"}))
        .catch(error => res.status(400).json({ error }))
    }
}
