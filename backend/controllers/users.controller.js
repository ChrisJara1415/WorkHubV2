import user from '../models/users.model.js'
import contracts from '../models/contracts.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
        const { nombres, apellidos, email, telefono, password, fechaRegistro, rol, municipio, direccion, seguridadSocial } = req.body
        const nuevoUsuario = new user({ nombres, apellidos, email, telefono, password, fechaRegistro, rol, municipio, direccion, seguridadSocial })
        await nuevoUsuario.save()
        res.status(201).json({
            message: 'Usuario creado correctamente',
            data: nuevoUsuario
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear usuario',
            error: error.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const [users, quantity] = await Promise.all([user.find(), user.countDocuments()])
        res.status(200).json({ number: quantity, data: users })
    } catch (error) {
        res.status(500).json({ message: `Error al obtener usuarios: ${error.message}` })
    }
}

export const getUserById = async (req, res) => {
    try {
        const usuario = await user.findById(req.params.id)

        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })

        res.status(200).json({ data: usuario })
    } catch (error) {
        res.status(500).json({ message: `Error al obtener usuario ${error.message}` })
    }
}

export const updateUser = async (req, res) => {
    try {
        const usuarioActualizado = await user.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' })

        res.status(200).json({ data: usuarioActualizado })

    } catch (error) {
        res.status(500).json({ message: `Error al actualizar usuario ${error.message}` })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        // Bloquear si hay contratos activos
        const activeContracts = await contracts.countDocuments({ $or: [{ 'empleado.idUsuario': userId }, { 'empleador.idUsuario': userId }], estado: 'Activo' })
        if (activeContracts > 0) { return res.status(409).json({ message: 'No se puede eliminar la cuenta: existen contratos activos asociados.' }) }
        const usuarioEliminado = await user.findByIdAndDelete(userId);
        if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar usuario ${error.message}` });
    }
}

export async function login(req, res) {
    const { email, password } = req.body
    const userFound = await user.findOne({ email })
    if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
    }
    const token = jwt.sign({ id: userFound._id }, 'key')
    res.json({ token, rol: userFound.rol })
}