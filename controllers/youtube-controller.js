const Youtube = require('../models/Youtube');

exports.getData = async (req, res) => {
    try {
        const data = await Youtube.getData('UCMq-1kxw85KCwgmiwuuP4iQ');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).send(error);
    }
};
