import api from '../services/backend.service.js'

// Se definen las categorías
const CATEGORIES = [
    { name: 'Jardinería', icon: 'bi-tree' },
    { name: 'Limpieza', icon: 'bi-droplet' },
    { name: 'Piscinero', icon: 'bi-water' },
    { name: 'Carpintería', icon: 'bi-hammer' },
    { name: 'Mantenimiento', icon: 'bi-wrench' },
    { name: 'Plomería', icon: 'bi-tools' }
];

// función que trae las ofertas del backend
export async function offers(req, res) {
    try {
        const response = await api.get('/ofertas')
        const offersData = response.data || []
        const total = response.data || 0
        res.render('pages/offers', { categorias: CATEGORIES, offers: offersData, total, title: 'Ofertas Disponibles', formatDate })
    } catch (error) {
        console.error('Error al renderizar las ofertas', error.message)
        res.status(500).render('pages/offers', { categorias: CATEGORIES, offers: [], total: 0, title: 'Ofertas Disponibles', error: 'No se pudo cargar las ofertas', formatDate })
    }
}

// función que formatea la fecha para que sea númerica, ej. 08/07/2025
export function formatDate(dateInput) {
    if (!dateInput) return '-'
    const date = new Date(dateInput)
    if (isNaN(date)) return '-'
    return date.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric'})
}

// función que trae una oferta específica
export async function offersDetails(req, res) {
    try {
        const response = await api.get(`/ofertas/${req.params.id}`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'Error al traer oferta' })
    }
}