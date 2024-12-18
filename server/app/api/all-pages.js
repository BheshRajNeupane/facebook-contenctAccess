const app = require("../app");
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