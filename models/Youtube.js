const fetch = require('node-fetch');

module.exports = class Youtube {

    static async getData(channelID, apiKey) {
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='
        + channelID + '&maxResults=10&order=date&type=video&key=' + apiKey;
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch(error) {
            throw error;
        }
    }

    static getAPIKey() {
        return process.env.YOUTUBE_KEY;
    }

};
