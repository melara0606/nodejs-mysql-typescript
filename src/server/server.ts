import fs = require('fs')
import path = require('path')
import express = require('express')

export default class Server {
  public app:express.Application
  public port:number

  constructor (puerto:number){
    this.port = puerto
    this.app = express()
  }

  private publicStaticFolder () {
    const publicFolder = path.resolve(__dirname, '../public')
    this.app.use(express.static( publicFolder ))
  }
  static init ( puerto:number ) {
    return new Server(puerto)
  }

  private routers () {
    let routePath = path.join(__dirname, '../routers')
    fs.readdirSync(routePath).forEach((element) => {
      const router = require(`${ routePath }/${ element }`)
      this.app.use( router.default )
    })
  }

  start( callback:Function ) {
    this.app.listen(this.port, callback)
    this.publicStaticFolder()
    this.routers()
  }
}