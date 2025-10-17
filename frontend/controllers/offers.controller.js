import api from '../services/backend.service.js'

const CATEGORIES = [
    { name: 'Jardinería', icon: 'bi-tree' },
    { name: 'Limpieza', icon: 'bi-droplet' },
    { name: 'Piscinero', icon: 'bi-water' },
    { name: 'Carpintería', icon: 'bi-hammer' },
    { name: 'Mantenimiento', icon: 'bi-wrench' },
    { name: 'Plomería', icon: 'bi-tools' }
];
export async function offers(req, res) {
    try {
        const offers = await api.get('/ofertas')
        res.render('pages/offers', { categorias: CATEGORIES, offers, title: 'Ofertas Disponibles' })
    } catch (error) {
        console.error('Error al renderizar las ofertas', error.message)
        res.status(500).render('pages/offers', { categorias: CATEGORIES, offers: [], title: 'Ofertas Disponibles', error: 'No se pudo cargar las ofertas' })
    }
}

export function formatDate(dateInput) {
    if (!dateInput) return '-'
    const date = new Date(dateInput)
    if (isNaN(date)) return '-'
    return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric'})
}