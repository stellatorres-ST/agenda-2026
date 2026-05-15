# Agenda Institucional 2026 — Deploy en 15 minutos

## PASO 1 — Supabase (base de datos gratis)

1. Entrá a https://supabase.com y creá una cuenta gratuita
2. Creá un nuevo proyecto (elegí cualquier nombre y contraseña)
3. Esperá que termine de crear (~2 min)
4. Andá a **SQL Editor** (menú izquierdo) y pegá el contenido de `supabase_setup.sql` → clic en **Run**
5. Andá a **Project Settings > API** y copiá:
   - `Project URL` → es tu `VITE_SUPABASE_URL`
   - `anon public key` → es tu `VITE_SUPABASE_ANON_KEY`

## PASO 2 — Subir el código a GitHub

1. Entrá a https://github.com y creá una cuenta si no tenés
2. Creá un repositorio nuevo (nombre: `agenda-2026`, público o privado)
3. Subí todos los archivos de esta carpeta al repo

   Si no sabés usar Git, usá la opción "Upload files" en GitHub directamente.

## PASO 3 — Deploy en Vercel

1. Entrá a https://vercel.com y creá una cuenta (podés entrar con tu cuenta de GitHub)
2. Clic en **Add New Project**
3. Importá el repo `agenda-2026` que creaste
4. Antes de hacer deploy, agregá las variables de entorno:
   - `VITE_SUPABASE_URL` → el valor que copiaste en paso 1
   - `VITE_SUPABASE_ANON_KEY` → el valor que copiaste en paso 1
5. Clic en **Deploy**
6. En ~1 minuto tenés tu URL lista (ej: `agenda-2026.vercel.app`)

## PASO 4 — Configurar quién puede registrarse

En Supabase > **Authentication > Settings**:
- Podés desactivar "Enable email confirmations" para que sea más fácil el primer registro
- O mantenerlo activado para que llegue un mail de confirmación

## LISTO

Compartí la URL con tu equipo. Cada persona:
1. Se registra con su email y contraseña
2. Ve el calendario completo
3. Puede cargar, editar y eliminar sus propios eventos
4. Ve los eventos de todos los demás

---

**Archivos del proyecto:**
- `src/App.jsx` → toda la app (calendario + login)
- `src/supabase.js` → conexión a la base de datos
- `supabase_setup.sql` → tablas y permisos (se ejecuta una sola vez)
- `index.html` → entrada
- `package.json` → dependencias
- `vite.config.js` → configuración
