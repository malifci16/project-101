// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: (window as any).__env.apiUrl,
  featureXEnabled: false
};
