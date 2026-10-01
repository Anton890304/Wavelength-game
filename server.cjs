const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  const allowed = ['index.html','styles.css','app.js','rules.js','sw.js','manifest.webmanifest','icon.svg'];
  if (!allowed.includes(path.relative(root,file))) {res.writeHead(404);return res.end('Not found');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain','Cache-Control':'no-cache'});res.end(data);});
}).listen(process.env.PORT||4173,'0.0.0.0',()=>console.log('Игра: http://localhost:'+(process.env.PORT||4173)));
