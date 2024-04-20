export const API_BASE_URL = process.env.NODE_ENV === 'prod' ? process.env.PUBLIC_IP + ':8080' : 'http://localhost:8080';
