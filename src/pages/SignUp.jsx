import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    const { data, error: signUpError } = await signUp(email, password)

    setSubmitting(false)

    if (signUpError) {
      setError('会員登録に失敗しました。' + signUpError.message)
      return
    }

    // メール確認が不要な設定の場合はそのままログイン状態になるため一覧画面へ
    if (data.session) {
      navigate('/properties')
      return
    }

    // メール確認が必要な設定の場合は案内を表示
    setMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? '登録中...' : '登録する'}
        </button>

        <p>
          すでに会員の方は<Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
