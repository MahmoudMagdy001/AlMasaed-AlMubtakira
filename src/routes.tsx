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

export const routes: RouteObject[] = [
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
]
