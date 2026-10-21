import React from 'react'

import type { RouteObject } from 'react-router-dom'
import { PublicLayout } from './app/layouts/PublicLayout'
import { HomePage } from './features/home/HomePage'
import { AboutPage } from './features/about/AboutPage'
import { ServicesPage } from './features/services/ServicesPage'
import { ServiceDetailPage } from './features/services/ServiceDetailPage'
import { WorksPage } from './features/works/WorksPage'
import { WorkDetailPage } from './features/works/WorkDetailPage'
import { BlogIndexPage } from './features/blog/BlogIndexPage'
import { BlogCategoryPage } from './features/blog/BlogCategoryPage'
import { BlogPostPage } from './features/blog/BlogPostPage'
import { ContactPage } from './features/contact/ContactPage'
import { PrivacyPage } from './features/privacy/PrivacyPage'
import { NotFoundPage } from './features/home/NotFoundPage'
import { StyleguidePage } from './features/home/StyleguidePage'

// Lazy-loaded Admin components to keep the public bundle lean and free of admin/TipTap code
const AdminRoot = React.lazy(() =>
  import('./app/layouts/AdminRoot').then((m) => ({ default: m.AdminRoot })),
)
const AdminLayout = React.lazy(() =>
  import('./app/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)
const AdminLoginPage = React.lazy(() =>

  import('./features/auth/AdminLoginPage').then((m) => ({
    default: m.AdminLoginPage,
  })),
)
const AdminResetPasswordPage = React.lazy(() =>
  import('./features/auth/AdminResetPasswordPage').then((m) => ({
    default: m.AdminResetPasswordPage,
  })),
)
const DashboardPage = React.lazy(() =>
  import('./features/admin/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  })),
)
const MediaPage = React.lazy(() =>
  import('./features/admin/MediaPage').then((m) => ({
    default: m.MediaPage,
  })),
)
const WorksListPage = React.lazy(() =>
  import('./features/admin/works/WorksListPage').then((m) => ({
    default: m.WorksListPage,
  })),
)
const WorkEditPage = React.lazy(() =>
  import('./features/admin/works/WorkEditPage').then((m) => ({
    default: m.WorkEditPage,
  })),
)
const PartnersPage = React.lazy(() =>
  import('./features/admin/partners/PartnersPage').then((m) => ({
    default: m.PartnersPage,
  })),
)
const MessagesPage = React.lazy(() =>
  import('./features/admin/messages/MessagesPage').then((m) => ({
    default: m.MessagesPage,
  })),
)
const SettingsPage = React.lazy(() =>
  import('./features/admin/settings/SettingsPage').then((m) => ({
    default: m.SettingsPage,
  })),
)
const UsersPage = React.lazy(() =>
  import('./features/admin/users/UsersPage').then((m) => ({
    default: m.UsersPage,
  })),
)
const PostsListPage = React.lazy(() =>
  import('./features/admin/blog/PostsListPage').then((m) => ({
    default: m.PostsListPage,
  })),
)
const PostEditPage = React.lazy(() =>
  import('./features/admin/blog/PostEditPage').then((m) => ({
    default: m.PostEditPage,
  })),
)
const CategoriesPage = React.lazy(() =>
  import('./features/admin/blog/CategoriesPage').then((m) => ({
    default: m.CategoriesPage,
  })),
)
const TagsPage = React.lazy(() =>
  import('./features/admin/blog/TagsPage').then((m) => ({
    default: m.TagsPage,
  })),
)

import { AdminSuspense } from './components/admin'


export const routes: RouteObject[] = [
  // 1. Public Website Layout (Static SSG Prerendered)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      // Arabic routes (default root)
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      {
        path: 'services/elevator-maintenance',
        element: <ServiceDetailPage serviceKey="maintenance" />,
      },
      {
        path: 'services/elevator-modernization',
        element: <ServiceDetailPage serviceKey="modernization" />,
      },
      {
        path: 'services/elevator-installation',
        element: <ServiceDetailPage serviceKey="installation" />,
      },
      {
        path: 'services/elevator-spare-parts',
        element: <ServiceDetailPage serviceKey="spareParts" />,
      },
      {
        path: 'services/escalators-moving-walkways',
        element: <ServiceDetailPage serviceKey="escalators" />,
      },
      { path: 'works', element: <WorksPage /> },
      { path: 'works/:slug', element: <WorkDetailPage /> },
      { path: 'blog', element: <BlogIndexPage /> },
      { path: 'blog/page/:page', element: <BlogIndexPage /> },
      { path: 'blog/category/:slug', element: <BlogCategoryPage /> },
      { path: 'blog/category/:slug/page/:page', element: <BlogCategoryPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },

      // English routes (/en prefix)
      { path: 'en', element: <HomePage /> },
      { path: 'en/about', element: <AboutPage /> },
      { path: 'en/services', element: <ServicesPage /> },
      {
        path: 'en/services/elevator-maintenance',
        element: <ServiceDetailPage serviceKey="maintenance" />,
      },
      {
        path: 'en/services/elevator-modernization',
        element: <ServiceDetailPage serviceKey="modernization" />,
      },
      {
        path: 'en/services/elevator-installation',
        element: <ServiceDetailPage serviceKey="installation" />,
      },
      {
        path: 'en/services/elevator-spare-parts',
        element: <ServiceDetailPage serviceKey="spareParts" />,
      },
      {
        path: 'en/services/escalators-moving-walkways',
        element: <ServiceDetailPage serviceKey="escalators" />,
      },
      { path: 'en/works', element: <WorksPage /> },
      { path: 'en/works/:slug', element: <WorkDetailPage /> },
      { path: 'en/blog', element: <BlogIndexPage /> },
      { path: 'en/blog/page/:page', element: <BlogIndexPage /> },
      { path: 'en/blog/category/:slug', element: <BlogCategoryPage /> },
      { path: 'en/blog/category/:slug/page/:page', element: <BlogCategoryPage /> },
      { path: 'en/blog/:slug', element: <BlogPostPage /> },
      { path: 'en/contact', element: <ContactPage /> },
      { path: 'en/privacy', element: <PrivacyPage /> },

      // Internal / styleguide / catch-all
      { path: '_styleguide', element: <StyleguidePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // 2. Admin Dashboard Layout (Client-side Only, Lazy-loaded, Excluded from SSG)
  {
    path: 'admin/login',
    element: (
      <AdminSuspense>
        <AdminRoot>
          <AdminLoginPage />
        </AdminRoot>
      </AdminSuspense>
    ),
  },
  {
    path: 'admin/reset-password',
    element: (
      <AdminSuspense>
        <AdminRoot>
          <AdminResetPasswordPage />
        </AdminRoot>
      </AdminSuspense>
    ),
  },
  {
    path: 'admin',
    element: (
      <AdminSuspense>
        <AdminRoot>
          <AdminLayout />
        </AdminRoot>
      </AdminSuspense>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'posts',
        element: <PostsListPage />,
      },
      {
        path: 'posts/new',
        element: <PostEditPage />,
      },
      {
        path: 'posts/:id',
        element: <PostEditPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'tags',
        element: <TagsPage />,
      },
      {
        path: 'works',
        element: <WorksListPage />,
      },
      {
        path: 'works/new',
        element: <WorkEditPage />,
      },
      {
        path: 'works/:id',
        element: <WorkEditPage />,
      },
      {
        path: 'partners',
        element: <PartnersPage />,
      },
      {
        path: 'media',
        element: <MediaPage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]
