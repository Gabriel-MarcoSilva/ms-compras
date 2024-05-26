import express from 'express'
import './infra/providers/kafka/consumers'
import { router } from './infra/routes'
const PORT = process.env.PORT ?? 3001

const app = express()

app.use(express.json())
app.use(router) // usar as rotas

app.listen(PORT, () => console.log('Server pedidos is running on port:', PORT))