const fs = require('fs')

fs.writeFileSync(
  './.env',
  `PASSPORT_PASSWORD_GRANT_ID=${process.env.PASSPORT_PASSWORD_GRANT_ID}\n`
)
fs.writeFileSync(
  './.env',
  `PASSPORT_PASSWORD_GRANT_SECRET=${process.env.PASSPORT_PASSWORD_GRANT_SECRET}\n`
)
