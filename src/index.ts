import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes } from 'hono/dev'

import { DatabaseError } from "pg"
import adminRouter from '@routers/admin/main'
import productRouter from '@routers/branch/product'
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { serveStatic } from 'hono/bun';
import branchRouter from '@routers/users/main'
import restaurantRouter from '@routers/restaurant/main'

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
app.route('/branch', branchRouter);
app.route('/product', productRouter);
app.route('/restrant/:restrant_id{[0-9]+}', restaurantRouter);



app.use('/public/imgs/*', serveStatic({
  root: '/public/imgs', rewriteRequestPath: p => {
    return p.replace(/^\/public\/imgs/, '');
  }
}));



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



export default {
  fetch: app.fetch,
  port: 3000
}