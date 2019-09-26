var fs = require('fs');
var http = require('http');
var path = require('path');

//listen at port 3000
http.createServer(function (req, res) {

    console.log(`${req.method} request for ${req.url}`);

    if (req.url === '/') {
        fs.readFile('./public/index.html', "UTF-8", function (err, htmlFile) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(htmlFile);
        });

    }
    // CSS FILES
    else if (req.url.match(/.css$/)) {
        var cssPath = path.join(__dirname, 'public', req.url);
        //create a readable stream (text encoding UTF-8)
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });

        //pipe the readable stream to writable stream
        //res is writable stream
        fileStream.pipe(res);
    }
    // IMAGE FILES
    else if (req.url.match(/.jpg$/)) {
        var imgPath = path.join(__dirname, "public", req.url);
        //create a binary read stream (not UTF-8)
        var imgStream = fs.createReadStream(imgPath);

        res.writeHead(200, { "Content-Type": "image/jpeg" });
        //pipe the image read stream to the response write stream
        imgStream.pipe(res)
    }
    //FILE NOT FOUND
    else {
        //set the response header FORMAT: res.writeHead(statusCode,{headers});
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.end("404 File not found!");
    }
}).listen(3000);
console.log("File server started!");
