import Mysql, { MysqlError } from 'mysql'

export default class MySQL {
  private static _instance:MySQL
  public conn:Mysql.Connection
  public conectado:Boolean = false

  constructor() {
    this.conn = Mysql.createConnection({
      host      : 'localhost',
      user      : 'root',
      password  : '',
      database  : 'node-dev'
    })
    this.conectar()
  }

  public static escape (id:any) {
    return this.instance.conn.escape(id)
  }

  public static get instance () {
    return this._instance || ( this._instance = new this() )
  }

  public static executeQuery(query:string, callback:Function) {
    this.instance.conn.query(query, (err : Mysql.MysqlError, results : Object[], fields) => {
      if(err){
        return callback({
          err: err,
          ok: false
        })
      }

      if(results.length === 0 ){
        return callback({
          err: { message: 'No se a encontrado registro en la base de datos' },
          ok: false
        })
      }else{
        return callback({ ok: true, results })
      }
    })
  }

  private conectar () {
    this.conn.connect ((err : Mysql.MysqlError) => {
      if(err) {
        console.log(err.message)
        return
      }
      this.conectado = true
      console.log('Base de datos online!')
    })
  }
}