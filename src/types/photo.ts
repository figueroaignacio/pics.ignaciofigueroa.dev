export type Category =
  | 'Random'
  | 'Memories'
  | 'Friends'
  | 'Family'
  | 'Pets'
  | 'Food'
  | 'Travel'
  | 'Nature'
  | 'City'
  | 'Sunsets'
  | 'Night'
  | 'Gaming'
  | 'Coffee'
  | 'Work'
  | 'Events'

export interface Photo {
  id: string
  title: string
  description?: string
  r2_object_key: string
  image_url: string
  category: Category
  spotify_url?: string
  taken_at?: string
  location?: string
  favorite: boolean
  aspectRatio: string
}
