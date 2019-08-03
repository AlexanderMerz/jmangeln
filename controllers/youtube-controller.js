const Youtube = require('../models/Youtube');

exports.getData = async (req, res) => {
    let data = null;
    try {
        data = await Youtube.getData(
            'UCMq-1kxw85KCwgmiwuuP4iQ',
            Youtube.getAPIKey()
        );
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json([{ error }]);
    }
};
