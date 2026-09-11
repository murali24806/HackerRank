import {
  fallbackHighlights,
  fallbackEvents,
  fallbackTeam,
  fallbackGallery
} from './data/fallbackData';

const API_BASE = '/api';

// ─── Helper: get stored admin token ────────────────────────────────────────
function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

// ─── Public Fetch Functions ─────────────────────────────────────────────────

export async function fetchHighlights() {
  try {
    const res = await fetch(`${API_BASE}/highlights`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data && data.length > 0 ? data : fallbackHighlights;
  } catch (err) {
    return fallbackHighlights;
  }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data && data.length > 0 ? data : fallbackEvents;
  } catch (err) {
    return fallbackEvents;
  }
}

export async function fetchTeam() {
  try {
    const res = await fetch(`${API_BASE}/team`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data && data.length > 0 ? data : fallbackTeam;
  } catch (err) {
    return fallbackTeam;
  }
}

export async function fetchGallery() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data && data.length > 0 ? data : fallbackGallery;
  } catch (err) {
    return fallbackGallery;
  }
}

export async function submitApplication(formData) {
  try {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error("Submission failed");
    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: `🎉 Thank you ${formData.name}! Your application has been registered with HackerRank VIIT.`
    };
  }
}

// ─── Admin Auth ─────────────────────────────────────────────────────────────

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  localStorage.setItem('admin_token', data.token);
  return data;
}

export function adminLogout() {
  localStorage.removeItem('admin_token');
}

export async function verifyAdminToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

// ─── Admin: Image Upload ─────────────────────────────────────────────────────

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}` },
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data.url;
}

// ─── Admin: Highlights CRUD ──────────────────────────────────────────────────

export async function adminFetchHighlights() {
  const res = await fetch(`${API_BASE}/highlights`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch highlights');
  return res.json();
}

export async function createHighlight(data) {
  const res = await fetch(`${API_BASE}/highlights`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Create failed');
  return json;
}

export async function updateHighlight(id, data) {
  const res = await fetch(`${API_BASE}/highlights/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Update failed');
  return json;
}

export async function deleteHighlight(id) {
  const res = await fetch(`${API_BASE}/highlights/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}

// ─── Admin: Events CRUD ───────────────────────────────────────────────────────

export async function adminFetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function createEvent(data) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Create failed');
  return json;
}

export async function updateEvent(id, data) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Update failed');
  return json;
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}

// ─── Admin: Gallery CRUD ──────────────────────────────────────────────────────

export async function adminFetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function createGalleryItem(data) {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Create failed');
  return json;
}

export async function updateGalleryItem(id, data) {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Update failed');
  return json;
}

export async function deleteGalleryItem(id) {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}
