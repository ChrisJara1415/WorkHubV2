import mongoose from '../config/db.js'

const schema = mongoose.Schema
const userSchema = new schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLength: [150, 'Máximo 150 caracteres'],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: props => `${props.value} contiene caracteres especiales!`
        }
    },

    apellidos: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxLength: [150, 'Máximo 100 caracteres'],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: props => `${props.value} contiene caracteres especiales!`
        }
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo ya existe'],
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: props => `${props.value} no es un correo electrónico válido`
        }
    },

    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        unique: [true, 'El teléfono ya está asociado a otra cuenta'],
        match: [/^3\d{9}$/, 'El teléfono es inválido']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    fechaRegistro: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        default: Date.now,
    },

    rol: {
        type: String,
        required: [true, 'Debe existir un rol'],
        enum: ['empleado', 'empleador', 'admin']
    },

    municipio: {
        type: String,
        enum: ['barbosa', 'copacabana', 'girardota', 'bello', 'medellín', 'envigado', 'itagüí', 'sabaneta', 'la estrella', 'caldas'],
        lowercase: true,
        default: undefined
    },

    direccion: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[-a-zA-Z0-9\s]+$/.test(value);
            },
            message: props => `${props.value} no puede contener caracteres especiales!`
        },
        default: undefined,
        trim: true
    },
},
{
    versionKey: false
})

export default mongoose.model('usuarios', userSchema)