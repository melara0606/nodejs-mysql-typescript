import { Router, Request, Response }  from 'express'
import MySQL from '../mysql/mysql';

const router = Router()
router.get('/heroes', (req: Request, res:Response) => {
  MySQL.executeQuery(`SELECT * from heroes`, (response:any) => {
    if(response.ok) {
      res.json({
        ok: true,
        heroes: response.results
      }) 
    }else{
      res.json({
        ok: false,
        heroes: response.err
      })
    }
  })
})

export default router