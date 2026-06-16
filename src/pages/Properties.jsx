import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { dummyProperties } from '../data/dummyProperties'

export function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="properties-page">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </header>

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">{property.rent.toLocaleString()}円 / 月</p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
