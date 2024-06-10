const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = morgan("dev");
const data = require("./db.json");
const PORT = 8080;

app.use(logger);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.json({message : "welcome!"});
});

app.get("/people", (req, res) => {
    res.json(data);
});

app.get("/people/:personId", (req, res) => {
    const { personId } = req.params;

    const person = data.find(person => person.id === Number(personId));

    res.json(person ? person : {message : "there is no person with this id"});

    // if(person){
    //  res.json(person);
    // }
    // res.send("there is no person with this id");
});

app.get("/people/country/:country", (req, res) => {
    const { country } = req.params; 
    const personsByCountry = data.filter(person => person.country.toLowerCase() === country.toLowerCase());
    res.json(personsByCountry.length ? personsByCountry : { message : "there is no person from this country" });

});

app.get("/people/age/:age", (req, res) => {
    const { age } = req.params;
    const personsByAge = data.filter(person => person.age >= Number(age));
    res.json(personsByAge.length ? personsByAge : { message : "there is no person over this age"});
});

app.get("/people/profession/:profession", (req, res) => {
    const { profession } = req.params;
    const personsByProfession = data.filter(person => person.profession.toLowerCase().includes(profession.toLowerCase()));
    res.json(personsByProfession.length ? personsByProfession : { message : "there is no person with this profession"});
});