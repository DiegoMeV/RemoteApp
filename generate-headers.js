const fs = require('fs')
const path = require('path')

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'

const headers = `
/assets/*
  Access-Control-Allow-Origin: ${allowedOrigin}
  Access-Control-Allow-Methods: GET, OPTIONS
  Access-Control-Allow-Headers: *
`

fs.writeFileSync(path.join(__dirname, 'dist', '_headers'), headers)
console.error('✅ Archivo _headers generado con Access-Control-Allow-Origin:', allowedOrigin)
