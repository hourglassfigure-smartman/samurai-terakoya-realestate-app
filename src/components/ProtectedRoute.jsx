import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログインの場合はログイン画面にリダイレクトする
export function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <p className="loading">読み込み中...</p>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
