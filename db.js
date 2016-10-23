var Sequelize = require('sequelize')
var sequelize = new Sequelize('mysql://hotel_IIS_db:4R7xZzIeIw@mysql57.websupport.sk:3311/hotel_IIS_db');
sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}, function(err) {
    console.log('Unable to connect to the database:', err);
});


var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.employees = sequelize.import(__dirname + '/models/employees.js');
db.guests = sequelize.import(__dirname + '/models/guests.js');
db.invoices = sequelize.import(__dirname + '/models/invoices.js');
db.stays = sequelize.import(__dirname + '/models/stays.js');
db.tokens = sequelize.import(__dirname + '/models/tokens.js');

db.rooms = sequelize.import(__dirname + '/models/rooms.js');
db.templateRooms = sequelize.import(__dirname + '/models/templateRooms.js');

db.services = sequelize.import(__dirname + '/models/services.js');
db.templateServices = sequelize.import(__dirname + '/models/templateServices.js');


db.employees.hasMany(db.stays);
db.stays.belongsTo(db.employees);

db.employees.hasMany(db.invoices);
db.invoices.belongsTo(db.employees);

db.stays.hasMany(db.invoices);
db.invoices.belongsTo(db.stays);

db.guests.hasMany(db.stays);
db.stays.belongsTo(db.guests);

db.stays.hasMany(db.rooms);
db.rooms.belongsTo(db.stays);

db.templateRooms.hasMany(db.rooms);
db.rooms.belongsTo(db.templateRooms);

db.employees.hasMany(db.services);
db.services.belongsTo(db.employees);

db.rooms.hasMany(db.services);
db.services.belongsTo(db.rooms);


db.templateServices.hasMany(db.services);
db.services.belongsTo(db.templateServices);








module.exports = db;
