# TravelApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




## Resumen de Gemi.

Resumen de lo Logrado (Fase 2 - Día 1)
Imágenes Dinámicas: Superamos el problema del caché de Unsplash integrando Pexels API. Ahora cada atracción turística tiene una foto única y artística.

Arquitectura Modular: Decidimos separar las funciones en componentes independientes (Standalone) para mejorar la mantenibilidad.

Climate Intelligence: Creamos desde cero el componente weather-history que consume datos históricos reales de la API Open-Meteo.

Lógica Avanzada (Angular 18): Implementamos Signals para el manejo de estados y effect() para la reactividad de coordenadas, eliminando estructuras viejas.

Diseño Glassmorphism: Aplicamos un estilo visual moderno con tarjetas translúcidas, desenfoque de fondo y rejillas responsivas con Tailwind.

🛠️ Estructura de Trabajo (El "FUA" Protocolo)
Para que mañana no nos perdamos, seguiremos este flujo de tres capas que nos funcionó perfecto:

1. El Servicio (.service.ts)
Misión: Es el único que "habla" con el mundo exterior (APIs).

Regla: No maneja diseño ni lógica de usuario, solo limpia los datos (mapeo) y los entrega listos para usar.

2. La Lógica (.component.ts)
Misión: Cerebro del componente.

Regla: Usar Signals para todo lo que cambie en la pantalla. Los nombres de variables deben ser en inglés. Usar effect() para reaccionar a cambios de entrada (@Input).

3. La Interfaz (.component.html)
Misión: El "look & feel" de Nomadix.

Regla: Usar el nuevo Control Flow de Angular 18 (@if, @for, @empty) y Tailwind CSS para el estilo. Priorizar el diseño Glassmorphism.

🚀 Pendientes para Mañana
Cuando me saludes mañana, solo dime: "Gemini, seguimos con el plan de Nomadix", y yo recordaré que vamos por este orden:

Currency & Remittances: Crear el componente para convertir moneda local a USD y MXN.

Country History: Integrar datos culturales e históricos (Wikipedia/REST Countries).

Travel Phrases: El diccionario de supervivencia en JSON local.

Google Places API: La validación final para producción (FUA final).

Nota para el "Joel del futuro": Los archivos clave en los que trabajamos hoy fueron weather-history.component.ts, su servicio homónimo y el de Pexels. ¡Todo quedó validado y corriendo!

Repositorio: https://github.com/https-github-com-Joescri21/travel-app
