import type { FC } from 'hono/jsx'
import { Casts } from '../model'
import Item from './item'

const Items: FC = ({ casts, news, start, next }) => {
  return (
    <>
      {casts.map((cast: Casts, index: number) => {
        const todayTs = Math.floor(new Date(cast.created_at).getTime() / 1000) + 32400
        const daybeforeTs = todayTs - 86400
        const today = new Date(todayTs * 1000)
        const daybefore = new Date(daybeforeTs * 1000)
        const isLastItem = casts.length - 1 === index;
        const extraProps = isLastItem
          ? {
              'hx-get': `/casts/infinite?start=${next}`,
              'hx-trigger': 'revealed',
              'hx-swap': 'afterend',
            }
          : {};
        return(
          <div class="mb-5 md:mb-10 hs-accordion hs-accordion-active:border-gray-200 bg-white border rounded-xl"  {...extraProps}>
            <button onclick={`toggleAccordion(${start+index+1})`} class="inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5">
              <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mx-auto">
                <div class="flex flex-wrap mx-auto">
                  <div class="md:gap-6 mr-3 mt-2">
                    <a href={`/casts/${today.toISOString().slice(0, 10)}`} target="_blank">
                      <span class="text-m">{today.getFullYear()}</span>
                      <div class="text-xl font-bold">{today.getMonth()+1}/{today.getDate()}</div>
                    </a>
                  </div>
                  <div class="w-0.3 h-16 border"></div>
                  <div class="w-44 md:w-96 ml-3 mt-2">
                    <a href={`/casts/${today.toISOString().slice(0, 10)}`} target="_blank">
                      <h3 class="text-lg font-bold">{cast.title}</h3>
                    </a>
                  </div>
                </div>
                <div style="width:100%;height:67px;z-index:0">
                  <audio src={cast.src} preload="auto" controls="" style="width:100%;height:100%"></audio>
                </div>
              </div>
              <span id={`icon-${start+index+1}`} class="text-slate-800 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
                </svg>
              </span>
            </button>
            <div id={`content-${start+index+1}`} class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
              <Item news={news} daybefore={daybefore} />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Items