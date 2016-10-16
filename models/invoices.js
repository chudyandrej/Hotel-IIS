module.exports = function(sequelize, DataTypes) {
    return sequelize.define('invoices', {
        kindOfPaymant: {
            type: DataTypes.ENUM('cash', 'byCard', 'bankAccount'),
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        }
    });
};
