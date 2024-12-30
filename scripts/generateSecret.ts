import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const envPath = path.resolve(process.cwd(), '.env')

// 🛡️ Générer une clé secrète sécurisée
const JWT_SECRET = crypto.randomBytes(32).toString('hex')

try {
  let envContent = ''
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8')
  }

  // Mettre à jour ou ajouter JWT_SECRET
  if (envContent.includes('JWT_SECRET=')) {
    envContent = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${JWT_SECRET}`)
  } else {
    envContent += `\nJWT_SECRET=${JWT_SECRET}`
  }

  fs.writeFileSync(envPath, envContent)
  console.log('✅ Nouveau JWT_SECRET généré avec succès et ajouté à .env')
} catch (error) {
  console.error('❌ Erreur lors de la génération du JWT_SECRET :', error)
  process.exit(1)
}
