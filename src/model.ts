export interface Bindings {
  DB: D1Database
}

export interface Casts {
  id: number
  title: string
  src: string
  created_at: string
  updated_at: string
}

export interface News {
  id: number
  title: string
  description: string
  body: string
  href: string
  images : string
  source: string
  created_at: string
  updated_at: string
}