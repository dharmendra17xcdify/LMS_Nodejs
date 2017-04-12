var http = require("http");
var book = require("../controllers/book");
var settings = require("../settings");
var httpMsgs = require("./httpMsgs")

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === "/books") {
               return book.getList(req, resp);
            }
            else {
                var idPatt = "[0-9]+";
                var patt = new RegExp("/books/" + idPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(idPatt);
                    var id = patt.exec(req.url);
                    return book.get(req, resp, id);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            break;
        case "POST":
            if (req.url === "/books") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) // 10MB
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () { 
                    book.add(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp); 
            }
            break;
        case "PUT":
            if (req.url === "/books") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) // 10MB
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                
                req.on("end", function () {
                    book.update(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/books") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) // 10MB
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                
                req.on("end", function () {
                    book.delete(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    } 

}).listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});