const API_BASE = import.meta.env.VITE_API_URL as string

export interface ApiCategory {
  id: string
  name: string
  slug: string
  description?: string | null
}

export interface ApiPhoto {
  id: string
  title: string
  description?: string | null
  r2_object_key: string
  image_url: string
  category: ApiCategory
  spotify_url?: string | null
  taken_at?: string | null
  location?: string | null
  favorite: boolean
}

export interface PaginatedPhotos {
  items: ApiPhoto[]
  total: number
  page: number
  size: number
  pages: number
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_BASE}/categories`)
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  const body: { data: { items: ApiCategory[] } } = await res.json()
  return body.data.items
}

export async function fetchAllPhotos(): Promise<ApiPhoto[]> {
  const firstPage = await fetch(`${API_BASE}/photos?page=1&size=100`)

  if (!firstPage.ok)
    throw new Error(`Failed to fetch photos: ${firstPage.status}`)
  const data: { data: PaginatedPhotos } = await firstPage.json()
  const { items, pages } = data.data

  if (pages <= 1) return items

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) =>
      fetch(`${API_BASE}/photos?page=${i + 2}&size=100`)
        .then((r) => r.json())
        .then((d: { data: PaginatedPhotos }) => d.data.items),
    ),
  )

  return [...items, ...rest.flat()]
}

export async function fetchPhotosByCategory(slug: string): Promise<ApiPhoto[]> {
  const firstPage = await fetch(
    `${API_BASE}/photos?category=${slug}&page=1&size=100`,
  )
  if (!firstPage.ok)
    throw new Error(
      `Failed to fetch photos for category "${slug}": ${firstPage.status}`,
    )
  const data: { data: PaginatedPhotos } = await firstPage.json()
  const { items, pages } = data.data

  if (pages <= 1) return items

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) =>
      fetch(`${API_BASE}/photos?category=${slug}&page=${i + 2}&size=100`)
        .then((r) => r.json())
        .then((d: { data: PaginatedPhotos }) => d.data.items),
    ),
  )

  return [...items, ...rest.flat()]
}

export async function fetchPhoto(id: string): Promise<ApiPhoto> {
  const res = await fetch(`${API_BASE}/photos/${id}`)
  if (!res.ok) throw new Error(`Photo not found: ${id}`)
  const data: { data: ApiPhoto } = await res.json()
  return data.data
}
