import React, { useState, useEffect, useCallback } from 'react';
import './AdminPanel.css';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api'
  : 'https://hacker-rank-pwff.vercel.app/api';

// ─── helpers ─────────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('admin_token'); }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' }; }

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      localStorage.setItem('admin_token', data.token);
      onLogin();
    } catch (e) {
      setErr(`Error: ${e.message === "Failed to fetch" ? "Network or CORS error. Check backend." : e.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-logo">
          <span className="adm-logo-icon">⚡</span>
          <h1>Admin Panel</h1>
          <p>HackerRank VIIT Chapter</p>
        </div>
        <form onSubmit={handleLogin} className="adm-login-form">
          <div className="adm-field">
            <label>Admin Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password…" required />
          </div>
          {err && <div className="adm-error">{err}</div>}
          <button className="adm-btn adm-btn-primary adm-btn-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Image Upload Helper ──────────────────────────────────────────────────────
function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setErr('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onChange(data.url);
    } catch (e) {
      console.error("Upload error:", e);
      setErr('Upload failed: ' + e.message + '. Using URL instead.');
    } finally { 
      setUploading(false); 
      e.target.value = null;
    }
  };

  return (
    <div className="adm-field">
      <label>{label}</label>
      <div className="adm-image-upload-row">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste image URL or upload below…"
        />
        <label className="adm-btn adm-btn-secondary adm-upload-btn">
          {uploading ? '⏳ Uploading…' : '📤 Upload'}
          <input type="file" accept="image/*" onChange={handleFile} hidden />
        </label>
      </div>
      {err && <div className="adm-error adm-error-sm">{err}</div>}
      {value && (
        <div className="adm-img-preview">
          <img src={value} alt="preview" onError={e => e.target.style.display = 'none'} />
        </div>
      )}
    </div>
  );
}

// ─── Highlights Tab ───────────────────────────────────────────────────────────
function HighlightsTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ brand: 'HackerRank', badgeSub: '', titlePrefix: '', titleAccent: '', description: '', buttonText: 'Book Now', buttonLink: '#events', image: '', order: 0 });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    try { setItems(await apiFetch('/highlights')); } catch { }
  }, []);
  useEffect(() => { load(); }, [load]);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) {
        await apiFetch(`/highlights/${editing}`, { method: 'PUT', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Updated!');
      } else {
        await apiFetch('/highlights', { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Created!');
      }
      setEditing(null);
      setForm({ brand: 'HackerRank', badgeSub: '', titlePrefix: '', titleAccent: '', description: '', buttonText: 'Book Now', buttonLink: '#events', image: '', order: 0 });
      load();
    } catch (e) { flash('❌ Error: ' + e.message); }
    finally { setLoading(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({ brand: item.brand, badgeSub: item.badgeSub, titlePrefix: item.titlePrefix, titleAccent: item.titleAccent, description: item.description, buttonText: item.buttonText, buttonLink: item.buttonLink, image: item.image, order: item.order || 0 });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this highlight?')) return;
    try { await apiFetch(`/highlights/${id}`, { method: 'DELETE', headers: authHeader() }); flash('🗑 Deleted'); load(); }
    catch (e) { flash('❌ ' + e.message); }
  };

  const f = (k) => (v) => setForm(prev => ({ ...prev, [k]: typeof v === 'object' && v.target ? v.target.value : v }));

  return (
    <div className="adm-tab-content">
      <div className="adm-section">
        <h2>{editing ? 'Edit Highlight' : 'Add Highlight'}</h2>
        {msg && <div className="adm-flash">{msg}</div>}
        <form onSubmit={save} className="adm-form">
          <div className="adm-form-grid">
            <div className="adm-field"><label>Brand</label><input value={form.brand} onChange={f('brand')} required /></div>
            <div className="adm-field"><label>Badge Sub</label><input value={form.badgeSub} onChange={f('badgeSub')} placeholder="e.g. VIIT CHAPTER" required /></div>
            <div className="adm-field"><label>Title Prefix</label><input value={form.titlePrefix} onChange={f('titlePrefix')} placeholder="e.g. Exclusive" /></div>
            <div className="adm-field"><label>Title Accent</label><input value={form.titleAccent} onChange={f('titleAccent')} placeholder="e.g. VIITHACKS26" required /></div>
            <div className="adm-field adm-full"><label>Description</label><textarea value={form.description} onChange={f('description')} rows={2} required /></div>
            <div className="adm-field"><label>Button Text</label><input value={form.buttonText} onChange={f('buttonText')} /></div>
            <div className="adm-field"><label>Button Link</label><input value={form.buttonLink} onChange={f('buttonLink')} /></div>
            <div className="adm-field"><label>Order</label><input type="number" value={form.order} onChange={f('order')} /></div>
            <div className="adm-full">
              <ImageUpload label="Slide Image" value={form.image} onChange={f('image')} />
            </div>
          </div>
          <div className="adm-form-actions">
            {editing && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditing(null); setForm({ brand: 'HackerRank', badgeSub: '', titlePrefix: '', titleAccent: '', description: '', buttonText: 'Book Now', buttonLink: '#events', image: '', order: 0 }); }}>Cancel</button>}
            <button className="adm-btn adm-btn-primary" disabled={loading}>{loading ? 'Saving…' : editing ? 'Update Highlight' : 'Add Highlight'}</button>
          </div>
        </form>
      </div>

      <div className="adm-section">
        <h2>All Highlights ({items.length})</h2>
        <div className="adm-cards">
          {items.map(item => (
            <div className="adm-card" key={item._id || item.titleAccent}>
              <img src={item.image} alt={item.titleAccent} className="adm-card-img" onError={e => e.target.style.display = 'none'} />
              <div className="adm-card-body">
                <span className="adm-badge">{item.badgeSub}</span>
                <h3>{item.titlePrefix} {item.titleAccent}</h3>
                <p>{item.description}</p>
              </div>
              {item._id && (
                <div className="adm-card-actions">
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => edit(item)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => del(item._id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Events Tab ───────────────────────────────────────────────────────────────
function EventsTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', month: '', day: '', tag: '', prize: '', image: '', iconType: 'code' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => { try { setItems(await apiFetch('/events')); } catch { } }, []);
  useEffect(() => { load(); }, [load]);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) {
        await apiFetch(`/events/${editing}`, { method: 'PUT', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Updated!');
      } else {
        await apiFetch('/events', { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Created!');
      }
      setEditing(null);
      setForm({ title: '', description: '', month: '', day: '', tag: '', prize: '', image: '', iconType: 'code' });
      load();
    } catch (e) { flash('❌ ' + e.message); }
    finally { setLoading(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({ title: item.title, description: item.description, month: item.month, day: item.day, tag: item.tag, prize: item.prize || '', image: item.image, iconType: item.iconType || 'code' });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try { await apiFetch(`/events/${id}`, { method: 'DELETE', headers: authHeader() }); flash('🗑 Deleted'); load(); }
    catch (e) { flash('❌ ' + e.message); }
  };

  const f = (k) => (v) => setForm(prev => ({ ...prev, [k]: typeof v === 'object' && v.target ? v.target.value : v }));

  const iconOptions = ['code', 'laptop', 'fire', 'shield', 'brain', 'trophy', 'star'];

  return (
    <div className="adm-tab-content">
      <div className="adm-section">
        <h2>{editing ? 'Edit Event' : 'Add Event'}</h2>
        {msg && <div className="adm-flash">{msg}</div>}
        <form onSubmit={save} className="adm-form">
          <div className="adm-form-grid">
            <div className="adm-field adm-full"><label>Title</label><input value={form.title} onChange={f('title')} placeholder="Event title" required /></div>
            <div className="adm-field adm-full"><label>Description</label><textarea value={form.description} onChange={f('description')} rows={2} required /></div>
            <div className="adm-field"><label>Month</label><input value={form.month} onChange={f('month')} placeholder="OCT" required /></div>
            <div className="adm-field"><label>Day</label><input value={form.day} onChange={f('day')} placeholder="15" required /></div>
            <div className="adm-field"><label>Tag</label><input value={form.tag} onChange={f('tag')} placeholder="BOOTCAMP" required /></div>
            <div className="adm-field"><label>Prize / Label</label><input value={form.prize} onChange={f('prize')} placeholder="₹25,000 PRIZES" /></div>
            <div className="adm-field">
              <label>Icon Type</label>
              <select value={form.iconType} onChange={f('iconType')}>
                {iconOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="adm-full">
              <ImageUpload label="Event Poster / Image" value={form.image} onChange={f('image')} />
            </div>
          </div>
          <div className="adm-form-actions">
            {editing && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditing(null); setForm({ title: '', description: '', month: '', day: '', tag: '', prize: '', image: '', iconType: 'code' }); }}>Cancel</button>}
            <button className="adm-btn adm-btn-primary" disabled={loading}>{loading ? 'Saving…' : editing ? 'Update Event' : 'Add Event'}</button>
          </div>
        </form>
      </div>

      <div className="adm-section">
        <h2>All Events ({items.length})</h2>
        <div className="adm-cards">
          {items.map((item, idx) => (
            <div className="adm-card" key={item._id || idx}>
              <img src={item.image} alt={item.title} className="adm-card-img" onError={e => e.target.style.display = 'none'} />
              <div className="adm-card-body">
                <span className="adm-badge">{item.month} {item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.prize && <span className="adm-prize">{item.prize}</span>}
              </div>
              {item._id && (
                <div className="adm-card-actions">
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => edit(item)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => del(item._id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'hackathons', image: '', tag: '', driveLink: '' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => { try { setItems(await apiFetch('/gallery')); } catch { } }, []);
  useEffect(() => { load(); }, [load]);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) {
        await apiFetch(`/gallery/${editing}`, { method: 'PUT', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Updated!');
      } else {
        await apiFetch('/gallery', { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Created!');
      }
      setEditing(null);
      setForm({ title: '', description: '', category: 'hackathons', image: '', tag: '', driveLink: '' });
      load();
    } catch (e) { flash('❌ ' + e.message); }
    finally { setLoading(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({ title: item.title, description: item.description, category: item.category, image: item.image, tag: item.tag || '', driveLink: item.driveLink || '' });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try { await apiFetch(`/gallery/${id}`, { method: 'DELETE', headers: authHeader() }); flash('🗑 Deleted'); load(); }
    catch (e) { flash('❌ ' + e.message); }
  };

  const f = (k) => (v) => setForm(prev => ({ ...prev, [k]: typeof v === 'object' && v.target ? v.target.value : v }));

  const categories = ['hackathons', 'workshops', 'celebrations', 'events'];

  return (
    <div className="adm-tab-content">
      <div className="adm-section">
        <h2>{editing ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
        {msg && <div className="adm-flash">{msg}</div>}
        <form onSubmit={save} className="adm-form">
          <div className="adm-form-grid">
            <div className="adm-field adm-full"><label>Title</label><input value={form.title} onChange={f('title')} placeholder="Photo title" required /></div>
            <div className="adm-field adm-full"><label>Description</label><textarea value={form.description} onChange={f('description')} rows={2} required /></div>
            <div className="adm-field">
              <label>Category</label>
              <select value={form.category} onChange={f('category')}>
                {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="adm-field"><label>Tag Label</label><input value={form.tag} onChange={f('tag')} placeholder="Hackathon" /></div>
            <div className="adm-field adm-full">
              <label>Google Drive Link (opens when photo is clicked)</label>
              <input value={form.driveLink} onChange={f('driveLink')} placeholder="https://drive.google.com/drive/folders/..." />
            </div>
            <div className="adm-full">
              <ImageUpload label="Photo / Poster" value={form.image} onChange={f('image')} />
            </div>
          </div>
          <div className="adm-form-actions">
            {editing && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditing(null); setForm({ title: '', description: '', category: 'hackathons', image: '', tag: '', driveLink: '' }); }}>Cancel</button>}
            <button className="adm-btn adm-btn-primary" disabled={loading}>{loading ? 'Saving…' : editing ? 'Update Item' : 'Add Item'}</button>
          </div>
        </form>
      </div>

      <div className="adm-section">
        <h2>All Gallery Items ({items.length})</h2>
        <div className="adm-cards">
          {items.map((item, idx) => (
            <div className="adm-card" key={item._id || idx}>
              <img src={item.image} alt={item.title} className="adm-card-img" onError={e => e.target.style.display = 'none'} />
              <div className="adm-card-body">
                <span className="adm-badge">{item.tag || item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.driveLink && (
                  <a href={item.driveLink} target="_blank" rel="noopener noreferrer" className="adm-drive-link">
                    📁 Drive Link
                  </a>
                )}
              </div>
              {item._id && (
                <div className="adm-card-actions">
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => edit(item)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => del(item._id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Announcements & Pop-up Updates Tab ───────────────────────────────────────
function AnnouncementsTab() {
  const initialForm = {
    title: '',
    description: '',
    tag: 'REGISTRATION OPEN',
    tagColor: '#00ea64',
    time: 'Live Now',
    link: '',
    buttonText: 'Register Now',
    image: '',
    showAsPopup: true,
    active: true
  };

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const load = useCallback(async () => {
    try {
      setItems(await apiFetch('/announcements/all', { headers: authHeader() }));
    } catch {
      // In case admin endpoint fails, try public endpoint
      try {
        setItems(await apiFetch('/announcements'));
      } catch {}
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) {
        await apiFetch(`/announcements/${editing}`, { method: 'PUT', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Announcement & Pop-up Updated!');
      } else {
        await apiFetch('/announcements', { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
        flash('✅ Announcement & Pop-up Created!');
      }
      setEditing(null);
      setForm(initialForm);
      load();
    } catch (e) { flash('❌ ' + e.message); }
    finally { setLoading(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title || '',
      description: item.description || '',
      tag: item.tag || 'REGISTRATION OPEN',
      tagColor: item.tagColor || '#00ea64',
      time: item.time || '',
      link: item.link || '',
      buttonText: item.buttonText || 'Register Now',
      image: item.image || '',
      showAsPopup: item.showAsPopup !== undefined ? item.showAsPopup : true,
      active: item.active !== undefined ? item.active : true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try { await apiFetch(`/announcements/${id}`, { method: 'DELETE', headers: authHeader() }); flash('🗑 Deleted'); load(); }
    catch (e) { flash('❌ ' + e.message); }
  };

  const f = (k) => (v) => setForm(prev => ({
    ...prev,
    [k]: typeof v === 'object' && v.target
      ? (v.target.type === 'checkbox' ? v.target.checked : v.target.value)
      : v
  }));

  return (
    <div className="adm-tab-content">
      {/* Quick Info Banner */}
      <div className="adm-info-card">
        <span style={{ fontSize: '1.4rem' }}>💡</span>
        <div>
          <strong>Entrance Pop-up Window Control:</strong> Any announcement with <strong>"Show as On-Entry Pop-up"</strong> enabled will automatically greet visitors with this update and direct registration link when they open the site!
        </div>
      </div>

      <div className="adm-section">
        <h2>{editing ? '✏️ Edit Announcement / Event Pop-up' : '➕ Create New Announcement & Pop-up'}</h2>
        {msg && <div className="adm-flash">{msg}</div>}
        <form onSubmit={save} className="adm-form">
          <div className="adm-form-grid">
            <div className="adm-field adm-full">
              <label>Announcement / Event Title *</label>
              <input
                value={form.title}
                onChange={f('title')}
                placeholder="e.g. CodeStorm 2026: Campus Royale Registrations Are Live!"
                required
              />
            </div>

            <div className="adm-field adm-full">
              <label>Event Description / Update Details (Shown in Pop-up Window)</label>
              <textarea
                value={form.description}
                onChange={f('description')}
                rows={3}
                placeholder="Explain the event details, rules, prize pool (e.g. ₹25,000 Cash Pool), eligibility, and why students should register..."
              />
            </div>

            <div className="adm-field">
              <label>Tag / Badge (e.g. REGISTRATION OPEN, HACKATHON, URGENT)</label>
              <input
                value={form.tag}
                onChange={f('tag')}
                placeholder="REGISTRATION OPEN"
                required
              />
            </div>

            <div className="adm-field">
              <label>Tag Badge Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="color"
                  value={form.tagColor}
                  onChange={f('tagColor')}
                  style={{ width: '50px', height: '42px', padding: '2px', cursor: 'pointer' }}
                />
                <span style={{ fontFamily: 'monospace', color: form.tagColor }}>{form.tagColor}</span>
              </div>
            </div>

            <div className="adm-field">
              <label>Date / Time / Status</label>
              <input
                value={form.time}
                onChange={f('time')}
                placeholder="e.g. Oct 15, 2026 or Live Now"
                required
              />
            </div>

            <div className="adm-field">
              <label>Registration / Event Redirect Link</label>
              <input
                value={form.link}
                onChange={f('link')}
                placeholder="https://unstop.com/... or Google Form link"
              />
            </div>

            <div className="adm-field">
              <label>CTA Button Label</label>
              <input
                value={form.buttonText}
                onChange={f('buttonText')}
                placeholder="Register Now (default)"
              />
            </div>

            <div className="adm-full">
              <ImageUpload
                label="Poster / Event Banner Image (Optional for Pop-up)"
                value={form.image}
                onChange={f('image')}
              />
            </div>

            <div className="adm-field adm-full" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', background: 'rgba(0,0,0,0.2)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <label className="adm-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}>
                <input
                  type="checkbox"
                  checked={form.showAsPopup}
                  onChange={f('showAsPopup')}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#00ea64' }}
                />
                ✨ Show as On-Entry Pop-up Window
              </label>

              <label className="adm-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={f('active')}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#00ea64' }}
                />
                🟢 Active (Visible on Website)
              </label>
            </div>
          </div>

          <div className="adm-form-actions">
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              onClick={() => setPreviewItem(form)}
            >
              👁️ Preview Pop-up
            </button>
            {editing && (
              <button
                type="button"
                className="adm-btn adm-btn-ghost"
                onClick={() => { setEditing(null); setForm(initialForm); }}
              >
                Cancel
              </button>
            )}
            <button className="adm-btn adm-btn-primary" disabled={loading}>
              {loading ? 'Saving…' : editing ? 'Update Announcement' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </div>

      <div className="adm-section">
        <h2>Announcements & Pop-ups ({items.length})</h2>
        <div className="adm-cards">
          {items.map((item, idx) => (
            <div className="adm-card" key={item._id || idx}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="adm-card-img"
                  style={{ height: '140px', objectFit: 'cover' }}
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              <div className="adm-card-body">
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span className={`adm-badge ${item.active ? '' : 'inactive'}`}>
                    {item.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  {item.showAsPopup && (
                    <span className="adm-badge" style={{ backgroundColor: 'rgba(0, 234, 100, 0.2)', color: '#00ea64', border: '1px solid #00ea64' }}>
                      POP-UP ON
                    </span>
                  )}
                  <span className="adm-badge" style={{ backgroundColor: item.tagColor || '#00ea64', color: '#000' }}>
                    {item.tag}
                  </span>
                </div>
                <p style={{ margin: '6px 0', fontSize: '1rem' }}>
                  <strong>{item.title}</strong>
                </p>
                {item.time && (
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 6px 0' }}>
                    📅 {item.time}
                  </p>
                )}
                {item.description && (
                  <p style={{ fontSize: '0.84rem', color: '#cbd5e1', margin: '6px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="adm-drive-link" style={{ marginTop: '8px', display: 'inline-block' }}>
                    🔗 Registration / Link ({item.buttonText || 'Register'})
                  </a>
                )}
              </div>
              {item._id && (
                <div className="adm-card-actions">
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => setPreviewItem(item)}>👁️ View</button>
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => edit(item)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => del(item._id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Interactive Pop-up Preview Modal */}
      {previewItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(4, 8, 16, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setPreviewItem(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              background: 'linear-gradient(145deg, #0d1527 0%, #080d19 100%)',
              border: '1px solid rgba(0, 234, 100, 0.3)',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0,234,100,0.15)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', background: `${previewItem.tagColor || '#00ea64'}22`, color: previewItem.tagColor || '#00ea64', border: `1px solid ${previewItem.tagColor || '#00ea64'}66` }}>
                  ● {previewItem.tag || 'UPDATE'}
                </span>
                {previewItem.time && <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{previewItem.time}</span>}
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#cbd5e1', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >
                ✕
              </button>
            </div>
            {previewItem.image && (
              <img
                src={previewItem.image}
                alt="Banner"
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '20px 24px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 10px 0' }}>
                {previewItem.title || 'Announcement Title'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                {previewItem.description || 'No description provided.'}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,13,25,0.7)' }}>
              <button
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setPreviewItem(null)}
              >
                Close Preview
              </button>
              {previewItem.link ? (
                <a
                  href={previewItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#00ea64', color: '#040810', padding: '8px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {previewItem.buttonText || 'Register Now'} ↗
                </a>
              ) : (
                <button
                  style={{ background: '#00ea64', color: '#040810', padding: '8px 20px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                  onClick={() => setPreviewItem(null)}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Team Tab ─────────────────────────────────────────────────────────────
function TeamTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '', role: '', badgeClass: 'badge-lead', bio: '', avatar: '',
    nodePosition: 'right', order: 0,
    github: '', linkedin: ''
  });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    try { setItems(await apiFetch('/team')); } catch { }
  }, []);
  useEffect(() => { load(); }, [load]);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = {
        name: form.name,
        role: form.role,
        badgeClass: form.badgeClass,
        bio: form.bio,
        avatar: form.avatar,
        nodePosition: form.nodePosition,
        order: form.order,
        socials: { github: form.github, linkedin: form.linkedin }
      };

      if (editing) {
        await apiFetch(`/team/${editing}`, { method: 'PUT', headers: authHeader(), body: JSON.stringify(payload) });
        flash('✅ Updated!');
      } else {
        await apiFetch('/team', { method: 'POST', headers: authHeader(), body: JSON.stringify(payload) });
        flash('✅ Created!');
      }
      setEditing(null);
      setForm({ name: '', role: '', badgeClass: 'badge-lead', bio: '', avatar: '', nodePosition: 'right', order: 0, github: '', linkedin: '' });
      load();
    } catch (e) { flash('❌ ' + e.message); }
    finally { setLoading(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({
      name: item.name, role: item.role, badgeClass: item.badgeClass || 'badge-lead',
      bio: item.bio, avatar: item.avatar, nodePosition: item.nodePosition || 'right', order: item.order || 0,
      github: item.socials?.github || '', linkedin: item.socials?.linkedin || ''
    });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try { await apiFetch(`/team/${id}`, { method: 'DELETE', headers: authHeader() }); flash('🗑 Deleted'); load(); }
    catch (e) { flash('❌ ' + e.message); }
  };

  const f = (k) => (v) => setForm(prev => ({ ...prev, [k]: typeof v === 'object' && v.target ? v.target.value : v }));

  const badges = ['badge-lead', 'badge-tech', 'badge-code', 'badge-design', 'badge-community', 'badge-event'];

  return (
    <div className="adm-tab-content">
      <div className="adm-section">
        <h2>{editing ? 'Edit Team Member' : 'Add Team Member'}</h2>
        {msg && <div className="adm-flash">{msg}</div>}
        <form onSubmit={save} className="adm-form">
          <div className="adm-form-grid">
            <div className="adm-field"><label>Name</label><input value={form.name} onChange={f('name')} placeholder="e.g. Alex Mercer" required /></div>
            <div className="adm-field"><label>Role</label><input value={form.role} onChange={f('role')} placeholder="e.g. Chapter Lead" required /></div>
            <div className="adm-field">
              <label>Badge Class</label>
              <select value={form.badgeClass} onChange={f('badgeClass')}>
                {badges.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="adm-field">
              <label>Node Position (Timeline Side)</label>
              <select value={form.nodePosition} onChange={f('nodePosition')}>
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </div>
            <div className="adm-field adm-full"><label>Bio</label><textarea value={form.bio} onChange={f('bio')} rows={2} required /></div>
            <div className="adm-field"><label>GitHub URL</label><input value={form.github} onChange={f('github')} placeholder="https://github.com/..." /></div>
            <div className="adm-field"><label>LinkedIn URL</label><input value={form.linkedin} onChange={f('linkedin')} placeholder="https://linkedin.com/in/..." /></div>

            <div className="adm-field"><label>Order (Sorting)</label><input type="number" value={form.order} onChange={f('order')} /></div>
            <div className="adm-full">
              <ImageUpload label="Avatar / Profile Picture" value={form.avatar} onChange={f('avatar')} />
            </div>
          </div>
          <div className="adm-form-actions">
            {editing && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => { setEditing(null); setForm({ name: '', role: '', badgeClass: 'badge-lead', bio: '', avatar: '', nodePosition: 'right', order: 0, github: '', linkedin: '' }); }}>Cancel</button>}
            <button className="adm-btn adm-btn-primary" disabled={loading}>{loading ? 'Saving…' : editing ? 'Update Member' : 'Add Member'}</button>
          </div>
        </form>
      </div>

      <div className="adm-section">
        <h2>Team Members ({items.length})</h2>
        <div className="adm-cards">
          {items.map((item, idx) => (
            <div className="adm-card" key={item._id || idx}>
              <img src={item.avatar} alt={item.name} className="adm-card-img" style={{ height: '150px', objectFit: 'contain', backgroundColor: '#0e141e' }} onError={e => e.target.style.display = 'none'} />
              <div className="adm-card-body">
                <span className="adm-badge">{item.badgeClass}</span>
                <h3>{item.name}</h3>
                <p><strong>{item.role}</strong></p>
                <p style={{ fontSize: '0.8rem' }}>{item.bio}</p>
              </div>
              {item._id && (
                <div className="adm-card-actions">
                  <button className="adm-btn adm-btn-sm adm-btn-secondary" onClick={() => edit(item)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => del(item._id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [activeTab, setActiveTab] = useState('highlights');

  const logout = () => { localStorage.removeItem('admin_token'); setLoggedIn(false); };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const tabs = [
    { id: 'highlights', label: '🌟 Highlights' },
    { id: 'events', label: '📅 Events' },
    { id: 'gallery', label: '🖼 Gallery' },
    { id: 'announcements', label: '📢 Announcements' },
    { id: 'team', label: '👥 Team' },
  ];

  return (
    <div className="adm-root">
      <header className="adm-header">
        <div className="adm-header-inner">
          <div className="adm-header-brand">
            <span className="adm-logo-icon">⚡</span>
            <span>HackerRank VIIT — Admin</span>
          </div>
          <nav className="adm-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`adm-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button className="adm-btn adm-btn-ghost adm-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="adm-main">
        {activeTab === 'highlights' && <HighlightsTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'announcements' && <AnnouncementsTab />}
        {activeTab === 'team' && <TeamTab />}
      </main>
    </div>
  );
}
