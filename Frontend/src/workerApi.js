const WORKER_BASE = 'http://localhost:5000/api/workers';

// Register new worker (with optional profile photo)
export async function workerSignup(formData) {
  const res = await fetch(`${WORKER_BASE}/signup`, {
    method: 'POST',
    body: formData, // formData should include optional photo
    credentials: 'include', // Recommended for CORS consistency
  });
  return res.json();
}

// Login worker
export async function workerLogin(credentials) {
  const res = await fetch(`${WORKER_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include', // Recommended if using cookies (or future use)
  });
  return res.json();
}

// Get worker profile using JWT token
export async function getWorkerProfile(token) {
  const res = await fetch(`${WORKER_BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // ✅ Needed for authenticated CORS requests
  });
  return res.json();
}

// Update worker profile (name, phone, city, photo)
export async function updateWorkerProfile(token, formData) {
  const res = await fetch(`${WORKER_BASE}/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // ✅ Needed for authenticated CORS requests
    body: formData,
  });
  return res.json();
}

// Get all workers (public route)
export async function getAllWorkers() {
  const res = await fetch(`${WORKER_BASE}/all`, {
    credentials: 'include', // Optional but safe for CORS behavior
  });
  return res.json();
}
