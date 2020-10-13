db = require("../../utils/db/index");
module.exports = {
    inserts: (table, obj, callback) => {
        return db.mysql.query("INSERT INTO " + table + "  VALUES ?", obj, callback);
    },
    insert: (table, obj, callback) => {
        return db.mysql.query("INSERT INTO " + table + "  SET ?", obj, callback);
    },
    selectChoixLike: (cherche, table, where, obj, callback) => {
        return db.mysql.query("SELECT " + cherche + " FROM " + table + " WHERE " + where + " LIKE ? ", obj, callback);
    },
    select: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ? ", obj, callback);
    },
    select3: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ?? = ? OR ?? = ? OR ?? = ?", obj, callback);
    },
    select2: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ?? = ? OR ?? = ?", obj, callback);
    },
    select1: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ?? = ?", obj, callback);
    },
    select4between: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ?? = ? AND ?? BETWEEN ? AND ? AND ?? = ? AND ?? = ?", obj, callback);
    },
    select5: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ? AND ?? = ? ORDER BY dateC DESC", obj, callback);
    },
    selectAll: (table, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table, obj, callback);
    },
    selectLike: (table, where, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE " + where + " LIKE ?", obj, callback);
    },
    selectWhereIN: (table, where, obj, callback) => {
        return db.mysql.query("SELECT * FROM " + table + " WHERE " + where + "  IN (?)", obj, callback);
    },
    update: (table, where, obj, callback) => {
        return db.mysql.query("UPDATE " + table + " SET ? WHERE " + where, obj, callback);
    }
};