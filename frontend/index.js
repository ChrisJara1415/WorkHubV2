import exp from 'express'
import routes from './routes/landingPage.router.js'
import path from 'path'
process.loadEnvFile('../.env')

const app = exp()
const PORT = process.env.PORT_FRONT

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'views'))

app.use('/static', exp.static(path.join(process.cwd(), 'public')))
app.use('/', routes)

app.listen(PORT, () => console.log(`Frontend escuchando en http://localhost:${PORT}`))