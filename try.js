import fs from 'fs/promises'
import path from 'path'

fs.open(path.join(process.cwd(), 'public', 'photos', '100', '.keep'), 'w').then(file => {
  console.log('Created!')
})
