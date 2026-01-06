import type { FC } from 'hono/jsx'
import Item from './item'

const Cast: FC = ({ cast, news }) => {
  const todayTs = Math.floor(new Date(cast.created_at).getTime() / 1000) + 32400
  const daybeforeTs = todayTs - 86400
  const today = new Date(todayTs * 1000)
  const daybefore = new Date(daybeforeTs * 1000)

  return (
    <div class="max-w-6xl mx-auto md:p-5 p-3">
      <div class="mb-5 md:mb-10 bg-white border rounded-xl">
        <div class="inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5">
          <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mx-auto">
            <div class="flex flex-wrap mx-auto">
              <div class="md:gap-6 mr-3 mt-2">
                <span class="text-m">{today.getFullYear()}</span>
                <div class="text-xl font-bold">{today.getMonth()+1}/{today.getDate()}</div>
              </div>
              <div class="w-0.3 h-16 border"></div>
              <div class="w-44 md:w-96 ml-3 mt-2">
                <h3 class="text-lg font-bold">{cast.title}</h3>
              </div>
            </div>
            <div style="width:100%;height:67px;z-index:0">
              <audio src={cast.src} preload="auto" controls="" style="width:100%;height:100%"></audio>
            </div>
          </div>
        </div>
        <div class="transition-all duration-300 ease-in-out">
          <Item news={news} daybefore={daybefore} />
        </div>
      </div>
    </div>
  )
}

export default Cast