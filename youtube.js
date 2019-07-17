const fetch = require('node-fetch');
const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='
    + 'UCMq-1kxw85KCwgmiwuuP4iQ&maxResults=10&order=date&type=video&key='
    + `${process.env.youtubeKey}`;

module.exports = { 
    getYoutubeData: async function() {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
};