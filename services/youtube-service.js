const fetch = require('node-fetch');
const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = process.env.YOUTUBE_KEY;
const channelID = 'UCMq-1kxw85KCwgmiwuuP4iQ';

exports.fetchVideos = async () => {
    const url = baseUrl + `?part=snippet&channelId=${channelID}`
        + `&maxResults=10&order=date&type=video&key=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};
