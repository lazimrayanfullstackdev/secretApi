// HINTS:
// 1. Import express and axios
import express from "express";
import ejs from "ejs";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const Api_Url = "https://secrets-api.appbrewery.com/random";
// 3. Use the public folder for static files.
app.set("view engine","ejs");
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req,res) => {
    try{
    const response = await axios.get(Api_Url);
    const Secret = JSON.stringify(response.data.secret);
    const User = JSON.stringify(response.data.username);
    res.render("index.ejs", {secret: Secret, user:User});
    }catch(error){
        res.render("index.ejs", {secret: error.response.data});
    }
})
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`);
})
// 6. Listen on your predefined port and start the server.
