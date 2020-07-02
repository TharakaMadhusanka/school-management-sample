'use strict'
var context = require('../repository/context');

exports.ExecuteQuery = (query) => {
    return new Promise((resolve, reject) => {
        context.query(query, (error, res) => {
            if (error) {
                context.rollback();
                return reject(error);
            }
            context.commit();
            return resolve(res);
        })
    });
}