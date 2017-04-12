var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
         resp.writeHead(500, "Internal error occured", { "Content-Type": "text/html" });
         resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal error occured", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "error occured:" + err }));
    }
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    console.log('data',data);
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    
    resp.end();
};

exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};

exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request entity too large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request entity too large</body></html>");
    }
    else {
        resp.writeHead(413, "Request entity too large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request entity too large" }));
    }
    resp.end();
};

exports.send200 = function (req, resp) {
   
        resp.writeHead(200, { "Content-Type": "application/json"});
        resp.end();
};

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><head><title>Home</title></head><body>valid endpoints: <br> /books - GET - To List all Books<br>/books/id - GET - To search for a Book with id</body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            { url: "/books", operation: "GET", description: "To list all books" },
               { url: "/books/<id>", operation: "GET", description: "To search a book" },
        ]));
    }
    resp.end();
};