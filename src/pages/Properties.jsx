import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

export function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: true })

      if (fetchError) {
        setError('物件情報の取得に失敗しました。')
      } else {
        setProperties(data)
      }
      setLoading(false)
    }

    fetchProperties()
  }, [])

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

      {loading && <p className="loading">読み込み中...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2>{property.name}</h2>
              <p className="property-rent">{property.rent.toLocaleString()}円 / 月</p>
              <p className="property-area">{property.area}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
