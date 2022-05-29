# VisualRegressionManager

## Estructura de Archivos

```
📦 VisualRegressionManager
 ┣---- 📂 node_modules
 ┣      ┗---- ***
 ┣---- 📜 README.md
 ┣---- 📜 cypress_reporter.js
 ┣---- 📜 cypress_vr.js
 ┣---- 📜 index.css
 ┣---- 📜 package-lock.json
 ┗---- 📜 package.json
```

## Instalación y Configuraciones

`Importante!` Todos los comandos que se muestran a continuación deben ser ejecutados utilizando la carpeta `VisualRegressionManager` como la raíz (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 1 dependencias: `resemblejs`. Los siguientes comandos muestran cómo hacer la instalación de estas dependencias

```shell
npm install resemblejs --save
```

Adicionalmente, pra poder visualizar correctamente los reportes que genera la herramienta, es necesario instalar `http-server` globalmente

```shell
npm install --global http-server
```

## Ejecución de Herramientas

### Creación Reportes Cypress

`Importante!` Para generar los reportes de Cypress, es necesario haber realizado anteriormente la ejecución de las pruebas (ver README del proyecto CypressTest para mayor detalle).

A continuación, se presentan los comandos de ejecución que provee al herramienta para la generación del reporte de resutlados de la herramienta Cypress:


#### 1. **Comparación de Imágenes (Visual Regression Testing)**: 

Para realizar la comparación de versiones Ghost, se debe ejecutar el comando alguno de los comandos que se encuentran a continuación. En detalle, los comandos realizarán la comparación de imágenes entre las versiones v3 y v4 d Ghost, utilizando los archivos que se encuentren en la carpeta `cypress/screenshots` del proyecto CypressTest. (`Importante!` para cada versión, es necesario garantizar que las imágenes a comparar tengan el mismo nombre)

```shell
# Utilizando los scripts de NPM
npm run cypress:vrt

# directamente utilizando Node
node cypress_vr.js
```

#### 2. **Generación Reporte HTML**: 
Luego de haber realizado la comparación de imágenes, esr posible utilizar el siguetne comando para la generación de los reportes en HTML (cada escenario que haya pasado por VRT tendrá un reporte específico).

```shell
# Comando para generar los reportes HTML para todos subdirectorios de ./resultados/
npm run cypress:reporter # utilizando node
node cypress_reporter.js # utilizando npm

# Comando para generar los reportes HTML para un subdirectorio particular de ./resultados/
npm run cypress:reporter results-from <subdirectorio> # utilizando node
node cypress_reporter.js results-from <subdirectorio> # utilizando npm
# Ejemplo: npm run cypress:reporter results-from 2022-05-13T05.28.15.516Z

```


### Visualización Reportes Cypress

Para visualizar los reportes generado, es necesario ejecutar el comando `http-server` en la raíz del repositorio, MISW4103S6, y dirigirse a la URL indicada en consola (e.g. `http://127.0.0.1:8080`).

<img width="618" alt="Screen Shot 2022-05-14 at 4 56 38 PM" src="https://user-images.githubusercontent.com/25346635/168449309-d40e9af3-564e-466d-9f4d-ed1176945514.png">

Una vez se encuentre en la página que muestra la URL, (1) diríjase a la carpeta `./VisualRegressionManager/results/`, (2) entre a alguno de los subdirectorios, y (3) seleccione alguno de los escenarios.

<img width="1765" alt="Screen Shot 2022-05-14 at 4 55 21 PM" src="https://user-images.githubusercontent.com/25346635/168449276-10a2a534-cc32-423e-a057-20790578caeb.png">


### Creación Reportes Kraken

#### 1. **Comparación de Imágenes (Visual Regression Testing)**: 

```shell
# Utilizando los scripts de NPM
npm run kraken:vrt

# directamente utilizando Node
node kraken_vr.js
```

#### 2. **Generación Reporte HTML**: 

```shell
# Comando para generar los reportes HTML para todos subdirectorios de ./resultados/
npm run kraken:reporter # utilizando node
node kraken_reporter.js # utilizando npm

# Comando para generar los reportes HTML para un subdirectorio particular de ./resultados/
npm run kraken:reporter results-from <subdirectorio> # utilizando node
node kraken_reporter.js results-from <subdirectorio> # utilizando npm
# Ejemplo: npm run kraken:reporter results-from 2022-05-13T05.28.15.516Z

```
