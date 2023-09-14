import ThemeProvider from '@/components/theme-provider'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          {children} 
        </ThemeProvider>
    </>
  )
}

export default Providers