declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_SERVER_PORT: string
      CRM_URL: string
      // CRM_TOKEN: string
      // CRM_MAXDATA_APP_API_KEY: string
      JWT_SECRET_KEY: string
    }
  }
}

export {}
