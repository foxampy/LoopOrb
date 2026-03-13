// Client-side API utilities for frontend
// Use this for all API calls from React components

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Include cookies for auth
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || `HTTP ${response.status}`,
      response.status,
      errorData.details
    );
  }

  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new ApiError(data.error || "Request failed", response.status, data.details);
  }

  return data.data as T;
}

// API client object with typed methods
export const api = {
  // GET request
  get: <T>(endpoint: string) => 
    fetchApi<T>(endpoint, { method: "GET" }),

  // POST request
  post: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // PUT request
  put: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // PATCH request
  patch: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // DELETE request
  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, { method: "DELETE" }),
};

// Typed API methods for common operations
export const apiClient = {
  // Auth
  auth: {
    me: () => api.get<{ user: { id: string; name: string; email: string; role: string; avatar?: string; unityBalance: number } }>("/api/auth/me"),
    login: (email: string, password: string) =>
      api.post("/api/auth/login", { email, password }),
    register: (data: { name: string; email: string; password: string }) =>
      api.post("/api/auth/register", data),
    logout: () => api.post("/api/auth/logout"),
    telegram: (initData: string) =>
      api.post("/api/auth/telegram", { initData }),
  },

  // Wallet
  wallet: {
    get: () => api.get<{ balance: number; staked: number; totalEarned: number }>("/api/wallet"),
    stake: (projectId: string, amount: number) =>
      api.post("/api/wallet/stake", { projectId, amount }),
    unstake: (stakingId: string) =>
      api.post("/api/wallet/unstake", { stakingId }),
    transactions: () => api.get("/api/wallet/transactions"),
  },

  // Projects
  projects: {
    list: () => api.get("/api/projects"),
    get: (slug: string) => api.get(`/api/projects/${slug}`),
    create: (data: unknown) => api.post("/api/projects", data),
  },

  // Objects
  objects: {
    list: () => api.get("/api/objects"),
    get: (id: string) => api.get(`/api/objects/${id}`),
    create: (data: unknown) => api.post("/api/objects", data),
    addData: (id: string, data: unknown) =>
      api.post(`/api/objects/${id}/data`, data),
  },

  // DAO
  dao: {
    proposals: () => api.get("/api/dao"),
    get: (id: string) => api.get(`/api/dao/${id}`),
    create: (data: unknown) => api.post("/api/dao", data),
    vote: (id: string, voteType: "FOR" | "AGAINST" | "ABSTAIN") =>
      api.post(`/api/dao/${id}/vote`, { voteType }),
  },

  // Feed
  feed: {
    list: () => api.get("/api/feed"),
    create: (content: string) => api.post("/api/feed", { content }),
    like: (postId: string) => api.post(`/api/feed/${postId}/like`),
  },

  // Missions
  missions: {
    list: () => api.get("/api/missions"),
    complete: (id: string) => api.post(`/api/missions/${id}/complete`),
  },

  // Notifications
  notifications: {
    list: () => api.get("/api/notifications"),
    markRead: (id: string) => api.patch(`/api/notifications/${id}/read`),
    markAllRead: () => api.patch("/api/notifications/read-all"),
  },
};

export { ApiError };
export default api;
