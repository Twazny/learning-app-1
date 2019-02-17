module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: 'true'
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    })
}