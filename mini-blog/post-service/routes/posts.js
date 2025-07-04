const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send({ message: 'Post created' });
});

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// router.post('/', async (req, res) => {
//     const post = new Post(req.body);
//     await post.save();
  
//     await producer.send({
//       topic: 'post_created',
//       messages: [
//         { value: JSON.stringify(post) },
//       ],
//     });
  
//     res.send({ message: 'Post created & event sent to Kafka' });
//   });
  

module.exports = router;