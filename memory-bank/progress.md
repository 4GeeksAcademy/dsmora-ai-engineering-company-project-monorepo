# Progress

## Estado general

El proyecto se encuentra en una fase inicial ya operativa, con dos hitos completados que cubren captación web y primeras piezas de lógica de negocio.

## Hitos completados

### Hito 1: landing web

Entregado:

- Landing principal de Masa & Fuego con propuesta de valor, beneficios y llamada a la acción.
- Página de aplicación separada para captar interesados.
- Formulario con validaciones en cliente.
- SEO básico mediante title, description, keywords y datos estructurados.
- Diseño responsive construido con Tailwind CSS vía CDN.

Impacto:

- La escuela ya cuenta con una presencia digital inicial.
- Existe un flujo básico para convertir tráfico en aplicaciones.

### Hito 2: métodos y lógica en src

Entregado:

- Modelado de entidades principales: Student, CookingCourse y Enrollment.
- Métodos de instancia en los datos de ejemplo para reglas como mayoría de edad, apertura del curso y pago completo.
- Utilidades de búsqueda lineal y binaria.
- Utilidades de colecciones para ordenar, agrupar, filtrar y localizar elementos.
- Transformaciones para métricas de negocio como ingresos, media de precios y resúmenes por curso.
- Validaciones de integridad para estudiantes, cursos e inscripciones.

Impacto:

- Ya existe una base programática para representar operaciones clave del negocio.
- El proyecto tiene una primera capa reutilizable para futuras integraciones con backend o UI.

## Estado actual resumido

- Captación web: completada en una primera versión.
- Formulario y validación cliente: completados en una primera versión.
- Lógica TypeScript en src: completada en una primera versión.
- Integración con servidor: pendiente.
- Persistencia de datos: pendiente.
- Automatizaciones y funcionalidades avanzadas: pendientes.

## Próximos pasos sugeridos

- Conectar el formulario con un servicio backend o endpoint de almacenamiento.
- Persistir estudiantes, cursos e inscripciones en una base de datos.
- Añadir tests para la lógica de src.
- Exponer la lógica de negocio mediante una API reutilizable.
- Evolucionar la web hacia una experiencia más dinámica si el siguiente hito lo requiere.