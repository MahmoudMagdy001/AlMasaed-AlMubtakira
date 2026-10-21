import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/tailwind.css'
import './i18n/config'

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
