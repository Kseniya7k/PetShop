const noteRoutes = require('./animals_routes');
module.exports = function(app, client) {
    noteRoutes(app, client);
};