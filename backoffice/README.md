# **JobMagnetic: Back-Office Frontend**

## 🚀 Resumen

Este repositorio contiene la aplicación frontend del Back-Office de JobMagnetic. Construida con **Angular** y **TypeScript**, esta Single-Page Application (SPA) proporciona la interfaz de usuario para administrar todo el ecosistema de JobMagnetic. Consume la API RESTful del backend para ofrecer una experiencia de gestión de datos rica, reactiva y eficiente, con un diseño moderno implementado con **Tailwind CSS**.

## ✨ Funcionalidades y Características Principales

-   **Diseño Responsivo:** Interfaz completamente adaptable a diferentes tamaños de pantalla, desde móviles hasta monitores de escritorio.
-   **Tematización Claro/Oscuro:** Soporte nativo para cambiar entre temas visuales para mejorar la comodidad del usuario.

## 🛠️ Stack Tecnológico y Herramientas

**Stack Principal:**
-   **Angular (v19+)** & **TypeScript**
-   **Tailwind CSS** (para el framework de estilos utility-first)
-   **SCSS** (para estilos globales y abstracciones con `@apply`)
-   **Angular Material** (para componentes base y accesibilidad, ej. Icons, Menus)
-   **RxJS** & **Signals** (para la gestión del estado y la reactividad)

**Desarrollo y Compilación:**
-   **Angular CLI**
-   Node.js (v20.x o superior)
-   Visual Studio Code (Recomendado)

## 🏗️ Arquitectura

El proyecto adopta una **Arquitectura Híbrida** que promueve la escalabilidad y la mantenibilidad, combinando la **Screaming Architecture** para la organización a nivel de funcionalidades con los principios de **Atomic Design** para la construcción de una librería de componentes de UI robusta y reutilizable.

1.  **`📂 core/`**: Contiene la lógica y los servicios que son verdaderamente globales y deben ser instanciados una sola vez en toda la aplicación (Singletons). Esto incluye el `AuthService`, interceptores HTTP y guardianes de rutas. Es el núcleo esencial de la aplicación.

2.  **`📂 features/`**: El corazón de la Screaming Architecture. La aplicación se organiza por funcionalidades de negocio, no por tipos técnicos. Cada subcarpeta (`users`, `products`, `dashboard`) representa un dominio de negocio, es un módulo autocontenido y se carga de forma perezosa (`lazy-loading`) para optimizar el rendimiento inicial.

3.  **`📂 layout/`**: Contiene los componentes y servicios responsables de la estructura visual principal y persistente de la aplicación (el "cascarón"). Componentes como el `Sidebar` y el `Header` viven aquí. Estos componentes están **acoplados al contexto** de esta aplicación específica y orquestan la navegación y el estado de la UI principal.

4.  **`📂 shared/`**: Tu caja de herramientas de UI. Contiene componentes, directivas y pipes **100% reutilizables y agnósticos al contexto**. No deben tener dependencias de servicios de `core` o `features`. Se construyen siguiendo los principios de Atomic Design.

### Pautas para la Carpeta `shared`: Atoms, Molecules & Organisms

Para mantener la consistencia y promover la máxima reutilización, los componentes dentro de `shared/components` se clasifican de la siguiente manera:

| Categoría | Concepto | Pregunta Clave | Ejemplos |
| :--- | :--- | :--- | :--- |
| **⚛️ Atoms** | Los bloques de construcción más básicos e indivisibles de la UI. | "¿Puedo descomponer esto en algo más pequeño y útil?" (Si no, es un átomo). | `app-button`, `app-input`, `app-label`, `app-icon`. |
| **🧬 Molecules** | Grupos de átomos que trabajan juntos para cumplir una sola función. | "¿Es esto un conjunto de átomos que realizan una tarea concreta?" | `app-search-bar`, `app-pagination-controls`, `app-form-field`. |
| **🔬 Organisms** | Secciones de UI complejas y autónomas, compuestas por moléculas y/o átomos. | "¿Es esto una sección completa y reconocible de la interfaz?" | `app-data-table`, `app-user-form`, `app-wizard`. |

## 📁 Estructura del Proyecto

La estructura de directorios clave del proyecto es la siguiente:

```
/src/app/
|
|-- 📂 core/                  # Servicios Singleton, Guards, Interceptors.
|-- 📂 features/              # Funcionalidades de negocio (Lazy Loaded).
|   |-- 📂 dashboard/
|   |-- 📂 users/
|   |-- ...
|-- 📂 layout/                # El cascarón de la app (Sidebar, Header, Footer).
|   |-- 📂 components/
|   |-- 📂 services/
|-- 📂 shared/                # Componentes y utilidades reutilizables.
|   |-- 📂 components/
|   |   |-- ⚛️ atoms/
|   |   |-- 🧬 molecules/
|   |   |-- 🔬 organisms/
|   |-- 📂 pipes/
|   |-- 📂 directives/
|-- 📄 app.routes.ts          # Rutas principales que cargan el layout y las features.
|-- ...
```

## 🚀 Cómo Empezar

### Prerrequisitos

-   [Node.js](https://nodejs.org/) (versión 20.x o superior)
-   [Angular CLI](https://angular.io/cli) instalado globalmente: `npm install -g @angular/cli`
-   Un IDE como [Visual Studio Code](https://code.visualstudio.com/).

### ⚙️ Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/henksandoval/JobMagnetic-BackOffice
    cd JobMagnetic-FrontOffice
    ```

2.  **Instalar las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configurar las Variables de Entorno:**
  *   En `src/environments/`, renombra el archivo `environment.example.ts` a `environment.ts`.
  *   Actualiza el contenido de `environment.ts` con la URL de la API del backend.
      Ejemplo:
      ```typescript
      export const environment = {
        production: false,
        apiUrl: 'https://localhost:7109/api/v0.1' // URL de tu backend local
      };
      ```

4.  **Ejecutar la aplicación en modo de desarrollo:**
    ```bash
    ng serve -o
    ```
    Este comando compilará la aplicación, la levantará en un servidor de desarrollo local y la abrirá automáticamente en tu navegador. La aplicación se recargará automáticamente cada vez que guardes cambios en los archivos fuente.

La aplicación será accesible en `http://localhost:4200/`.

## 🧪 Ejecutar Pruebas

1.  **Ejecutar las pruebas unitarias una vez:**
    ```bash
    ng test
    ```

2.  **Ejecutar las pruebas en modo "watch" y generar informe de cobertura:**
    ```bash
    ng test --watch --code-coverage
    ```
    Los resultados de la cobertura de código se generarán en una carpeta `coverage/` en la raíz del proyecto.

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Al crear nuevos componentes o funcionalidades, por favor, sigue la arquitectura y las pautas de estructura de carpetas definidas en este documento. Si tienes dudas sobre dónde debe vivir un nuevo componente, consulta la sección de `Atoms, Molecules & Organisms`.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo `LICENSE.md` para más detalles.
