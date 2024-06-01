export const API_BASE_URL = process.env.NODE_ENV === 'prod' ? window.location.origin + ':8080' : 'http://localhost:8080';

export const AWS_LOGIN_URL = process.env.NODE_ENV === 'prod' ? "https://pwr.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=78i4d1l8ouatghoueh5ja0h16l&redirect_uri=" + 'https://' + window.location.hostname
    : "https://pwr.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=78i4d1l8ouatghoueh5ja0h16l&redirect_uri=http://localhost:3000";
export const AWS_REGISTER_URL = process.env.NODE_ENV === 'prod' ? "https://pwr.auth.us-east-1.amazoncognito.com/signup?response_type=code&client_id=78i4d1l8ouatghoueh5ja0h16l&redirect_uri=" + 'https://' + window.location.hostname
    : "https://pwr.auth.us-east-1.amazoncognito.com/signup?response_type=code&client_id=78i4d1l8ouatghoueh5ja0h16l&redirect_uri=http://localhost:3000";
