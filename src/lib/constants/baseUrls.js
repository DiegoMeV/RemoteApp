import { toBoolean } from '../funcs'

export const baseUrls = {
  urlUsers: `${import.meta.env.VITE_API_USERS}`,
  urlProcess: `${import.meta.env.VITE_API_PROCESS}`,
  urlFiscalizacion: `${import.meta.env.VITE_API_FISCALIZACION}`,
  urlDocuments: `${import.meta.env.VITE_API_DOCUMENTS}`,
  urlApps: `${import.meta.env.VITE_API_APPS}`,
  urlCgr: `${import.meta.env.VITE_API_CGR_ALERTAS}`,
  urlCgrInt: `${import.meta.env.VITE_API_CGR_INIT}`,
  urlComunnications: `${import.meta.env.VITE_API_COMMUNICATIONS}`,
  urlGroupReq: `${import.meta.env.VITE_ID_GROUP_PROCESS_CGR_REQ}`,
  urlOracleApi: `${import.meta.env.VITE_ORACLE_API}`,
  urlRentasApi: `${import.meta.env.VITE_API_RENTAS}`,
  urlPayments: `${import.meta.env.VITE_API_PAYMENTS}`,
  urlMegMag: `${import.meta.env.VITE_API_MED_MAG}`,
  chunk_size: `${import.meta.env.VITE_CHUNK_SIZE}`,
}

export const authVar = {
  default: import.meta.env.VITE_DEFAULT_AUTHENTICATION
    ? `${import.meta.env.VITE_DEFAULT_AUTHENTICATION}`
    : null,
  options: `${import.meta.env.VITE_AUTHENTICATION_OPTIONS}`,
  twoFactor: import.meta.env.VITE_TWO_FACTOR_AUTHENTICATION
    ? toBoolean(import.meta.env.VITE_TWO_FACTOR_AUTHENTICATION)
    : null,
}

export const development = import.meta.env.VITE_DEVELOPMENT
export const idGroupRethus = import.meta.env.VITE_ID_GROUP_RETHUS

export const recaptchaKeys = {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  secretKey: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
}
