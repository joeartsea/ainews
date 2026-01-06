export const Home = async() => {  
  return (
    <div id="content" hx-trigger="load" hx-get="/casts" hx-swap="innerHTML">
      <div class="max-w-6xl mx-auto md:p-5 p-3">
        {[...Array(5)].map(() => {
          return (
            <div role="status" class="mb-5 md:mb-10 border-gray-200 bg-white border rounded-xl animate-pulse">
              <button class="inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mx-auto">
                  <div class="flex flex-wrap mx-auto">
                    <div class="md:gap-6 mr-3 mt-2">
                      <div class="w-12 h-4 bg-gray-100 rounded-full mt-1 mb-2.5"></div>
                      <div class="w-16 h-4 bg-gray-100 rounded-full"></div>
                    </div>
                    <div class="w-0.3 h-16 border rounded-full"></div>
                    <div class="w-44 md:w-96 ml-3 mt-2">
                      <div class="w-84 h-6 bg-gray-100 rounded-full mt-1 mb-2.5"></div>
                    </div>
                  </div>
                  <div class="w-84 h-10 bg-gray-100 rounded-full mt-2.5 mb-2.5"></div>
                </div>
              </button>
              <div class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out rounded-full"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
