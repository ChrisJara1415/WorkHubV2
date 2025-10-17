import api from '../services/backend.service.js'

export async function landingPage(req, res) {
    try {
        const landing = await api.get('/')
        res.render('pages/landingPage', {landing, title: 'WorkHub - Inicio'})
    } catch (error) {
        console.error('Error al renderizar la landingPage', error.message)
        res.status(500).render('pages/landingPage', {landing: null, title: 'Workhub - Inicio', error: 'No se pudo cargar la landing page'})
    }
}

export async function offers(req, res) {
    try {
        const offers = await api.get('/ofertas')
        res.render('pages/offers', {offers, title: 'Ofertas Disponibles'})
    } catch (error) {
        console.error('Error al renderizar las ofertas', error.message)
        res.status(500).render('pages/offers', {offers: [], title: 'Ofertas Disponibles', error: 'No se pudo cargar las ofertas'})
    }
}