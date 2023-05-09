import { getExpressServer } from "./express"

async function main() {
  const app = getExpressServer()
  const port = process.env.API_SERVER_PORT || 8458;

  app.listen(port, () => console.log(`Server started. Node.js ${process.version}. Platform: ${process.platform} (${process.arch}). ProcessID: ${process.pid}. Port: ${port}\nhttp://localhost:${port}/api`));

  console.log(`Express listen on http://localhost:${port}/`)
}

main().catch(console.error)