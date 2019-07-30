const { readFileSync } = require('fs');
const BlogPost = require('../models/BlogPost');

exports.getPosts = async () => {
    let posts = await BlogPost.find().sort({ date: -1 });
    return posts;
}

exports.getPostById = async id => {
    const post = await BlogPost.find({ id });
    post.content = readFileSync(post.content);
    return post;
}

exports.createPost = async (title, content, image) => {
    const id = Math.round(Math.random() * 100);
    new BlogPost({ id, title, content, image }).save();
};

