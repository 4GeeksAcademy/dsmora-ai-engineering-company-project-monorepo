# Tech Context

## Resumen

El proyecto combina una primera capa web estática para la captación de alumnos y una segunda capa de utilidades en TypeScript para empezar a formalizar la lógica de negocio de Masa & Fuego.

## Stack actual

### Hito 1: web / landing

- HTML estático para la landing principal y la página de aplicación.
- Tailwind CSS vía CDN para estilos rápidos de la interfaz.
- JavaScript vanilla para la validación del formulario en cliente.
- Metadatos SEO básicos y marcado estructurado con schema.org.

Archivos principales de esta capa:

- index.html
- application.html
- validation.js

### Hito 2: lógica de negocio inicial

- TypeScript como base para el modelado y la lógica.
- Configuración strict en tsconfig.json.
- Validación por typecheck con tsc --noEmit.
- Organización del código dentro de src/.

Áreas implementadas en src/:

- Tipos y entidades de dominio para estudiantes, cursos e inscripciones.
- Utilidades de búsqueda lineal y binaria.
- Operaciones sobre colecciones: filtrar, ordenar, agrupar y buscar.
- Transformaciones de negocio: conteos, revenue, medias y resúmenes de inscripciones.
- Validaciones de datos para estudiantes, cursos e inscripciones.

Archivos principales de esta capa:

- src/types/models.ts
- src/utils/search.ts
- src/utils/collections.ts
- src/utils/transformations.ts
- src/utils/validations.ts
- src/demo.ts

## Tooling

- Node.js / npm para dependencias y scripts.
- TypeScript 5.6.3 como dependencia de desarrollo.
- Script disponible en raíz: npm run typecheck.

## Estado técnico actual

- No hay todavía backend implementado.
- No hay base de datos conectada.
- No hay framework frontend con build pipeline; la web actual funciona como HTML estático.
- La lógica de negocio existente sirve como base reutilizable para próximos hitos.

## Dirección esperada

El stack actual está preparado para evolucionar hacia una arquitectura más completa con servicios, persistencia, interfaces más avanzadas y automatización, manteniendo una separación clara entre capa de presentación y lógica de negocio.