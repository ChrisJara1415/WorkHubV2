import exp from "express";
import morgan from "morgan";
import globalRouter from './routers/globalRoutes.router.js'
process.loadEnvFile('../.env')

const app = exp()
const PORT_BACK = process.env.PORT_BACK

app.use(exp.json({ limit: '8mb' }))
app.use(morgan('dev'))
app.use('/', globalRouter)

app.listen(PORT_BACK, () => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT_BACK}`)
        console.log(`Servidor disponible en http://localhost:${PORT_BACK}`)
    } catch (error) {
        console.error({message: 'Error al inicializar servidor', error: error.message})
    }
})