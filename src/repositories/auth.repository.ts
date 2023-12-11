export const AUTH_STORAGE_KEY = 'AUTH';

export interface Auth {
  token: string;
}

function persistAuth(auth: Auth): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

function getAuth(): Auth | undefined {
  const auth = localStorage.getItem(AUTH_STORAGE_KEY);
  return auth ? JSON.parse(auth) : undefined;
}

async function removeAuth(): Promise<void> {
  return await localStorage.removeItem(AUTH_STORAGE_KEY);
}

export const AuthRepository = {
  persistAuth,
  getAuth,
  removeAuth,
};
