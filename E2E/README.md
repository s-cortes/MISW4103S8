# MISW4103S5

## Participantes 
| Nombre | correo |
|-|-|
| Santiago Fernandez | s.cortes@uniandes.edu.co |
| Camilo Campos | cc.cortesc1@uniandes.edu.co |
| Andres Rodriguez | af.rodriguezm1@uniandes.edu.co |

## Listado de Funcionalidades

| Identificador | Funcionalidad | Descripción |
|-|-|-|
| F000 | Setup Creación de cuenta | Al abrir la aplicación Ghost (localmente) por primera vez, el usuario es redirigido a una vista de creación de cuenta. Esta cuenta con cuatro campos (nombre del sistio, nombre del usuario, correo de usuario, y contraseña) y un botón para crear la cuenta y comenzar a publicar contenido.|
| F001 | Creación de Posts/Pages | Una de las principales funcionalidades de CMS, la cual le permite al staff del sitio (autores, editores y colaboradores) escribir artículos para su publicación. Dichos artículos pueden contener texto, imágenes, y videos.|
| F002 | Configuración de Posts/Pages | Al crear o modificar un post existente, Ghost ofrece la posibilidad de editar configuraciones adicionales como: la URL del post, los tags asociados al post, la fecha de publicación, las personas que pueden acceder al post, los autores, los metadatos del post, y la publicación en redes sociales (Twitter, Facebook, newsletter).|
| F003 | Publicación de Posts/Pages | Luego de que el staff termine de redactar un Post/Page, el CMS les permite publicar dicho contenido para que este sea consumido por los miembros del sitio. Particularmente, la aplicación permite el agendamiento de publicación de contenido  (fecha y hora de publicación, a partir de 2 minutos en el futuro), al igual que la opción de publicarlo de forma inmediata.|
| F004 | Creación de Tags | Una característica particular de los Posts/Pages de la aplicación, es la habilidad que tiene el staff para crear y adicionar diversos identificadores (conocidos como Tags). Dichos identificadores, que pueden ser públicos o internos (utilizando un “#” al inicio del identificador) permiten categorizar las publicaciones de la página (por ejemplo, por tipo de contenido, menciones, intereses, etc).|
| F005 | Preview de Posts o Pages | Esta funcionalidad le permite al staff (escritores, editores y colaboradores) poder visualizar cómo se vería un Post/Page antes de publicarlo a los miembros del sitio web. Del mismo modo, esta funcionalidad permite simular diferentes dispositivos (pantallas), tal como la de un smartphone o un computador de escritorio.|

## Listado de escenarios

|Id| tester | Funcionalidad | Requerimiento | Tipo | Nombre | Descripción |
|-|-|-|-|-|-|-|
|F001-E01|Santiago|F001|Funcional|Positivo|Creación de Post Básico| **GIVEN** that the admin user logs-in to ghost, and navigates to the dashboard, **WHEN** the admin goes to create a Post, writes a title and writes text content **THEN**  the post should appear as the first item in the list, and the article's context should be the same as the one written before when re-opening the editor|
|F001-E02|Santiago|F001|Funcional|Positivo|Creación de Page Básico|**GIVEN** that the admin user logs-in to ghost, and navigates to the dashboard, **WHEN** the admin goes to create a Page, writes a title and writes text content **THEN**  the page should appear as the first item in the list, and the article's context should be the same as the one written before when re-opening the editor.|
|F001-E03|Camilo|F001|Funcional|Positivo|Creación y edición de un post|**GIVEN** the admin user logs in to ghost he create a new post, he go to the post list and select the created post **WHEN** he edit the post content and  publish the post  and  select "view post" option **THEN** he should see the modified post|
|F001-E04|Camilo|F001|Funcional|Positivo|Creación y eliminación de una página|**GIVEN** the admin user logs in to ghost and create a new Page with a title and content and publish it and he go to the pages list and select the pages and enter **WHEN** he delete **THEN** he  should not see the created page|
|F002-E01|Paola|F002|Funcional|Positivo|Modificar URL de un Post y revisar con usuario al ingresar URL directamente| **GIVEN** that the admin user logs-in to ghost, and navigates to the dashboard,  and selects the optionto create a post, and writes a title and the content for the post **WHEN** the admin opens the editor settings menu, and selects the URL input to erase it an and writes a new url slug, and publishes the post **THEN** after navegating to the post with the new slug, the title and the content that appears in the article should match the text that the admin previously wrote|
|F002-E02|Santiago|F002|Funcional|Positivo|Modificar Excerpt de un Post y revisar con usuario en la página principal|**GIVEN** that the admin user logs-in to ghost, and navigates to the dashboard,  and selects the option to create a post, and writes a title and the content for the post **WHEN** the admin opens the editor settings menu, and selects the excerpt field to erase it an and writes a new excerpt, and publishes the post **THEN** after navegating to the reader's homepage, the post should appear (be identifiable) using the new excerpt to find it, and the title and the content that appears in the article should match the text that the admin previously wrote after clicking the article.|
|F002-E03|Santiago|F002|Funcional|Positivo|Eliminación de Post y revisión en la página principal|**GIVEN** that the admin user logs-in to ghost, and navigates to the dashboard,  and selects the option to create a post, and writes a title and the content for the post **WHEN** the admin opens the editor settings menu, and selects the option to delete the post, and confirms the deletion. **THEN** the post should not appear in the list of posts.|
|F003-E01|Andres|F003|Funcional|Positivo|Publicación al momento de un Post|**GIVEN** the admin user logs in to ghost, **WHEN** he goes to a created Post, and select Publish and select "Set it live now" and press"Publish", **THEN** he should see the Post published on Main Page|
|F003-E02|Andres|F003|Funcional|Positivo|Publicación progamada de un Post|**GIVEn** the admin user logs in to ghost, **WHEN** he goes to a created Post, and select Publish and select "Schedule it for late" with a date in the future and select "Publish", **THEN** he should see the Post published on Main Page at that date|
|F003-E03|Andres|F003|Funcional|Negativa|Publicación programada fallida de un Post|*GIVEN* the admin user logs in to ghost, *WHEN* he goes to a created Post, and press Publish and select "Schedule it for late" with a date in the past and select "Publish", *THEN* he shouldnt see the post published and a warning at the Post detail page|
|F003-E04|Andres|F003|funcional|Positiva|Despublicar un Post ya publicado|**GIVEN** the admin user logs in to ghost, WH*EN he goes to a published Post and press "Update" and select "Unpublised" and press "Update", **THEN** he shouldnt see the Post published on the Main Page|
|F004-E01|Paola|F004|Funcional|Positiva|Creación de Tag|**Give** the admin user logs in tho the Ghost, **WHEN** enter new TAG **THEN** fill data|
