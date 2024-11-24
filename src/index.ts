import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes, } from 'hono/dev'


import {langs} from "@routers/admin/langs"
import { Restaurants } from '@routers/admin/restaurants'

import Admin from '@routers/admin/log'
import { DatabaseError } from "pg"
import adminRouter from '@routers/admin/main'
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { serveStatic } from 'hono/bun'
const app = new Hono({});

const publicFolderPath = join(__dirname, '..', 'public');
const imgsFolderPath = join(publicFolderPath, 'imgs');
if (!existsSync(publicFolderPath)) {
  mkdirSync(publicFolderPath);
}

// Create the 'imgs' directory inside the 'public' directory if it doesn't exist
if (!existsSync(imgsFolderPath)) {
  mkdirSync(imgsFolderPath);
}

app.route('/admin', adminRouter);
app.route('/langs', langs);


app.use('/public/imgs/*', serveStatic({ root: imgsFolderPath }));



app.onError((err, c) => {
  // console.log(err.constructor.name)
  // console.log(err)
  if (err instanceof DatabaseError) {
    console.error(err.constraint)
  }
  console.error(err.stack,)
  return c.json({
    status: "error",
    message: err.message,
    code: err instanceof HTTPException ? err.status : 400,
    cause: err.cause
  }, err instanceof HTTPException ? err.status : 400)

})

showRoutes(app, {
  verbose: true,
})


export default {
  fetch: app.fetch,
  port: 3000
}