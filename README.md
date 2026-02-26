# Atestados Fast - Asistencia IA para Redacción Policial

Landing page y simulador demostrativo para facilitar la redacción de atestados policiales mediante IA. Desarrollado con Next.js + Tailwind CSS.

## Estructura
- **`app/`**: Rutas y páginas principales (Home, /privacy, /cookies, /terms).
- **`components/`**: Componentes reutilizables (Navbar, Hero, Simulator, AdSlot, ConsentManager, etc.).

## 1. Cómo ejecutar en local

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd atestados-fast
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo `.env.example` a `.env.local` y reemplaza los placeholders con tus datos reales:
   ```bash
   # En Windows usa copy en lugar de cp
   cp .env.example .env.local
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 2. Cómo subir a GitHub

Si acabas de crear el proyecto y necesitas subirlo a un repositorio nuevo en GitHub:

1. Inicializa git (si no lo está ya):
   ```bash
   git init
   ```
2. Añade todos los archivos al staging:
   ```bash
   git add .
   ```
3. Haz el primer commit:
   ```bash
   git commit -m "Commit inicial: Proyecto Atestados Fast"
   ```
4. Ve a GitHub, crea un nuevo repositorio (público o privado, según prefieras) y copia su enlace de Git.
5. Vincula tu repositorio local con GitHub:
   ```bash
   git remote add origin <URL_DE_TU_REPOSITORIO_GITHUB>
   git branch -M main
   ```
6. Sube los archivos:
   ```bash
   git push -u origin main
   ```

## 3. Cómo desplegar en Vercel desde GitHub

1. Entra en [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** -> **"Project"**.
3. Importa el repositorio de `atestados-fast` desde tu lista de GitHub.
4. En la configuración del despliegue (durante el proceso de importación), ve al apartado **Environment Variables** y añade las variables de tu `.env.local`:
   - `NEXT_PUBLIC_GPT_URL`
   - `NEXT_PUBLIC_SUBDOMINIO_DROGAS`
   - `...` (y el resto de variables).
5. Haz clic en **Deploy**. Empezará a compilar y publicará la web al terminar.

## 4. Conectar un domino y configurar DNS

1. Ve a los **Settings** del proyecto en Vercel, apartado **Domains**.
2. Escribe el dominio que posees (ej. `atestadosfast.com`) y haz clic en Add.
3. Vercel te indicará qué registros DNS debes configurar. Ve a tu proveedor de dominios (DonDominio, Namecheap, Hostinger, etc.) a la zona de gestión de DNS:
   - Si añades el dominio raíz (`atestadosfast.com`), deberás añadir el registro de tipo **A** con la IP que provea Vercel (ej. `76.76.21.21`).
   - Si usas el subdominio `www` (`www.atestadosfast.com`), añade un registro tipo **CNAME** apuntando a `cname.vercel-dns.com`.
4. Espera a que se propaguen. Vercel te confirmará cuando detecte que la IP/CNAME correcto está apuntando a ellos.

## Stack Técnico de Rendimiento
- Next.js App Router
- Tailwind CSS
- Lucide React para iconos SVG (sin cargar pesadas librerías de fuentes).
- Componentes modulares preparados para escalabilidad.
- Funciones *lazy loading* / `next/dynamic` pueden aplicarse a componentes no críticos.
