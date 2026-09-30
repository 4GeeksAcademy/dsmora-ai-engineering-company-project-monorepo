# AGENTS

## Contexto obligatorio en cada ejecución

Antes de proponer cambios o editar archivos, el agente debe leer siempre:

- `memory-bank/techContext.md`
- `memory-bank/progress.md`

Ese contexto se considera obligatorio en cada ejecución para entender el estado técnico actual y el progreso del proyecto.

## Archivos protegidos

No modificar sin confirmación explícita del usuario:

- `README.md`
- `.gitignore`
- `package.json`

## Checklist antes de commit

Antes de preparar o sugerir un commit, el agente debe verificar lo siguiente:

1. Ejecutar un formateador, pero solo si el repositorio ya define uno.
2. Ejecutar `npm run typecheck` en la raíz del proyecto.
3. Ejecutar los tests, pero solo si existen en el repositorio.

## Notas para este repositorio

- En el estado actual del repositorio, el comando de typecheck verificado en raíz es `npm run typecheck`.
- Si no existe script de formateo o de tests, el agente debe indicarlo claramente en lugar de inventar comandos.
