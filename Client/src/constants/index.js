export const API_BASE_URL = process.env.NODE_ENV === 'prod' ? 'http://' + import.meta.env.VITE_PUBLIC_IP + ':8080' : 'http://localhost:8080';
