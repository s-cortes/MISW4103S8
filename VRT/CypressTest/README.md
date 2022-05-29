# CypressTest


## Estructura de Archivos

```
📦 CypressTest
 ┣----📂 cypress
 ┃    ┣----📂 fixtures
 ┃    ┃    ┣----📜 urls.js
 ┃    ┃    ┗----📜 user.json
 ┃    ┣----📂 integration
 ┃    ┃    ┣----📂 E2EV3
 ┃    ┃    ┃    ┣----📂 pages
 ┃    ┃    ┃    ┃    ┣----📂 admin
 ┃    ┃    ┃    ┃    ┃    ┣----📜 dashboard.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 editor.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 login.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 settings.js
 ┃    ┃    ┃    ┃    ┃    ┗----📜 tag.js
 ┃    ┃    ┃    ┃    ┗----📂 user
 ┃    ┃    ┃    ┃    ┃    ┣----📜 article.js
 ┃    ┃    ┃    ┃    ┃    ┗----📜 home.js
 ┃    ┃    ┃    ┣----📜 F001.spec.js
 ┃    ┃    ┃    ┣----📜 F002.spec.js
 ┃    ┃    ┃    ┗----📜 F005.spec.js
 ┃    ┃    ┣----📂 E2EV4
 ┃    ┃    ┃    ┣----📂 pages
 ┃    ┃    ┃    ┃    ┣----📂 admin
 ┃    ┃    ┃    ┃    ┃    ┣----📜 dashboard.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 editor.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 login.js
 ┃    ┃    ┃    ┃    ┃    ┣----📜 settings.js
 ┃    ┃    ┃    ┃    ┃    ┗----📜 tag.js
 ┃    ┃    ┃    ┃    ┗----📂 user
 ┃    ┃    ┃    ┃    ┃    ┣----📜 article.js
 ┃    ┃    ┃    ┃    ┃    ┗----📜 home.js
 ┃    ┃    ┃    ┣----📜 F001.spec.js
 ┃    ┃    ┃    ┣----📜 F002.spec.js
 ┃    ┃    ┃    ┣----📜 F003.spec.js
 ┃    ┃    ┃    ┣----📜 F004.spec.js
 ┃    ┃    ┃    ┣----📜 F005.spec.js
 ┃    ┃    ┃    ┣----📜 F007.spec.js
 ┃    ┃    ┃    ┣----📜 F008.spec.js
 ┃    ┃    ┃    ┗----📜 F009.spec.js
 ┃    ┃    ┗----📂 helpers
 ┃    ┃    ┃    ┗----📜 screenshot-manager.js
 ┃    ┣----📂 plugins
 ┃    ┃    ┗----📜 index.js
 ┃    ┗----📂 support
 ┃    ┃    ┣----📜 commands.js
 ┃    ┃    ┗----📜 index.js
 ┣----📜 README.md
 ┣----📜 cypress.json
 ┣----📜 package-lock.json
 ┗----📜 package.json

```

## Dependecias y Versionamiento

A continuación, se presentan las dependencias principales para la ejecución de las pruebas Cypress.

| Dependencia | Versión  |
| ----------- | -------- |
| NodeJs      | ^14.19.1 |
| Npm         | ^6.14.16 |
| Ghost CLI   | 1.19.3   |
| Ghost (App) | 4.47.0   |

## Instalación y Configuraciones

`Importante!` Todos los comandos que se muestran a continuación deben ser ejecutados utilizando la carpeta `CypressTest` como la raíz (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 2 dependencias: `cypress` y  `@faker-js/faker` (generación de datos para pruebas). Los siguientes comandos muestran cómo hacer la instalación de estas dependencias

```shell
npm install cypress --save-dev
npm install @faker-js/faker --save-dev
```

### Credenciales Ghost Admin
Adicionalmente a la instalación de dependencias, los scripts de pruebas requieren de las credenciales del usuario administrador de Ghost para poder ser ejecutadas. Para ello, se tiene el archivo `user.json` en donde se debe colocar tanto el correo como la contraseña del administrador.

~~~
    Aviso: Dado que se necesitan las credenciales del administrador, se espera
    que la aplicación Ghost cuente con un usuario admin creado previamente. En
    caso de no tener dicho usuario, dirigirse a la página de setup para la
    creación del usuario
    
    Setup: http://<url>:<port>/ghost/#/setup
~~~


## Despliegue

### Despliegue Aplicación Ghost

Antes de poder ejecutar las pruebas de Cypress, es necesario el despliegue de la aplicación Ghost que se desea probar. para ello, se debe ejecutar el siguiente comando dentro de la carpeta raíz de la aplicación Ghost

```shell
ghost start
```

### Ejecución de Pruebas Cypress
Para desplegar el proyecto, se debe ejecutar algunode los siguientes comandos

```shell
# Utilizando el comando definido en pagake.json
npm run cypress:open

# Directamente desde node_modules
./node_modules/.bin/cypress open
```

Una vez la aplicación de Cypress haya sido desplegada, es posible ejecutar las pruebas al seleccionar alguno de los archivos de las carpetas 📂  `E2EV3` y `E2EV4`.