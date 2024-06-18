const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

const path = require("path");
const { type } = require("os");
const app = express();
const port = 5000;

const dataProject = [];
let id = 0;

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

async function home(req, res) {
  const query = `SELECT *
  FROM "Projects"
  ORDER BY id DESC`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log(obj);

  res.render("index", { dataProject: obj });
}

function addProject(req, res) {
  res.render("addProject");
}

async function updateProject(req, res) {
  const { id } = req.params;

  const query = `SELECT *
	FROM public."Projects"
	WHERE id='${id}';`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  const detail = obj[0];

  res.render("updateProject", { detail });
}

async function addData(req, res) {
  const { projectName, startDate, endDate, description, technologies, image } = req.body;

  const duration = durationTime(startDate, endDate);
  const query = `INSERT INTO public."Projects"(
    id, "projectName", description, "startDate", "endDate", technologies, image, duration)
    VALUES (${id}, '${projectName}', '${description}', '${startDate}', '${endDate}', '${technologies}', '${image}','${duration}');`;
  const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

  dataProject.unshift(obj);

  id = id + 1;

  res.redirect("/");
}

async function updateData(req, res) {
  const { projectName, startDate, endDate, description, technologies, image, id } = req.body;

  const duration = durationTime(startDate, endDate);

  const query = `UPDATE public."Projects"
	SET "projectName"='${projectName}', description='${description}', "startDate"='${startDate}', "endDate"='${endDate}', technologies='${technologies}', image='${image}', duration='${duration}'
	WHERE id=${id};`;
  const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

async function deleteData(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
	WHERE id=${id};`;
  const obj = await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT *
	FROM public."Projects"
	WHERE id='${id}';`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  const detail = obj[0];

  console.log(detail);

  console.log(detail.projectName);

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
