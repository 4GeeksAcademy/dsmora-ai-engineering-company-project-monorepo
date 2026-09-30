---
name: request-summary
description: Generate a compact summary of the user's request at the start of each execution when invoked by an agent.
---

# Request Summary

## Purpose

Esta skill genera un resumen breve y operativo de la peticion actual del usuario para ayudar al agente a arrancar cada ejecucion con contexto claro.

## When to use

Usa esta skill cuando el agente necesite:

- resumir la peticion recibida antes de ejecutar trabajo,
- aclarar alcance, restricciones y entregables,
- dejar visible una version corta y accionable del encargo actual.

## Inputs

La skill debe basarse unicamente en el contexto disponible en la conversacion actual:

- peticion del usuario,
- restricciones indicadas por el usuario,
- contexto del repositorio o archivos abiertos si son relevantes,
- decisiones ya confirmadas durante la conversacion.

## Instructions

Al invocar esta skill, el agente debe:

1. Resumir la peticion en 2 a 5 lineas.
2. Identificar el objetivo principal sin reformularlo de manera ambigua.
3. Incluir restricciones explicitas del usuario.
4. Mencionar el entregable esperado si ya esta claro.
5. No inventar requisitos no confirmados.
6. No repetir todo el prompt; condensarlo.
7. Si faltan datos criticos, cerrar el resumen con una sola nota breve de aclaracion pendiente.

## Output format

El resultado debe usar este formato:

### Resumen de la peticion

- Objetivo: ...
- Restricciones: ...
- Entregable: ...
- Pendiente: ...

Reglas de salida:

- Si no hay restricciones explicitas, usa: Ninguna adicional confirmada.
- Si no hay pendientes reales, usa: Ninguno.
- Mantener el resumen por debajo de 120 palabras.

## Example

### Resumen de la peticion

- Objetivo: Crear una rule y una skill dentro de .agents para controlar el comportamiento del agente.
- Restricciones: No alterar branding ni estilo visual sin autorizacion explicita.
- Entregable: Un archivo de rule y un archivo de skill en formato estandar.
- Pendiente: Ninguno.