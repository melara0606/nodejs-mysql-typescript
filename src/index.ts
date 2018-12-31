import Server from "./server/server";
import MySQL from './mysql/mysql';

const server = Server.init(3000)

server.start(( ) => {
  console.log('corriendo el puerto 3000')
})