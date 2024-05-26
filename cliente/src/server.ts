import express from 'express'
import './infra/provider/kafka/consumer/index'
import { router } from './infra/routes'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.json())
app.use(router) // usar as rotas

app.listen(PORT, () => console.log('Server cliente is running on port:', PORT))