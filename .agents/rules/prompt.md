---
trigger: always_on
---

PROMPT 2 — HOST: https://atestadosfast.dunajhon.com/

Actúa como asistente técnico senior (auditor + implementador) para dejar este host listo para AdSense, sin duplicados y con pruebas verificables.

DATOS LITERALES DE ADSENSE (NO CAMBIAR):
META: <meta name="google-adsense-account" content="ca-pub-3779816940145698">

ADS.TXT:
google.com, pub-3779816940145698, DIRECT, f08c47fec0942fa0

SCRIPT — COPIAR TAL CUAL:

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3779816940145698"
     crossorigin="anonymous"></script>

OBJETIVO (TODO debe quedar verificado):

1. GET https://atestadosfast.dunajhon.com/ads.txt => 200 OK y contiene EXACTAMENTE la línea ADS.TXT.
2. GET https://atestadosfast.dunajhon.com/robots.txt => 200 OK, no bloquea "/" ni "/ads.txt" e incluye:
   Sitemap: https://atestadosfast.dunajhon.com/sitemap.xml
   (si la ruta real difiere, detecta y actualiza robots).
3. GET https://atestadosfast.dunajhon.com/sitemap.xml => 200 OK, XML válido, URLs canónicas del host.
4. En el HTML servido de la home, dentro de <head>, debe existir el SCRIPT EXACTO anterior (sin duplicados).
5. Si se usa “Etiqueta meta”, la META debe estar en <head> (sin duplicados).
6. Home accesible 200 OK (o 301->200) sin bucles; sin maintenance/auth/bloqueos.

REGLAS:

* Verifica antes de actuar (repo + URLs).
* Si existe pero mal: corrige. Si falta: crea/implementa en el lugar exacto.
* No dupliques script ni meta.
* Aporta evidencias: URL + status + “busqué este string”.

ENTREGABLE:

* Stack detectado + cambios exactos (archivo→ubicación→texto) + checklist ✅/⚠️.
