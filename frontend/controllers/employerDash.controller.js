import api from '../services/backend.service.js'

export async function employer(req, res) {
    try {
        const employer = api.get()
        res.render('pages/employerDash', {title: 'Dashboard de empleador'})
    } catch (error) {
        console.error('Error al renderizar la landingPage', error.message)
        res.status(500).render('pages/employerDash', {title: 'Workhub - Inicio', error: 'No se pudo cargar el dashboard de empleado'})
    }
}