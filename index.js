const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

const path = require("path");

const app = express();
const port = 5000;

//menggunakan template engine apa
app.set("view engine", "hbs");
//template engine ambil dari mana
app.set("views", path.join(__dirname, "src/views"));
//assets
app.use("/assets", express.static(path.join(__dirname, "/src/assets")));
//middleware, sebagai alat memproses imputan dari form
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(
  session({
    //nama session
    name: "data",
    //sandi
    secret: "secretpassword",
    // biar session datanya tidak disimpan kembali, diseting false biar data yg gak penting gak disimpen ulang
    resave: false,
    // ini untuk menyimpan datanya yg kita inisialisasi, kita true biar sesinya kita save
    saveUninitialized: true,
    cookie: {
      // keamanan karna kita jalaninnya di HTTP(lokal), bukan global (M1) atau HTTPS
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//route/alamat, panggil fungsi
app.get("/", home);
app.get("/register", registerView);
app.get("/login", loginView);

app.get("/testimonial", testimonialView);
app.get("/contact", contactView);

app.get("/addProject", addProjectView);
app.get("/projectDetail/:id", projectDetailView);
app.get("/updateProject/:id", updateProjectView);

app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

app.post("/addProject", addDataProject);
app.post("/updateProject", updateDataProject);
app.post("/deleteProject/:id", deleteDataProject);

// function
// res.render untuk merender halaman apa

async function home(req, res) {
  const isLogin = req.session.isLogin;
  console.log(isLogin);
  const user = req.session.user;

  const query = `SELECT *
  FROM "Projects"
  ORDER BY id DESC`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("index", { obj, isLogin, user });
}

function registerView(req, res) {
  res.render("registerForm");
}

function loginView(req, res) {
  res.render("loginForm");
}

function testimonialView(req, res) {
  res.render("testimonial");
}

function contactView(req, res) {
  res.render("contact");
}

function addProjectView(req, res) {
  res.render("addProject");
}

async function projectDetailView(req, res) {
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

async function updateProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT *
	FROM public."Projects"
	WHERE id='${id}';`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  const detail = obj[0];

  res.render("updateProject", { detail });
}

async function register(req, res) {
  const { name, email, password } = req.body;

  const query = `SELECT *
	FROM public."Users"
	WHERE email='${email}';`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (obj.length > 0) {
    req.flash("danger", "Register Failed: email has been registered");
    return res.redirect("/register");
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash("danger", "Register Failed: password failed to encrypt");
      return res.redirect("/register");
    }

    const query = `INSERT INTO public."Users"(name, email, password)
    VALUES ('${name}', '${email}', '${hash}');`;
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

    req.flash("success", "Register Success!");
    res.redirect("/login");
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const query = `SELECT *
	FROM public."Users"
	WHERE email='${email}';`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (obj.length == 0) {
    req.flash("danger", "Login Failed: email not registered");
    return res.redirect("/login");
  }

  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash("danger", "Login Failed: Internal Server Error");
      return res.redirect("/login");
    }

    if (!result) {
      req.flash("danger", "Login Failed: Password is wrong");
      return res.redirect("/login");
    }

    req.flash("success", "Login Success!");
    req.session.isLogin = true;
    req.session.user = {
      name: obj[0].name,
      email: obj[0].email,
    };

    res.redirect("/");
  });
}

async function addDataProject(req, res) {
  const { projectName, startDate, endDate, description, technologies, image } = req.body;

  const duration = durationTime(startDate, endDate);

  const query = `INSERT INTO public."Projects"(
    "projectName", description, "startDate", "endDate", technologies, image, duration)
    VALUES ('${projectName}', '${description}', '${startDate}', '${endDate}', '${technologies}', '${image}','${duration}');`;
  const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

async function updateDataProject(req, res) {
  const { projectName, startDate, endDate, description, technologies, image, id } = req.body;

  const duration = durationTime(startDate, endDate);

  const query = `UPDATE public."Projects"
	SET "projectName"='${projectName}', description='${description}', "startDate"='${startDate}', "endDate"='${endDate}', technologies='${technologies}', image='${image}', duration='${duration}'
	WHERE id=${id};`;
  const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

async function deleteDataProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
	WHERE id=${id};`;
  const obj = await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
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
