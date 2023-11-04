'use client'

import { selectIsLoggedIn } from '@/lib/redux/slices/auth/selectors'
import { useSelector } from '@/lib/redux/store'

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        KGS Client ({isLoggedIn ? 'logged in' : 'logged out'})
      </div>
      <div className="navbar-end"></div>
    </nav>
  )
}

export default Navigation
