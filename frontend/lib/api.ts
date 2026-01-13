import axios from 'axios';

/* ---------------- Base API ---------------- */
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in .env');
}

/* ---------------- Axios instance ---------------- */
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ---------------- Navigation ---------------- */
export const getNavigation = async () => {
  const res = await api.get('/');
  return res.data;
};

/* ---------------- Categories ---------------- */
export const getCategoriesByNavigation = async (slug: string) => {
  const res = await api.get(`/categories/${slug}`);
  return res.data;
};

/* ---------------- Products list ---------------- */
export const getProducts = async (params: {
  category: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get('/products', { params });
  return res.data;
};

/* ---------------- Product detail ---------------- */
export const getProductDetail = async (sourceId: string) => {
  const res = await api.get(`/products/${sourceId}`);
  return res.data;
};

/* ---------------- Refresh product (BONUS) ---------------- */
export const refreshProduct = async (sourceId: string) => {
  const res = await api.post(`/products/${sourceId}/refresh`);
  return res.data;
};

/* ---------------- View history (BONUS) ---------------- */
export const saveViewHistory = async (payload: {
  sessionId: string;
  productId: string;
}) => {
  const res = await api.post('/api/history', payload);
  return res.data;
};
