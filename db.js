const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log2',
'postgres', 'Letmein1234!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log ("Connected to workout-log2 postgres database");
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;
