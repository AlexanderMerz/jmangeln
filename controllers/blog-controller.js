const BlogPost = require('../models/BlogPost');
const { readFileSync, writeFile } = require('fs');
const { join } = require('path');

exports.getPosts = async (req, res) => 

    /*
     * const posts = await BlogPost.find().sort({ date: -1 });
     * return res.json(posts);
     */
     res.json([]);


exports.getPostById = async (req, res) => 

    /*
     * const post = await BlogPost.findOne({ id: req.params.id });
     * try {
     *     post.content = readFileSync(post.content);
     * } catch (error) {
     *     return res.redirect('/');
     * }
     * return res.render('post', { post });
     */
     res.redirect('/');


exports.createPost = async (req, res) => 

    /*
     * console.log(req.file);
     * const imageName = req.file.filename.split('.')[0];
     * const contentPath = join('uploads', `${imageName}.txt`);
     * try {
     *     writeFile(contentPath, req.body.content, error => {
     *         if (error) throw error;
     *         uploader.upload(req.file.path, (error, result) => {
     *             console.log(result, error);
     *         });
     *     });
     * } catch (error) {
     *     console.log(error);
     * }
     */
     res.redirect('/');

