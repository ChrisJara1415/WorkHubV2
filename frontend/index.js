import exp from 'express'
import employerDash from './routes/employerDash.router.js'
import landingPage from './routes/landingPage.router.js'
import offersRoutes from './routes/offers.router.js'
import path from 'path'
import morgan from 'morgan'
process.loadEnvFile('../.env')

const app = exp()
const PORT = process.env.PORT_FRONT

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'views'))

app.use(morgan('dev'))
app.use('/static', exp.static(path.join(process.cwd(), 'public')))
app.use('/', landingPage)
app.use('/ofertas', offersRoutes)
app.use('/empleador', employerDash)

app.listen(PORT, () => console.log(`Frontend escuchando en http://localhost:${PORT}`))