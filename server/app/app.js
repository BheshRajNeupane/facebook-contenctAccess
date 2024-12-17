const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();


app.use(cors())

app.get('/all-pages',  async (req, res)=>{
  try {
 console.log("page");
 
  
  if (!process.env.META_URL || !process.env.Palm_mind_dev_Access_Token) {
    return res.status(500).json({ error: "Missing META_URL or Access Token" });
  }
    const allPages = await axios.get(`${process.env.META_URL}/me/accounts`,{
        params:{
            access_token:process.env.Palm_mind_dev_Access_Token
        }
    })
 

     res.json(allPages.data)
    
  } catch (error) {
    console.log(error.message);
    
  }
});


app.get('/posts/:postId', async (req, res) => {
    try {
    
      const postId = req.params.postId; 
      const token = req.query.token; 
  
     
      const post = await axios.get(
        `${process.env.META_URL}/${process.env.GRAPH_VERSION}/${postId}/posts`,
        {
          params: {
            access_token: token, 
            fields: 'id,message', 
          },
        }
      );
  
    
      res.json(post.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });
  




app.get('/:postId/comments', async (req, res) => {
    try {
    
      const postId = req.params.postId; 
      const token = req.query.token; 
  
     
      const comments = await axios.get(
        `${process.env.META_URL}/${process.env.GRAPH_VERSION}/${postId}/comments`,
        {
          params: {
            access_token: token, 
            fields: 'id,message', 
            limit:2
          },
        }
      );
  
    
      res.json(comments.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });
  




  app.listen(3000, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,\n  App is listening on port 3000")
    else 
        console.log("Error occurred, server can't start", error);
    }
);