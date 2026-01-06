import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <title>AI News - Media Copilot</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="htmx-config" content='{"selfRequestsOnly": false}' />
        <link rel="icon" href="/static/favicon.ico" />
        <script src="/static/js/tailwindcss.min.js"></script>
        <script src="/static/js/htmx.min.js"></script>
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon="{'token': '0807ebb3dfb644959284463e8917ca58'}"></script>
      </head>
      <body class="bg-gray-100">
        <header>
          <div class="max-w-6xl mx-auto flex justify-between p-5 md:p-10 items-center">
            <div class="w-8"></div>
            <div>
              <a href="/">
                <img src="/static/images/logo.png" alt="Local News" width="250" />
              </a>
            </div>
            <div class="w-8">
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
})
