const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country, Activity } = require("../db.js")
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/countries", async (req,res) => {
    //await apiToDB();
    const paises = await Country.findAll({
        include:{
            model: Activity, 
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes:[]
            }}});
    const { name } = req.query;
    if (name) {
        let filtrado = await paises.filter( a => a.name.toLowerCase().includes(name.toLowerCase()));
        filtrado.length? res.json(filtrado) : res.status(404).send("No existe el país") ;
    } else res.json(paises);
})

router.get("/countries/:idPais", async (req,res) => {
    const {idPais} = req.params;
    const paises = await Country.findAll({
        include:{
            model: Activity, 
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes:[]
            }}});
    const filtrado = await paises.filter( p => p.id === idPais);
    filtrado.length? res.json(filtrado) : res.status(404).send("No existen paises con el ID ingresado");
})

router.post("/activities", async (req,res,next) => {
    const { name, difficulty, duration, season, country } = req.body;
    try {
        if( !name || !difficulty || !duration || !season || !country) return res.status(404).send("Faltan datos");
        const actCreada = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })
        const paisDb = await Country.findAll({
            where: { name: country}
        });
        actCreada.addCountry(paisDb);
        res.send("Actividad creada con éxito");
    } catch (error) {
        res.status(404).send("No se pudo crear la actividad");
    }
})

router.get("/activities", async (req,res) => {
    try {
        const activities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ["name"],
                through: {
                    attributes:[]
                }
            }
        });
        res.json(activities)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;
