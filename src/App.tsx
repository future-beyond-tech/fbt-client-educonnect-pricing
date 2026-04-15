import Navbar from './components/Navbar'
import DeliveryPage from './components/delivery/DeliveryPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <DeliveryPage />
    </>
  )
}
