import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router()

router.get('/heroes/:id', (req:Request, res:Response) => {
  let id = MySQL.escape(req.params.id)
  MySQL.executeQuery(`SELECT * from heroes WHERE ID = ${id}`, (response:any) => {
    if(response.ok) {
      res.json({
        ok: true,
        heroe: response.results[0]
      }) 
    }else{
      res.json({
        ok: false,
        heroe: response.err
      })
    }
  })
})

export default router