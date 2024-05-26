import express from 'express'
import { router } from './infra/routes'
const PORT = process.env.PORT ?? 3002

const app = express()

app.use(express.json())
app.use(router) // usar as rotas

app.listen(PORT, () => console.log('Server produto is running on port:', PORT))