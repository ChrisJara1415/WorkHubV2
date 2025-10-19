import api from "../services/backend.service.js"

export async function sendApplyment(req, res) {
    try {
        const response = await api.post('/postulaciones', req.body)
        res.json(response.data)
    } catch (error) {
        console.error('Error posting application:', error)
        res.status(500).json({ error: 'Error posting application' })
    }
}