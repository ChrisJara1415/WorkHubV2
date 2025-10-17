import api from '../services/backend.service.js'

export async function offers(req, res) {
    try {
        const offers = await api.get('/ofertas')
        res.render('pages/offers', {offers, title: 'Ofertas Disponibles'})
    } catch (error) {
        console.error('Error al renderizar las ofertas', error.message)
        res.status(500).render('pages/offers', {offers: [], title: 'Ofertas Disponibles', error: 'No se pudo cargar las ofertas'})
    }
}