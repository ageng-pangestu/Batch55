const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const dataProject = [];

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

//menggunakan template engine apa
app.set("view engine", "hbs");
//template engine ambil dari mana
app.set("views", path.join(__dirname, "src/views"));
//assets
app.use("/assets", express.static(path.join(__dirname, "/src/assets")));
//middleware, sebagai alat memproses imputan dari form
app.use(express.urlencoded({ extended: false }));

//route/alamat, panggil fungsi
app.get("/", home);
app.get("/addProject", addProject);
app.get("/updateProject/:id", updateProject);
app.post("/addProject", addData);
app.post("/updateProject", updateData);
app.post("/deleteProject/:id", deleteData);
app.get("/projectDetail/:id", projectDetail);
app.get("/testimonial", testimonial);
app.get("/contact", contact);

// function
// res.render untuk merender halaman apa

function home(req, res) {
  res.render("index", { dataProject });
}

function addProject(req, res) {
  res.render("addProject");
}

function updateProject(req, res) {
  const { id } = req.params;

  dataProject[id].id = id;
  const detail = dataProject[id];

  res.render("updateProject", { detail });
}

function addData(req, res) {
  const { projectName, startDate, endDate, description, technologies, image, id } = req.body;

  const duration = durationTime(startDate, endDate);
  const data = { projectName, startDate, endDate, duration, description, technologies, image, id };

  dataProject.unshift(data);

  res.redirect("/");
}

function updateData(req, res) {
  const { projectName, startDate, endDate, description, technologies, image, id } = req.body;

  const duration = durationTime(startDate, endDate);

  // const dataUpdate = { projectName, startDate, endDate, duration, description, technologies, image, id };

  dataProject[parseInt(id)] = { projectName, startDate, endDate, duration, description, technologies, image, id };

  res.redirect("/");
}

function deleteData(req, res) {
  const { id } = req.params;

  dataProject.splice(id, 1);

  res.redirect("/");
}

function projectDetail(req, res) {
  const { id } = req.params;

  const detail = dataProject[id];

  res.render("projectDetail", { detail });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}

function durationTime(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const duration = endDate - startDate;

  const durationDays = Math.floor(duration / 1000 / 60 / 60 / 24);
  const durationMonth = Math.floor(duration / 1000 / 60 / 60 / 24 / 30);

  if (durationMonth < 1) {
    return "Durasi: " + durationDays + " hari";
  } else {
    return "Durasi: " + durationMonth + " bulan";
  }
}

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
