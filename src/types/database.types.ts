export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'editor' | 'none'
          created_at: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
      }
      works: {
        Row: {
          id: string
          slug: string
          title_ar: string
          title_en: string | null
          service_type: string
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
      }
      partners: {
        Row: {
          id: string
          name_ar: string
          name_en: string | null
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
      }
      posts: {
        Row: {
          id: string
          lang: 'ar' | 'en'
          slug: string
          title: string
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
