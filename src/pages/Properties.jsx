import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PropertyForm } from '../components/PropertyForm'

// フォームの表示状態
const FORM_MODE = {
  HIDDEN: 'hidden',   // フォームを非表示
  CREATE: 'create',   // 新規登録フォーム
  EDIT: 'edit',       // 編集フォーム
}

export function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formMode, setFormMode] = useState(FORM_MODE.HIDDEN)
  // 編集対象の物件データ
  const [editingProperty, setEditingProperty] = useState(null)

  // 自分が登録した物件一覧を取得する
  const fetchProperties = async () => {
    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError('物件情報の取得に失敗しました。')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録する
  const handleCreate = async (values) => {
    const { error: insertError } = await supabase
      .from('properties')
      .insert({ ...values, user_id: user.id })

    if (insertError) {
      return '物件の登録に失敗しました。'
    }
    setFormMode(FORM_MODE.HIDDEN)
    await fetchProperties()
    return null
  }

  // 物件を更新する
  const handleUpdate = async (values) => {
    const { error: updateError } = await supabase
      .from('properties')
      .update(values)
      .eq('id', editingProperty.id)

    if (updateError) {
      return '物件の更新に失敗しました。'
    }
    setFormMode(FORM_MODE.HIDDEN)
    setEditingProperty(null)
    await fetchProperties()
    return null
  }

  // 物件を削除する
  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return

    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id)

    if (deleteError) {
      setError('物件の削除に失敗しました。')
      return
    }
    await fetchProperties()
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setFormMode(FORM_MODE.EDIT)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormCancel = () => {
    setFormMode(FORM_MODE.HIDDEN)
    setEditingProperty(null)
  }

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
          <button onClick={handleLogout} className="btn-logout">ログアウト</button>
        </div>
      </header>

      {/* 新規登録・編集フォーム */}
      {formMode !== FORM_MODE.HIDDEN ? (
        <PropertyForm
          initialValues={formMode === FORM_MODE.EDIT ? editingProperty : undefined}
          onSubmit={formMode === FORM_MODE.EDIT ? handleUpdate : handleCreate}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="add-button-wrapper">
          <button
            className="btn-add"
            onClick={() => setFormMode(FORM_MODE.CREATE)}
          >
            ＋ 物件を新規登録
          </button>
        </div>
      )}

      {loading && <p className="loading">読み込み中...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <p className="empty-message">登録されている物件はありません。</p>
      )}

      {/* 物件カード一覧 */}
      {!loading && !error && (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2>{property.name}</h2>
              <p className="property-madori">{property.madori}</p>
              <p className="property-rent">{property.rent.toLocaleString()}円 / 月</p>
              <p className="property-area">{property.area}</p>
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(property)}
                >
                  編集
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(property)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
