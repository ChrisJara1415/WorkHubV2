import api from "../services/backend.service.js"

export async function login(req, res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password requeridos' })
        }
        const response = await api.post('/login', { email, password })
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message})
    }
}