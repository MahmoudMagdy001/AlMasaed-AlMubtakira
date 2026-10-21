export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'none'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'none'
          created_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          id: string
          file_name: string
          storage_path: string
          mime_type: string
          size_bytes: number
          width: number | null
          height: number | null
          variants: Json
          alt_text: string | null
          title: string | null
          folder: string
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          file_name: string
          storage_path: string
          mime_type: string
          size_bytes: number
          width?: number | null
          height?: number | null
          variants?: Json
          alt_text?: string | null
          title?: string | null
          folder?: string
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          storage_path?: string
          mime_type?: string
          size_bytes?: number
          width?: number | null
          height?: number | null
          variants?: Json
          alt_text?: string | null
          title?: string | null
          folder?: string
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'media_uploaded_by_fkey'
            columns: ['uploaded_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          id: string
          slug: string
          name_ar: string
          name_en: string | null
          description_ar: string | null
          description_en: string | null
          seo_title: string | null
          seo_description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name_ar: string
          name_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          seo_title?: string | null
          seo_description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name_ar?: string
          name_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          seo_title?: string | null
          seo_description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          slug: string
          name_ar: string
          name_en: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name_ar: string
          name_en?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name_ar?: string
          name_en?: string | null
          created_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          lang: 'ar' | 'en'
          translation_key: string
          slug: string
          title: string
          excerpt: string | null
          content_html: string
          content_json: Json | null
          featured_image_id: string | null
          featured_image_alt: string | null
          category_id: string | null
          author_id: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          reading_time_min: number
          seo_title: string | null
          seo_description: string | null
          focus_keyword: string | null
          secondary_keywords: string[]
          canonical_url: string | null
          robots_noindex: boolean
          robots_nofollow: boolean
          og_title: string | null
          og_description: string | null
          og_image_id: string | null
          schema_type: 'BlogPosting' | 'Article' | 'NewsArticle'
          faq: Json
          seo_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lang?: 'ar' | 'en'
          translation_key?: string
          slug: string
          title: string
          excerpt?: string | null
          content_html?: string
          content_json?: Json | null
          featured_image_id?: string | null
          featured_image_alt?: string | null
          category_id?: string | null
          author_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          reading_time_min?: number
          seo_title?: string | null
          seo_description?: string | null
          focus_keyword?: string | null
          secondary_keywords?: string[]
          canonical_url?: string | null
          robots_noindex?: boolean
          robots_nofollow?: boolean
          og_title?: string | null
          og_description?: string | null
          og_image_id?: string | null
          schema_type?: 'BlogPosting' | 'Article' | 'NewsArticle'
          faq?: Json
          seo_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lang?: 'ar' | 'en'
          translation_key?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content_html?: string
          content_json?: Json | null
          featured_image_id?: string | null
          featured_image_alt?: string | null
          category_id?: string | null
          author_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          reading_time_min?: number
          seo_title?: string | null
          seo_description?: string | null
          focus_keyword?: string | null
          secondary_keywords?: string[]
          canonical_url?: string | null
          robots_noindex?: boolean
          robots_nofollow?: boolean
          og_title?: string | null
          og_description?: string | null
          og_image_id?: string | null
          schema_type?: 'BlogPosting' | 'Article' | 'NewsArticle'
          faq?: Json
          seo_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'posts_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_featured_image_id_fkey'
            columns: ['featured_image_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_og_image_id_fkey'
            columns: ['og_image_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'post_tags_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      works: {
        Row: {
          id: string
          slug: string
          title_ar: string
          title_en: string | null
          description_ar: string | null
          description_en: string | null
          service_type:
            | 'installation'
            | 'maintenance'
            | 'modernization'
            | 'spare-parts'
            | 'escalators'
          location_ar: string | null
          location_en: string | null
          completed_year: number | null
          cover_media_id: string | null
          gallery_media_ids: string[]
          seo_title: string | null
          seo_description: string | null
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title_ar: string
          title_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          service_type?:
            | 'installation'
            | 'maintenance'
            | 'modernization'
            | 'spare-parts'
            | 'escalators'
          location_ar?: string | null
          location_en?: string | null
          completed_year?: number | null
          cover_media_id?: string | null
          gallery_media_ids?: string[]
          seo_title?: string | null
          seo_description?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title_ar?: string
          title_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          service_type?:
            | 'installation'
            | 'maintenance'
            | 'modernization'
            | 'spare-parts'
            | 'escalators'
          location_ar?: string | null
          location_en?: string | null
          completed_year?: number | null
          cover_media_id?: string | null
          gallery_media_ids?: string[]
          seo_title?: string | null
          seo_description?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'works_cover_media_id_fkey'
            columns: ['cover_media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      partners: {
        Row: {
          id: string
          name_ar: string
          name_en: string | null
          logo_media_id: string | null
          website_url: string | null
          sort_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_ar: string
          name_en?: string | null
          logo_media_id?: string | null
          website_url?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_ar?: string
          name_en?: string | null
          logo_media_id?: string | null
          website_url?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'partners_logo_media_id_fkey'
            columns: ['logo_media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          service_interest: string | null
          message: string
          source_page: string | null
          status: 'new' | 'contacted' | 'closed' | 'spam'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          service_interest?: string | null
          message: string
          source_page?: string | null
          status?: 'new' | 'contacted' | 'closed' | 'spam'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          service_interest?: string | null
          message?: string
          source_page?: string | null
          status?: 'new' | 'contacted' | 'closed' | 'spam'
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_staff: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
