module.exports = function(sequelize, DataTypes) {
    return sequelize.define('invoices', {
        kind_payment: {
            type: DataTypes.ENUM('cash', 'byCard', 'bankAccount'),
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        }
    });
};
