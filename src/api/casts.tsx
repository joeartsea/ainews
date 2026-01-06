import { Hono } from 'hono'
import { Bindings, News, Casts } from '../model'
import Items from '../components/items'
import Detail from '../components/detail'

interface CastsResult {
  results: Casts[]
}

interface NewsResult {
  results: News[]
}

const Casts = new Hono<{ Bindings: Bindings }>()

const getCast = async (db: any, date: string) => {
  return db.prepare(`SELECT * FROM casts WHERE created_at LIKE '${date}%'`).run() as CastsResult
}

const getCasts = async (db: any, start: number) => {
  return db.prepare(`SELECT * FROM casts ORDER BY created_at DESC LIMIT ${start}, 5`).run() as CastsResult
}

const getNews = async (db: any, startday: Date, endday: Date) => {
  const startdaybefore = new Date(startday.getFullYear(), startday.getMonth(), startday.getDate() - 1)
  return db.prepare(`SELECT * FROM news WHERE created_at BETWEEN ? AND ?`)
    .bind(startdaybefore.toISOString(), `${endday.toISOString().slice(0, 10)}T23:59:59`).run() as NewsResult
}

Casts.get('/', async (c) => {
  const start = 0
  const casts = await getCasts(c.env.DB, start)
  
  if (casts.results.length > 0) {
    const startday = new Date(casts.results[casts.results.length - 1].created_at)
    const endday = new Date(casts.results[0].created_at)
    const news = await getNews(c.env.DB, startday, endday)
    const next = start + 5

    return c.html(
      <main>
        <script src="https://ainews-2zm.pages.dev/static/js/accordion.js"></script>
        <div class="max-w-6xl mx-auto md:p-5 p-3">
          <Items casts={casts.results} news={news.results} start={start} next={next} />
        </div>
      </main>
    )
  } else {
    return c.html(<main class="p-5">No data available.</main>)
  }
})

Casts.get('/infinite', async (c) => {
  const data = c.req.queries()
  const start = Number(data.start) || 0
  const casts = await getCasts(c.env.DB, start)

  if (casts.results.length > 0) {
    const startday = new Date(casts.results[casts.results.length - 1].created_at)
    const endday = new Date(casts.results[0].created_at)
    const news = await getNews(c.env.DB, startday, endday)
    const next = start + 5

    return c.html(
      <Items casts={casts.results} news={news.results} start={start} next={next} />
    )
  } else {
    return c.html(<></>)
  }
})

Casts.get('/:date', async (c) => {
  const date = c.req.param('date')
  const casts = await getCast(c.env.DB, date)

  if (casts.results.length > 0) {
    const startday = new Date(casts.results[casts.results.length - 1].created_at)
    const endday = new Date(casts.results[0].created_at)
    const news = await getNews(c.env.DB, startday, endday)

    return c.render(
      <Detail cast={casts.results[0]} news={news.results} />
    )
  } else {
    return c.html(<></>)
  }
})

export { Casts }