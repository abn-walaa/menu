import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes, } from 'hono/dev'
import langs from "@routers/langs"

import Admin from '@routers/admin/log'
import { DatabaseError } from "pg"
import adminRouter from '@routers/admin/main'
const app = new Hono({})

app.route('/admin', adminRouter)
app.route('/langs', langs);
app.onError((err, c) => {
  // console.log(err.constructor.name)
  // console.log(err)
  if (err instanceof DatabaseError) {
    console.error(err.constraint)
  }
  console.error(err.stack,)
  return c.json({
    status: "done",
    message: err.message,
    code: err instanceof HTTPException ? err.status : 400,
    cause: err.cause
  },err instanceof HTTPException ? err.status : 400)

})

showRoutes(app, {
  verbose: true,
})


export default {

  fetch: app.fetch,

  port: 3000

}