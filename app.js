const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = morgan("dev");

app.use(logger);

const data = require("./db.json");
const PORT = 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the / route!",
  });
});

app.get("/people", (req, res) => {
  res.json(data);
});

app.get("/people/:personId", (req, res) => {
  const { personId } = req.params;
  const person = data.find((person) => person.id === Number(personId));
  if (!person) {
    res.json({
      message: "Person not found :(",
    });
  }

  res.json(person);
});

app.get("/people/country/:country", (req, res) => {
  const { country } = req.params;
  const peopleFromCountry = data.filter(
    (selectedCountry) =>
      selectedCountry.country.toLowerCase() === country.toLowerCase()
  );

  if (!peopleFromCountry.length) {
    res.json({
      message: "Country not found",
    });
  }

  res.json(peopleFromCountry);
});

app.get("/people/age/:age", (req, res) => {
  const { age } = req.params;
  const peopleByAge = data.filter((person) => person.age >= Number(age));

  if (!peopleByAge.length) {
    res.json({
      message: "Age not found",
    });
  }

  res.json(peopleByAge);
});

app.get("/people/profession/:profession", (req, res) => {
  const { profession } = req.params;
  const peopleOfProfession = data.filter(
    (person) => person.profession.toLowerCase() === profession.toLowerCase()
  );

  if (!peopleOfProfession.length) {
    res.json({
      message: "Profession not found",
    });
  }

  res.json(peopleOfProfession);
});

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on http://localhost:${PORT}`);
});
