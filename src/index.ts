import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes, } from 'hono/dev'
import  langs from "@routers/langs"

import Admin from '@routers/admin/log'
import { DatabaseError } from "pg"
const app = new Hono({
  
});


app.get('/subdomin/*', (c) => c.text("hello sub   " + c.req.path));

app.get('/*', (c) => {
  console.log("-----------------------");
  throw new HTTPException(404, {
    message: c.req.url + " " + c.req.path, cause: {
      hello: "aa"
    }
  })
});





app.route('/admin', Admin)
app.route('/langs',langs);
app.onError((err, c) => {
  // console.log(err.constructor.name)
  // console.log(err)
  if (err instanceof DatabaseError) {
    console.error(err.constraint)
  }
  return c.json({
    status: "done",
    message: err.message,
    code: err instanceof HTTPException ? err.status : 400,
    cause: err.cause
  })
})

showRoutes(app, {
  verbose: true,
})


export default {
  
  fetch: app.fetch,

  port: 3000

}
