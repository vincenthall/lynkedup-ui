const fs = require('fs')
fs.writeFileSync(
  './.env',
  `LARAVEL_ENDPOINT=${process.env.LARAVEL_ENDPOINT}\n
  PASSPORT_PASSWORD_GRANT_ID=${process.env.PASSPORT_PASSWORD_GRANT_ID}\n
  PASSPORT_PASSWORD_GRANT_SECRET=${process.env.PASSPORT_PASSWORD_GRANT_SECRET}\n`
)
