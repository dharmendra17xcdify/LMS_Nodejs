var sql = require("mssql");
var settings = require("../settings");

exports.executeSql = function (query, callback) {
    
    sql.close();
    sql.connect(settings.dbConfig).then(function (pool) {
        console.log('in' , query)
        return pool.request()
        .query(query)
    })
    .then(function (result) {
        sql.close();
         
        console.log(result)
        callback(null,result.recordset);
    })
    .catch(function (err) {
        sql.close();
        console.log(err)
        callback(err, null);
    })
    
    sql.on('error', function(err){
        return err;
    });
   
};