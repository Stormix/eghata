import ThemeProvider, { useTheme } from "@/components/theme-provider"
import "./styles/global.css"

function App() {
  const { theme } = useTheme()
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="flex w-screen h-screen">
        <div className="flex m-auto flex-col">
          <img src={theme === "dark" ? "/logo.png" : "/logo-light.png"} alt="logo" className="h-32 mx-auto my-8" />
          <h1 className="text-center">Coming soon...</h1>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App