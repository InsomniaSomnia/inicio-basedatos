# Registro e Inicio de Sesión

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.app/)
[![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/)

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
