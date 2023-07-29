import corsProxy from "cors-anywhere"

const host = '0.0.0.0';
const port = 8080;

corsProxy.createServer({
  originWhitelist: [], 
}).listen(port, host, () => {
  console.log(`CORS proxy server listening on ${host}:${port}`);
});
