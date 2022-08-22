//jshint esversion:6
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Привет! Меня зовут Ашраф. Я живу мечтой стать разработчиком. Хочу в ближайшем будущем работать WEB разработчиком и прикладываю на это свои силы. Этот вэб-блог показывает мое стремление им стать! Здесь будут представлены мои работы и проекты, которыми я могу гордиться!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];
const port = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressLayouts);

// Set default layout for pages
app.set('layout', 'layout');

app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, postList : posts});
  
})

app.get("/about", (req, res) => {
  res.render("about", { aboutText: aboutContent });
})

app.get("/contact", (req, res) => {
  res.render("contact", { contactText : contactContent});
})

app.get("/compose", (req, res) => {
  res.render("compose")
  

})

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = {
    title: postTitle,
    body: postBody
  };
  posts.push(post);
  
  res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach((post) =>{
    const postTitle = _.lowerCase(post.title)

    if (requestedTitle === postTitle) {
      res.render("post", {postTitle : post.title, postBody : post.body})
    }
  })

})


app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
