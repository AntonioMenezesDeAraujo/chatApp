const Favorite = require('../models/Favorite');

class FavoriteController {
    async store(req, res) {
        const favorite = await Favorite.create(req.body);
        return res.json(favorite);
    }

}

module.exports = new FavoriteController();