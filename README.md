# Registro e Inicio de Sesión

Sistema de autenticación web desarrollado como proyecto universitario. Permite a los usuarios registrarse, iniciar sesión y acceder a recursos protegidos mediante tokens JWT.

El proyecto está desplegado y funciona en producción en:
**https://inicio-basedatos-production.up.railway.app**

---

## Descripción

La aplicación cuenta con un frontend con diseño glassmorphism que incluye validación de contraseñas en tiempo real, medidor de fortaleza y navegación entre vistas de registro y login. El backend gestiona la autenticación de forma segura: las contraseñas se almacenan hasheadas con bcrypt y el acceso a rutas protegidas requiere un token JWT válido. Los datos de los usuarios se almacenan en Supabase (PostgreSQL).

---

## Tecnologías

- **Node.js** + **Express** — servidor y API REST
- **Supabase** — base de datos PostgreSQL en la nube
- **bcryptjs** — hasheo de contraseñas
- **jsonwebtoken** — autenticación con JWT
- **Railway** — despliegue del servidor en producción
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
----

## Autor

Desarrollado por Jorman R. Torres Pertuz
