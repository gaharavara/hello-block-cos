const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{

// Parses the url requested and stores it in parsed_url     
var parsed_url = url.parse(req.url, true);

// This is the most basic approach and is not much effective for bigger operations
/*
    if (req.url === '/') {
        fs.readFile(path.join(__dirname,'public','index.html'), (err, content)=>{
                if (err) throw err;
                res.writeHead(200, { 'Content-Type':'text/html'});
                res.end(content);
            }
        );
    }

    if (req.url === '/api/users') {
        const users = [
            { name: 'Abhi', age: 19},
            { name: 'kushal', age: 21}
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
*/

    // Build file path
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );
    
    // Pathname to take queries like /transact?coins=10
    if (parsed_url.pathname === '/transact') {
        console.log("inside transact");
        fs.readFile(path.join(__dirname,'public','transact.html'), (err, content)=>{
                if (err) throw err;
                var data = parsed_url.query.coins;
                console.log(data);
                res.writeHead(200, { 'Content-Type':'text/html'});
                res.end(content);
            }
        );
    }

    // Extension of the file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;                    

    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname,'public','404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.end(content, 'utf8');

                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }

    });

});

// Takes the port assigned to the enviornment path variable or else 7000 if it is free
const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));