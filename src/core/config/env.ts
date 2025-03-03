const requiredEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
};

export const config = {
  api: {
    url: requiredEnvVar('VITE_API_URL'),
    timeout: 30000,
    useMock: requiredEnvVar('VITE_USE_MOCK') === 'true',
  },
  auth: {
    tokenKey: 'token',
  }
} as const;

export type Config = typeof config;