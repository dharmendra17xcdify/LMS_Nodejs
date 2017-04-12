var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp) {
    
    db.executeSql("SELECT * FROM Books", function (err, data) {
        console.log('getList',data);
        if (err) {
            httpMsgs.show500(req, resp, err);             
        }
        else {
            httpMsgs.sendJson(req, resp, data);           
        } 
    });
};

exports.get = function (req, resp, ID) {
    db.executeSql("SELECT * FROM Books WHERE id = " + ID, function (err, data) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO Books ( Title, Author, Edition) VALUES ";
            sql += util.format("( '%s', '%s', '%s')",  data.Title, data.Author, data.Edition);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.update = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            
            if (!data.ID ) throw new Error("Book id not provided");

            var sql = "UPDATE Books SET ";
            
            var isDataProvided = false;
            if (data.Title) {
                sql += "Title = '" + data.Title + "',";
                isDataProvided = true;
            }
            if (data.Author) {
                sql += "Author = '" + data.Author + "',";
                isDataProvided = true;
            }
            if (data.Edition) {
                sql += "Edition = '" + data.Edition + "',";
                isDataProvided = true;
            }
            sql = sql.slice(0, -1); //remove last comma
            sql += "WHERE ID = " + data.ID;
                       
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            
            if (!data.ID) throw new Error("Book id not provided");
            
           var sql = "DELETE FROM Books "
           
            sql += "WHERE ID = " + data.ID;
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};