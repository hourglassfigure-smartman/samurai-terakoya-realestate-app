import { useState } from 'react'

// 物件の新規登録・編集に使用する共通フォーム
// initialValuesが渡された場合は編集モード、渡されない場合は新規登録モード
export function PropertyForm({ initialValues, onSubmit, onCancel }) {
  const isEditing = Boolean(initialValues)

  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    rent: initialValues?.rent ?? '',
    area: initialValues?.area ?? '',
    madori: initialValues?.madori ?? '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const values = {
      ...form,
      rent: Number(form.rent),
    }

    const errorMessage = await onSubmit(values)
    if (errorMessage) {
      setError(errorMessage)
    }
    setSubmitting(false)
  }

  return (
    <div className="property-form-wrapper">
      <h2>{isEditing ? '物件を編集' : '物件を新規登録'}</h2>
      <form className="property-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">物件名</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="madori">間取り</label>
            <input
              id="madori"
              name="madori"
              type="text"
              placeholder="例: 1LDK"
              value={form.madori}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="rent">家賃（円）</label>
            <input
              id="rent"
              name="rent"
              type="number"
              min="0"
              value={form.rent}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="area">エリア</label>
            <input
              id="area"
              name="area"
              type="text"
              placeholder="例: 東京都渋谷区"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? '保存中...' : isEditing ? '更新する' : '登録する'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}
