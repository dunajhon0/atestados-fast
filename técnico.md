Aquí tienes un **prompt listo para copiar y pegar** (nivel profesional) para pedirle a otra IA que te genere un **SRS (Especificación de Requisitos de Software)** completo, técnico y orientado a una web **visual, sencilla, elegante** y **compatible con AdSense**.

He incluido criterios clave de AdSense y de cumplimiento (privacidad/cookies/copyright), además de todo lo que has pedido sobre **gestión de imágenes y rutas**. Google exige cumplir sus políticas para monetizar con su código y puede bloquear anuncios o suspender la cuenta si no se cumplen; además, esas políticas pueden cambiar, así que conviene exigir verificación con fuentes oficiales actualizadas. ([support.google.com](https://support.google.com/adsense/answer/48182?hl=en))  
También he incorporado el bloque de consentimiento (CMP/TCF) para tráfico EEA/UK/Switzerland en publicidad personalizada, porque es un punto muy relevante en entornos con AdSense. ([support.google.com](https://support.google.com/adsense/answer/7670013?hl=en))

```text
Actúa como Arquitecto de Software Senior + Analista Funcional + Especialista en QA + Experto en monetización web con Google AdSense + Especialista en cumplimiento legal web (privacidad/cookies/copyright).

Tu tarea es generar un documento SRS (Software Requirements Specification) COMPLETO, técnico, estructurado y accionable para el desarrollo de una página web moderna con las siguientes características:

OBJETIVO DEL SISTEMA
- Página web visualmente sencilla, elegante, moderna y clara.
- Buena experiencia de usuario (UX), rápida, limpia y fácil de navegar.
- Preparada para monetización con Google AdSense sin comprometer la experiencia.
- Cumplimiento de requisitos legales y de políticas (privacidad, cookies, copyright, transparencia).
- Arquitectura preparada para escalar y desplegar en distintos entornos (local, staging, producción).
- La página web deberá incluir una caja/campo visible en la interfaz donde se pueda introducir un enlace a un GPT de ChatGPT (GPT público o compartido).

CONTEXTO (usa estos datos como variables; si faltan datos, crea supuestos explícitos)
- Tipo de web: [blog / landing / herramienta / directorio / contenido educativo / nicho]
- Público objetivo: [edad, país, nivel técnico, intereses]
- Idioma principal: español (España)
- Dispositivo prioritario: mobile-first (sin descuidar escritorio)
- Objetivo de negocio: [tráfico / registros / leads / ingresos AdSense / afiliación]
- Stack preferido (si aplica): [HTML/CSS/JS / React / Next.js / WordPress / etc.]
- Entornos de despliegue: localhost + pruebas + producción

REQUISITO CLAVE DE SALIDA
El documento debe estar redactado en formato SRS profesional, con lenguaje técnico claro, estructura formal y requisitos verificables (medibles, no ambiguos, testables).

IMPORTANTE (OBLIGATORIO)
1) El SRS debe incluir requisitos funcionales y no funcionales específicos sobre:
   - Gestión de imágenes
   - Carga de recursos estáticos
   - Rutas relativas/absolutas
   - Validación de rutas
   - Compatibilidad entre entornos
   - Prevención de enlaces rotos
   - Buenas prácticas de carga multimedia

2) El SRS debe incluir requisitos de cumplimiento para monetización con AdSense:
   - Política de privacidad
   - Gestión de cookies / consentimiento
   - Respeto a copyright / propiedad intelectual
   - Páginas legales mínimas
   - Ubicación y comportamiento de anuncios sin prácticas engañosas
   - Requisitos de contenido y UX compatibles con monetización responsable
   - Revisión periódica de cambios de políticas (Google puede actualizarlas)

3) El documento NO debe limitarse a una lista genérica: debe definir requisitos concretos, criterios de aceptación, restricciones técnicas y recomendaciones de implementación.

4) El SRS debe incluir requisitos funcionales específicos para una caja/campo de enlace a GPT de ChatGPT en la página web:
   - Campo visible para pegar URL de GPT
   - Validación básica de formato de URL
   - Comportamiento al abrir el enlace (preferiblemente nueva pestaña)
   - Manejo de errores si el enlace es inválido o está vacío
   - Diseño consistente con una interfaz sencilla y elegante

--------------------------------------------------
ESTRUCTURA OBLIGATORIA DEL SRS
--------------------------------------------------

Genera el SRS con estas secciones, en este orden:

1. Introducción
   1.1 Propósito del documento
   1.2 Alcance del sistema
   1.3 Definiciones, acrónimos y términos
   1.4 Referencias (normativas, políticas, documentación relevante)
   1.5 Visión general del documento

2. Descripción general del sistema
   2.1 Contexto del producto
   2.2 Objetivos del producto
   2.3 Tipos de usuarios / perfiles
   2.4 Supuestos y dependencias
   2.5 Limitaciones iniciales del proyecto

3. Requisitos funcionales (RF)
   - Descritos con identificadores únicos (RF-001, RF-002...)
   - Deben incluir prioridad (Alta/Media/Baja o MoSCoW)
   - Deben incluir criterio de aceptación
   - Deben estar redactados con “El sistema deberá...”

4. Requisitos no funcionales (RNF)
   - Rendimiento
   - Seguridad
   - Usabilidad / accesibilidad
   - SEO técnico básico
   - Mantenibilidad
   - Portabilidad
   - Compatibilidad multi-entorno
   - Observabilidad / logging (si aplica)
   - Cumplimiento legal y políticas de monetización

5. Requisitos específicos de gestión de imágenes y recursos multimedia (OBLIGATORIO, sección detallada)

6. Restricciones técnicas
   - Stack / framework / hosting
   - Dependencias
   - Navegadores soportados
   - Política de rutas y assets
   - Limitaciones de AdSense y políticas asociadas

7. Consideraciones de arquitectura
   - Estructura de carpetas
   - Gestión de configuración por entorno
   - Estrategia de recursos estáticos
   - Estrategia de despliegue
   - Manejo de errores de assets
   - Integración de banners AdSense de forma no intrusiva

8. Ejemplos de implementación recomendada
   - Ejemplos de estructura de proyecto
   - Ejemplos de requisitos correctamente redactados
   - Ejemplos de manejo de rutas/imágenes
   - Ejemplos de fallback de imágenes
   - Ejemplos de configuración por entorno (sin hardcodear)

9. Matriz de trazabilidad (recomendado)
   - Requisito ↔ componente ↔ prueba/validación

10. Criterios de aceptación del sistema (UAT / checklist final)
   - Lista verificable para validar que el sistema está listo para producción y monetización

--------------------------------------------------
REQUISITOS OBLIGATORIOS SOBRE GESTIÓN DE IMÁGENES (MUY IMPORTANTE)
--------------------------------------------------

Incluye una subsección específica y detallada con TODOS estos puntos:

A) Gestión de rutas
- El sistema deberá permitir la carga de imágenes mediante rutas relativas al directorio del proyecto siempre que sea posible.
- El sistema deberá soportar rutas configurables para recursos estáticos (base path/base URL).
- El sistema no deberá depender de rutas absolutas locales del sistema operativo (ej.: C:\... / Users/...).
- El sistema deberá evitar enlaces hardcodeados a dominios o rutas locales.
- El SRS debe definir una estructura de carpetas estándar de assets, por ejemplo:

/assets
   /images
   /css
   /js

- El SRS debe especificar convenciones de nombres para archivos de imágenes (minúsculas, sin espacios, guiones, extensiones válidas).

B) Independencia del entorno (local / pruebas / producción)
- El sistema debe funcionar en entorno local y en producción sin modificar manualmente las rutas de imágenes.
- El sistema deberá permitir configurar la base URL de recursos mediante variables de entorno o configuración centralizada.
- El sistema deberá soportar despliegues en múltiples entornos (localhost, staging, producción) manteniendo consistencia en carga de recursos.
- El sistema deberá contemplar diferencias de sistema de archivos y sensibilidad a mayúsculas/minúsculas (especialmente Linux).

C) Validación de recursos y prevención de errores
- El sistema deberá validar la existencia de archivos de imagen antes de generar/publicar la página (build-time o predeploy validation).
- El sistema deberá detectar rutas inválidas y registrarlas en un informe de errores.
- El sistema deberá incorporar mecanismo de fallback (imagen alternativa) cuando una imagen no exista o falle su carga.
- El sistema deberá evitar que enlaces rotos de imágenes degraden la interfaz crítica.
- El sistema deberá registrar eventos de error de carga de imágenes (si aplica).

D) Buenas prácticas de carga de recursos estáticos
- El sistema deberá soportar lazy loading de imágenes cuando aplique.
- El sistema deberá promover el uso de formatos modernos (WebP, AVIF) con compatibilidad progresiva.
- El sistema deberá definir estrategias de compresión/optimización de imágenes para rendimiento.
- El sistema deberá incluir atributos de accesibilidad en imágenes (alt text) cuando corresponda.
- El sistema deberá contemplar dimensionado adecuado para evitar CLS u otros problemas de UX/rendimiento.

E) Prevención de errores comunes
- Control de mayúsculas/minúsculas en nombres de archivo y rutas.
- Validación de extensiones permitidas (.jpg, .jpeg, .png, .webp, .avif, .svg según política definida).
- Validación de caracteres en nombres de archivos.
- Rechazo o normalización de nombres problemáticos.
- Prohibición de referencias a imágenes inexistentes en templates o contenido generado.

Incluye al menos 10-15 requisitos formales (RF/RNF) específicos solo para gestión de imágenes y recursos.

--------------------------------------------------
REQUISITOS OBLIGATORIOS SOBRE AdSense + LEGAL/COMPLIANCE
--------------------------------------------------

El SRS debe incluir requisitos funcionales y no funcionales para compatibilidad con monetización mediante Google AdSense, sin afirmar “aprobación garantizada” (eso no se puede garantizar).

Debe incluir, como mínimo:

1) Páginas legales mínimas
- Política de privacidad
- Política de cookies
- Aviso legal (según jurisdicción objetivo, p.ej. España/UE)
- Política de copyright / propiedad intelectual / uso de contenidos
- Página de contacto o método de contacto visible
- (Opcional recomendado) Términos y condiciones

2) Cookies y consentimiento (muy importante)
- El sistema deberá mostrar un mecanismo de gestión de consentimiento de cookies cuando sea legalmente exigible.
- El sistema deberá permitir registrar/gestionar el estado del consentimiento antes de cargar tecnologías publicitarias no esenciales.
- El SRS debe contemplar compatibilidad con requisitos de consentimiento para tráfico en EEA/UK/Switzerland cuando se sirvan anuncios personalizados.
- El SRS debe exigir configuración modular del CMP / consentimiento (sin acoplarlo a una sola implementación si no se ha decidido aún).

3) Privacidad y transparencia
- El sistema deberá informar del uso de publicidad de terceros y tecnologías asociadas.
- El sistema deberá incluir enlaces visibles a documentos legales en footer y/o áreas consistentes.
- El sistema deberá documentar cómo se actualizan las políticas legales cuando cambien proveedores/políticas.

4) Copyright / propiedad intelectual
- El sistema deberá prohibir el uso de imágenes/textos sin derechos de uso o licencia válida.
- El sistema deberá exigir trazabilidad de procedencia/licencia de recursos gráficos (cuando aplique).
- El sistema deberá definir procedimiento de retirada/corrección de contenido ante reclamaciones de copyright.
- El sistema deberá evitar contenido copiado sin valor añadido y contenido replicado que pueda perjudicar monetización.

5) Integración publicitaria no intrusiva (AdSense-friendly)
- El sistema deberá ubicar banners de forma visible pero no engañosa, sin superponer navegación ni provocar clics accidentales.
- El sistema no deberá incluir incentivos a hacer clic en anuncios.
- El sistema deberá mantener separación visual clara entre contenido y anuncios.
- El sistema deberá asegurar que la experiencia de usuario siga siendo usable en móvil.
- El sistema deberá evitar páginas “vacías”, “en construcción” o de bajo valor con anuncios.
- El sistema deberá incluir una política de revisión de contenido antes de monetización.

6) Mantenimiento de cumplimiento
- El SRS deberá exigir revisión periódica de políticas de Google Publisher Policies / AdSense y actualización de requisitos internos.
- El SRS deberá incluir una lista de verificación previa al despliegue para cumplimiento de monetización y legal.

--------------------------------------------------
REQUISITOS OBLIGATORIOS SOBRE CAJA DE ENLACE A GPT DE CHATGPT
--------------------------------------------------

El SRS debe incluir requisitos funcionales y no funcionales para una caja/campo en la página web que permita introducir un enlace a un GPT de ChatGPT.

Debe incluir, como mínimo:

1) Interfaz y visibilidad
- El sistema deberá mostrar una caja/campo visible y claramente identificada para introducir una URL de un GPT de ChatGPT.
- El sistema deberá incluir etiqueta descriptiva (por ejemplo: “Pega aquí el enlace de tu GPT de ChatGPT”).
- El diseño de la caja deberá integrarse con la estética general (sencilla, elegante, moderna y mobile-first).

2) Validación y control de errores
- El sistema deberá validar que el valor introducido tenga formato de URL válido.
- El sistema deberá mostrar mensaje de error claro si el campo está vacío cuando se intenta usar.
- El sistema deberá mostrar mensaje de error claro si el enlace no cumple el formato esperado.
- El sistema deberá evitar romper la interfaz si se introduce texto no válido.

3) Comportamiento funcional
- El sistema deberá permitir al usuario guardar temporalmente o usar el enlace introducido para abrir el GPT.
- El sistema deberá definir si el enlace se abre en nueva pestaña/ventana para no interrumpir la navegación del usuario en la web.
- El sistema deberá contemplar una acción explícita (botón tipo “Abrir GPT” o similar).

4) Seguridad y buenas prácticas
- El sistema deberá sanitizar/validar la entrada antes de procesarla.
- El sistema deberá evitar inyección de código mediante el campo de enlace.
- El sistema deberá usar HTTPS cuando el enlace de destino lo soporte.
- El sistema deberá registrar errores de uso del campo (si aplica) para soporte/QA, sin exponer datos sensibles.

Incluye al menos 4-8 requisitos formales (RF/RNF) específicos para esta funcionalidad (caja de enlace a GPT de ChatGPT).

--------------------------------------------------
FORMATO DE REDACCIÓN DE REQUISITOS (OBLIGATORIO)
--------------------------------------------------

Para cada requisito, usa este formato:

- ID: RF-XXX o RNF-XXX
- Nombre
- Descripción (redactada con “El sistema deberá...”)
- Justificación
- Prioridad
- Criterio de aceptación (medible/testable)
- Dependencias (si aplica)
- Riesgos asociados (si aplica)

Incluye ejemplos de requisitos bien redactados como:
- “El sistema deberá garantizar que las imágenes se carguen mediante rutas configurables, evitando el uso de rutas absolutas dependientes del sistema operativo o del entorno de desarrollo.”
- “El sistema deberá mostrar una imagen de fallback si la imagen principal no está disponible, sin romper el layout de la página.”
- “El sistema deberá incluir un campo visible para introducir un enlace a un GPT de ChatGPT, validando el formato de URL y mostrando un mensaje de error si el enlace no es válido.”

--------------------------------------------------
CALIDAD ESPERADA DEL SRS
--------------------------------------------------

El resultado debe:
- Ser técnico y estructurado (nivel empresa / ingeniería de software).
- Ser claro y accionable para desarrollo, QA y despliegue.
- Evitar ambigüedades.
- Incluir supuestos explícitos si faltan datos.
- Diferenciar claramente requisitos funcionales, no funcionales y restricciones.
- Incluir recomendaciones realistas para implementación web moderna.
- Estar redactado en español de España.

Si lo consideras útil, añade al final:
- Riesgos principales del proyecto
- Recomendaciones para MVP vs versión escalable
- Checklist de validación preproducción (UX + legal + monetización + imágenes/rutas)

Genera el SRS completo ahora.
```

### Extra útil (opcional)
Si quieres, te preparo una **versión aún más afinada** de este prompt para:
- **React / Next.js**
- **WordPress**
- **HTML/CSS/JS puro**
- **Antigravity / generadores automáticos de webs**
- **Web mobile-first con AdSense + CMP + SEO mínimo**
