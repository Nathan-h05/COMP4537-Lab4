

exports.lab4_activate = (req, res) => {
    let q = url.parse(req.url, true);
    let paths = q.pathname.split('/').filter(Boolean).filter(p => !p.endsWith('.txt')); //retrieves all valid path names
    let path_specifier = paths[paths.length - 1];

    if(path_specifier == 'getDate') getDate_res(req, res);
    else if (path_specifier == 'writeFile') writeFile_res(req, res);
    else {
        //add if statements here that calls each function.
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(
            `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
                    <h1 style="color: red; text-align: center;">${msg.badReqMsg}</h1>
            </div>`
        );
        res.end();
    }   
}
