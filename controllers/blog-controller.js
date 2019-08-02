const BlogPost = require('../models/BlogPost');
const { readFileSync, writeFile } = require('fs');
const { join } = require('path');

exports.getPosts = async (req, res) => {
    const posts = await BlogPost.find().sort({ date: -1 });
    return res.json(posts);
}

exports.getPostById = async (req, res) => {
    const post = await BlogPost.findOne({ id: req.params.id });
    post.content = readFileSync(post.content);
    return res.render('post', { post });
}

exports.createPost = async (req, res) => {
    const imageName = req.file.filename.split('.')[0];
    const contentPath = join('uploads', `${imageName}.txt`);
    try {
        writeFile(contentPath, req.body.content, error => {
            if (error) throw error;
            new BlogPost({ 
                id: Math.round(Math.random() * 100), 
                title: req.body.title, 
                content: contentPath, 
                image: req.file.path
            }).save();
        });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
    return res.redirect('/');
};
