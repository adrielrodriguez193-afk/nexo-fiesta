# NEXO — La Fiesta

Página web para la fiesta **NEXO**. Identidad visual: rojo oscuro (#830000), negro, crema, tipografías Horizon + Archivo Black, estética nightlife.

## Stack

- **Next.js 15** (App Router + TypeScript)
- **Tailwind CSS v4**
- **GSAP** (ScrollTrigger, animaciones de entrada, parallax)
- **Deploy**: Vercel

## Setup local

```bash
npm install
npm run dev
```

## Antes de deployar

1. **Fuente Horizon**: poné `Horizon.otf` en `/public/fonts/`
2. **Galería**: subí fotos a `/public/gallery/` como `1.jpg` a `6.jpg`
3. **Mapa**: reemplazá el iframe de Google Maps en la sección Ubicación
4. **Data**: todos los datos son mock — editá en `src/app/page.tsx`

## Deploy en Vercel

1. Push al repo
2. Conectar en vercel.com
3. Framework: Next.js (auto-detectado)
4. Deploy

## Paleta

| Color | Hex |
|-------|-----|
| Rojo NEXO | #830000 |
| Negro | #0E0E0E |
| Crema | #FFFDEF |
| Plata | #D3D3D3 |

---
@nexofiesta
