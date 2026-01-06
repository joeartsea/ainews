import { Hono } from 'hono'
import { renderer } from './renderer'
import Home from './pages/home'
import { Casts } from './api/casts'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => c.render(<Home />))

app.route('/casts', Casts)

export default app
