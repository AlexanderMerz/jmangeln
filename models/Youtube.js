const fetch = require('node-fetch');
const baseUrl = 'https://www.googleapis.com/youtube/v3/search';

module.exports = class Youtube {

    static async getData(channelID) {
        const url = baseUrl + `?part=snippet&channelId=${channelID}`
            + `&maxResults=10&order=date&type=video&key=${Youtube.getAPIKey()}`;
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
