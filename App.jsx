import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const CAT_COLORS = {
  Turismo:        { bg: '#DBEAFE', text: '#1e3a5f', border: '#93c5fd' },
  Emprendimiento: { bg: '#DCFCE7', text: '#14532d', border: '#86efac' },
  Capacitación:   { bg: '#FEF9C3', text: '#713f12', border: '#fde047' },
  Evento:         { bg: '#FFEDD5', text: '#7c2d12', border: '#fdba74' },
  Reunión:        { bg: '#F1F5F9', text: '#334155', border: '#cbd5e1' },
  Lanzamiento:    { bg: '#FEE2E2', text: '#7f1d1d', border: '#fca5a5' },
}

const CATEGORIES = Object.keys(CAT_COLORS)
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#fafaf9', color: '#1c1917' },

  // AUTH
  authWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9' },
  authCard: { background: '#fff', border: '1px solid #e7e5e4', borderRadius: 16, padding: '2.5rem 2rem', width: 360, boxShadow: '0 2px 24px #0000000a' },
  authTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, marginBottom: 4 },
  authSub: { fontSize: 13, color: '#78716c', marginBottom: 24 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box', background: '#fafaf9' },
  btn: { width: '100%', padding: '11px', background: '#1c1917', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' },
  btnSm: { padding: '7px 14px', background: '#1c1917', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' },
  btnOutline: { padding: '7px 14px', background: 'transparent', color: '#1c1917', border: '1px solid #d6d3d1', borderRadius: 8, fontSize: 13, cursor: 'pointer' },
  toggle: { textAlign: 'center', marginTop: 16, fontSize: 13, color: '#78716c' },
  toggleLink: { color: '#1c1917', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' },

  // HEADER
  header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 },
  headerTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, fontWeight: 400 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10 },
  userBadge: { fontSize: 13, color: '#78716c' },
  logoutBtn: { padding: '6px 12px', background: 'transparent', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 13, cursor: 'pointer', color: '#78716c' },

  // CALENDAR
  calWrap: { maxWidth: 1100, margin: '0 auto', padding: '1.5rem' },
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' },
  monthTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400 },
  navBtn: { padding: '7px 16px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 14, cursor: 'pointer' },
  legend: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem' },
  legItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#78716c' },
  legDot: { width: 10, height: 10, borderRadius: '50%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 4 },
  dayName: { textAlign: 'center', fontSize: 12, color: '#78716c', padding: '6px 0', fontWeight: 500 },
  dayCell: { minHeight: 90, border: '1px solid #f5f5f4', borderRadius: 10, padding: 6, background: '#fff', position: 'relative' },
  dayCellOther: { background: '#fafaf9', opacity: 0.5 },
  dayNum: { fontSize: 12, color: '#78716c', marginBottom: 4 },
  dayNumToday: { background: '#1c1917', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, marginBottom: 4 },
  pill: { fontSize: 10, padding: '2px 6px', borderRadius: 4, marginBottom: 2, cursor: 'pointer', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  addDot: { position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: '50%', border: '1px dashed #d6d3d1', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#a8a29e' },

  // MODAL
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: '#fff', borderRadius: 16, border: '1px solid #e7e5e4', padding: '1.75rem', width: 420, maxWidth: '92vw', boxShadow: '0 8px 40px #00000014' },
  modalTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 16 },
  label: { fontSize: 12, fontWeight: 500, color: '#78716c', marginBottom: 4, display: 'block' },
  select: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', background: '#fafaf9', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', background: '#fafaf9', boxSizing: 'border-box', resize: 'vertical', minHeight: 70 },
  modalActions: { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 },
  dangerBtn: { padding: '7px 14px', background: '#fee2e2', color: '#7f1d1d', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' },

  // EVENT DETAIL
  catBadge: { display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 20, marginBottom: 10, fontWeight: 500 },
  detailTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 18, marginBottom: 6 },
  detailMeta: { fontSize: 13, color: '#78716c', marginBottom: 4 },
  detailNotes: { fontSize: 13, color: '#44403c', marginTop: 10, padding: '10px 12px', background: '#fafaf9', borderRadius: 8 },
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMsg, setAuthMsg] = useState('')
  const [events, setEvents] = useState([])
  const [cur, setCur] = useState({ y: 2026, m: 2 })
  const [modal, setModal] = useState(null) // {type: 'new'|'view'|'edit', date?, event?}
  const [form, setForm] = useState({ evento: '', cat: 'Turismo', notas: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) fetchEvents()
  }, [user])

  async function fetchEvents() {
    const { data } = await supabase.from('eventos').select('*').order('fecha')
    setEvents(data || [])
  }

  async function handleAuth() {
    setAuthMsg('')
    if (authMode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setAuthMsg('Email o contraseña incorrectos')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setAuthMsg(error.message)
      else setAuthMsg('¡Revisá tu email para confirmar tu cuenta!')
    }
  }

  async function handleSave() {
    if (!form.evento.trim()) return
    setSaving(true)
    const payload = {
      evento: form.evento,
      categoria: form.cat,
      notas: form.notas,
      fecha: modal.date,
      user_id: user.id,
      user_email: user.email,
    }
    if (modal.type === 'edit') {
      await supabase.from('eventos').update(payload).eq('id', modal.event.id)
    } else {
      await supabase.from('eventos').insert(payload)
    }
    await fetchEvents()
    setSaving(false)
    setModal(null)
  }

  async function handleDelete() {
    await supabase.from('eventos').delete().eq('id', modal.event.id)
    await fetchEvents()
    setModal(null)
  }

  function openNew(dateStr) {
    setForm({ evento: '', cat: 'Turismo', notas: '' })
    setModal({ type: 'new', date: dateStr })
  }

  function openView(ev) {
    setModal({ type: 'view', event: ev })
  }

  function openEdit(ev) {
    setForm({ evento: ev.evento, cat: ev.categoria, notas: ev.notas || '' })
    setModal({ type: 'edit', date: ev.fecha, event: ev })
  }

  function eventsForDate(y, m, d) {
    const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    return events.filter(e => e.fecha === key)
  }

  function changeMonth(dir) {
    setCur(c => {
      let m = c.m + dir, y = c.y
      if (m > 11) { m = 0; y++ }
      if (m < 0) { m = 11; y-- }
      return { y, m }
    })
  }

  if (loading) return <div style={{ ...s.app, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#78716c' }}>Cargando…</div>

  // AUTH SCREEN
  if (!user) return (
    <div style={s.authWrap}>
      <div style={s.authCard}>
        <div style={s.authTitle}>Agenda Institucional</div>
        <div style={s.authSub}>2026 · Equipo interno</div>
        <label style={s.label}>Email</label>
        <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@ejemplo.com" />
        <label style={s.label}>Contraseña</label>
        <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleAuth()} />
        {authMsg && <div style={{ fontSize: 13, color: authMsg.includes('¡') ? '#15803d' : '#dc2626', marginBottom: 10 }}>{authMsg}</div>}
        <button style={s.btn} onClick={handleAuth}>{authMode === 'login' ? 'Entrar' : 'Registrarme'}</button>
        <div style={s.toggle}>
          {authMode === 'login' ? <>¿No tenés cuenta? <span style={s.toggleLink} onClick={() => setAuthMode('register')}>Registrate</span></> : <>¿Ya tenés cuenta? <span style={s.toggleLink} onClick={() => setAuthMode('login')}>Entrá</span></>}
        </div>
      </div>
    </div>
  )

  // CALENDAR
  const { y, m } = cur
  const today = new Date()
  const firstDay = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const prevDays = new Date(y, m, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, current: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true })
  const remaining = (firstDay + daysInMonth) % 7
  if (remaining) for (let i = 1; i <= 7 - remaining; i++) cells.push({ day: i, current: false })

  return (
    <div style={s.app}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.headerTitle}>Agenda Institucional 2026</div>
        <div style={s.headerRight}>
          <span style={s.userBadge}>{user.email}</span>
          <button style={s.logoutBtn} onClick={() => supabase.auth.signOut()}>Salir</button>
        </div>
      </div>

      <div style={s.calWrap}>
        {/* TOOLBAR */}
        <div style={s.toolbar}>
          <button style={s.navBtn} onClick={() => changeMonth(-1)}>← Anterior</button>
          <div style={s.monthTitle}>{MONTHS[m]} {y}</div>
          <button style={s.navBtn} onClick={() => changeMonth(1)}>Siguiente →</button>
        </div>

        {/* LEGEND */}
        <div style={s.legend}>
          {CATEGORIES.map(cat => (
            <div key={cat} style={s.legItem}>
              <div style={{ ...s.legDot, background: CAT_COLORS[cat].bg, border: `1px solid ${CAT_COLORS[cat].border}` }} />
              {cat}
            </div>
          ))}
        </div>

        {/* GRID */}
        <div style={s.grid}>
          {DAYS.map(d => <div key={d} style={s.dayName}>{d}</div>)}
          {cells.map((cell, i) => {
            if (!cell.current) return <div key={i} style={{ ...s.dayCell, ...s.dayCellOther }}><div style={s.dayNum}>{cell.day}</div></div>
            const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === cell.day
            const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`
            const dayEvs = eventsForDate(y, m, cell.day)
            return (
              <div key={i} style={s.dayCell}>
                <div style={isToday ? s.dayNumToday : s.dayNum}>{cell.day}</div>
                {dayEvs.map(ev => {
                  const c = CAT_COLORS[ev.categoria] || CAT_COLORS['Evento']
                  return (
                    <div key={ev.id} style={{ ...s.pill, background: c.bg, color: c.text, border: `1px solid ${c.border}` }} onClick={() => openView(ev)} title={ev.evento}>
                      {ev.evento}
                    </div>
                  )
                })}
                <button style={s.addDot} onClick={() => openNew(dateStr)} title="Agregar evento">+</button>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={s.modal}>

            {/* VIEW */}
            {modal.type === 'view' && (() => {
              const ev = modal.event
              const c = CAT_COLORS[ev.categoria] || CAT_COLORS['Evento']
              const isOwner = ev.user_id === user.id
              return <>
                <div style={{ ...s.catBadge, background: c.bg, color: c.text }}>{ev.categoria}</div>
                <div style={s.detailTitle}>{ev.evento}</div>
                <div style={s.detailMeta}>📅 {ev.fecha}</div>
                <div style={s.detailMeta}>👤 {ev.user_email}</div>
                {ev.notas && <div style={s.detailNotes}>{ev.notas}</div>}
                <div style={{ ...s.modalActions, marginTop: 16 }}>
                  <button style={s.btnOutline} onClick={() => setModal(null)}>Cerrar</button>
                  {isOwner && <button style={s.btnSm} onClick={() => openEdit(ev)}>Editar</button>}
                </div>
              </>
            })()}

            {/* NEW / EDIT */}
            {(modal.type === 'new' || modal.type === 'edit') && <>
              <div style={s.modalTitle}>{modal.type === 'new' ? 'Nuevo evento' : 'Editar evento'}</div>
              <div style={s.detailMeta} >📅 {modal.date}</div>
              <div style={{ height: 14 }} />
              <label style={s.label}>Nombre del evento</label>
              <input style={s.input} value={form.evento} onChange={e => setForm(f => ({ ...f, evento: e.target.value }))} placeholder="Ej: Reunión RIL" />
              <label style={s.label}>Categoría</label>
              <select style={s.select} value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <label style={s.label}>Notas (opcional)</label>
              <textarea style={s.textarea} value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} placeholder="Lugar, hora, link..." />
              <div style={s.modalActions}>
                {modal.type === 'edit' && <button style={s.dangerBtn} onClick={handleDelete}>Eliminar</button>}
                <button style={s.btnOutline} onClick={() => setModal(null)}>Cancelar</button>
                <button style={s.btnSm} onClick={handleSave} disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
              </div>
            </>}

          </div>
        </div>
      )}
    </div>
  )
}
