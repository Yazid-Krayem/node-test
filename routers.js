const fs = require('fs');

const requestHandler = (req,res ) => {
    const url = req.url;
    const method = req.method; 
    if(url === '/'){
        res.write('<html>')
        res.write('<title>back-end test</title>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body>')
        res.write('</html>')
            return res.end();
    }
        //you can't execute method === "POST" without req.method
    if(url === '/message' && method === 'POST'){ 
            //(on) is lisnter for data
            const body = [];
            res.on('data', chunk => {
                console.log(chunk);
                body.push(chunk);
            });
            //(on) is lisnter for end and buffer it
            res.on('end', ()=>{
                const parseBody = Buffer.concat(body).toString();
                const message = parseBody.split('=')[1];
                fs.writeFile('message.txt', err =>{
                    res.statusCode =302;
                    res.setHeader('Location', '/');
                    return res.end();

                });
                
            });
           
    }

// respone method
    res.setHeader('Content-Type', 'text/html');
  // HTML 
    res.write('<html>')
    res.write('<title>first server</title>')
    res.write('<body><h1>server</h1></body>')
    res.write('</html>')
   // end every thing 
   // you can't write after this code
    res.end();





// to shut the server down
//process.exit();
}
    
//export
    module.exports = requestHandler;