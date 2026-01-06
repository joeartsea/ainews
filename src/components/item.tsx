import type { FC } from 'hono/jsx'
import { News } from '../model'

const Item: FC = ({ news, daybefore }) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 pb-5 px-5 gap-5 md:pb-7 md:px-7 md:gap-7">
    {news.map((item: News) => {
      if (daybefore.toISOString().slice(0, 10) === item.created_at.split('T')[0]) {
        return (
          <a href={item.href} target="_blank">
            <article class="bg-gray-100 flex flex-col rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:bg-slate-200 transition-all duration-200 ease-out">
              <img loading="lazy" src={item.images || '/static/images/logo.png'} class="h-56 w-full object-cover shadow-md rounded-t-lg object-top" />
              <div class="flex-1 flex flex-col">
                <div class="flex-1 flex flex-col p-5">
                  <h2 class="font-bold">{item.title}</h2>
                  <section class="mt-2 flex-1">
                    <p class="text-xs line-clamp-6">{item.description}</p>
                  </section>
                  <footer class="text-xs text-right ml-auto flex space-x-1 pt-5 italic text-gray-400">
                    <p>{item.source}</p>
                    <p>{item.created_at}</p>
                  </footer>
                </div>
              </div>
            </article>
          </a>
        )
      }
    })}
    </div>
  )
}

export default Item