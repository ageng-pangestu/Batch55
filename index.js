const express = require("express");
const app = express();
const port = 5000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("Hello my name Ageng");
});

app.get("/testimonials", (req, res) => {
  res.json([
    {
      author: "Ageng Pangestu",
      content: "Adelnya grad!",
      image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
    },
    {
      author: "Novri",
      content: "Keren banget!",
      image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
    },
    {
      author: "Denis",
      content: "Apasih bang!",
      image: "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 1,
    },
    {
      author: "Febry",
      content: "Oke deh!",
      image: "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4,
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server berjalan pada ${port}`);
});
