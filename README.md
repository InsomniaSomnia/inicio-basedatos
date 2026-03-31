# Registro e Inicio de Sesión

Sistema de autenticación fullstack con registro, login y rutas protegidas mediante JWT. Construido con Node.js, Express y Supabase como base de datos.

---

## Tecnologías

- **Node.js** + **Express** — servidor y rutas
- **Supabase** — base de datos PostgreSQL en la nube
- **bcryptjs** — hasheo seguro de contraseñas
- **jsonwebtoken** — autenticación con tokens JWT
- **dotenv** — gestión de variables de entorno
- **HTML / CSS / JS** — interfaz de usuario

---

## Estructura del proyecto

```
INICIO_BASEDATOS/
├── middleware/
│   └── autenticacion_middleware.js  # Validación de JWT
├── public/
│   ├── css/
│   │   ├── styles.css               # Estilos login/registro
│   │   └── dashboard.css            # Estilos dashboard
│   ├── img/
│   │   └── background.jpg           # Imagen de fondo
│   ├── js/
│   │   └── app.js                   # Lógica del frontend
│   ├── index.html                   # Vista login/registro
│   └── dashboard.html               # Vista tras iniciar sesión
├── .env                             # Variables de entorno 
├── .env.example                     # Plantilla de variables
├── .gitignore
├── package.json
└── servidor.js                      # Servidor principal
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/inicio-basedatos.git
cd inicio-basedatos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el `.env.example`:

```bash
cp .env.example .env
```

Luego edita el `.env` con tus credenciales:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key
JWT_SECRET=tu_secreto_jwt
```

### 4. Configurar Supabase

En tu proyecto de Supabase, crea la tabla `usuarios` con el siguiente esquema:

```sql
create table public.usuarios (
  id       uuid not null default gen_random_uuid(),
  username text not null,
  password text null,
  constraint usuarios_pkey primary key (id)
) tablespace pg_default;
```

### 5. Iniciar el servidor

```bash
node servidor.js
```

El servidor quedará corriendo en [http://localhost:3000](http://localhost:3000).

---

## Endpoints

| Método | Ruta                | Descripción                              | Auth requerida |
|--------|---------------------|------------------------------------------|----------------|
| POST   | `/register`         | Registra un nuevo usuario                | No             |
| POST   | `/login`            | Inicia sesión y devuelve un token JWT    | No             |
| GET    | `/recurso-protegido`| Accede a un recurso protegido            | Sí (Bearer JWT)|

### Ejemplo — Registro

```json
POST /register
Content-Type: application/json

{
  "username": "jorman",
  "password": "MiContraseña123"
}
```

### Ejemplo — Login

```json
POST /login
Content-Type: application/json

{
  "username": "jorman",
  "password": "MiContrasena123"
}
```

Respuesta:

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Ejemplo — Recurso protegido

```
GET /recurso-protegido
Authorization: Bearer <token>
```

---

## Seguridad

- Las contraseñas se almacenan **hasheadas con bcrypt** (salt rounds: 10).
- La autenticación usa **JWT** con expiración de 1 hora.
- El archivo `.env` está excluido del repositorio mediante `.gitignore`.
- El middleware `autenticarToken` valida el token en cada ruta protegida.

---

## Interfaz

La interfaz incluye:

- Vista de **registro** con medidor de fortaleza de contraseña y validación de confirmación.
- Vista de **login** con toggle para mostrar/ocultar contraseña.
- **Redirección automática** a `dashboard.html` tras un login exitoso.
- **Protección de ruta** en el dashboard — redirige al login si no hay token.
- Botón de **cerrar sesión** que limpia el token del localStorage.
