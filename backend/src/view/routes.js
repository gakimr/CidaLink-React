// switch das rotas
const Routes = require("express");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes");
const updateRoutes = require("./updateRoutes");
const occurrencesRoutes = require("./occurrencesRoutes");
const bairrosRoutes = require("./bairrosRoutes");
const logradourosRoutes = require("./logradourosRoutes");



const routes = Routes() ;

routes.use( usersRoutes);
routes.use ("/auth", authRoutes);
routes.use ("/profile",updateRoutes);
routes.use (occurrencesRoutes);
routes.use (bairrosRoutes);
routes.use (logradourosRoutes);


routes.get("/test", (req,res) => { 
    //codigo
    res.status(206).json( { "message":"servidor Rodando ..."} );

} );


module.exports = routes;