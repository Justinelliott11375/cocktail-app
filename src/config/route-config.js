module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");        
        const listRoutes = require("../routes/lists");
        const cardRoutes = require("../routes/cards");       

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(listRoutes);
        app.use(cardRoutes);
    }
}