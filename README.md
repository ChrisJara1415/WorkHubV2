## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ChrisJara1415/WorkHubV2.git
   cd WorkHubV2
   ```

2. Instala dependencias para backend y frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   cd ..
   ```

3. Configurar las variables de entorno

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Backend
PORT_BACK=6061
NAME_DB=WorkHub
PASS_DB=Edqbau7aSDXOBKB5 

# Frontend
PORT_FRONT=6060
BACK_BASE_URL=http://localhost:6061  # URL del backend
```

- `PORT_BACK`: Puerto donde corre el servidor backend.
- `NAME_DB`: Nombre de la base de datos MongoDB.
- `PASS_DB`: Contraseña para conectar a MongoDB.
- `PORT_FRONT`: Puerto donde corre el servidor frontend.
- `BACK_BASE_URL`: URL base del backend para que el frontend haga peticiones.

## Cómo Ejecutar

1. Inicia el backend:
   ```bash
   cd backend
   npm run dev
   ```

2. En otra terminal, inicia el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Abre el navegador en `http://localhost:6060`.


### Iniciar sesión
Inicia sesión. Envía `{ "email": "user@example.com", "password": "password123" }`.

## Rutas del Frontend

El frontend renderiza vistas EJS. Accede via navegador:

- `/`: Página de inicio (landing page).
- `/ofertas`: Lista ofertas (empleados).
- `/empleador`: Dashboard empleadores.
- `/login`: Procesa login (desde modal).

## Notas Adicionales

Si tienes problemas, verifica que los puertos no estén ocupados y que `.env` esté configurado.