# Chat con OpenRouter

## Configuracion

1. Usa Node.js 22 o posterior y ejecuta `npm install`.
2. Crea una API key en https://openrouter.ai/settings/keys.
3. Si no existe `.env`, copia `.env.example` como `.env` en la raiz del proyecto.
4. Completa `OPENROUTER_API_KEY` en `.env`.
5. Deja MongoDB ejecutandose en la direccion de `config.js` y ejecuta `npm run dev`.

```dotenv
OPENROUTER_API_KEY=tu_clave_real
OPENROUTER_MODEL=openrouter/free
```

`openrouter/free` elige automaticamente entre los modelos gratuitos disponibles; el modelo puede variar entre solicitudes. Puedes indicar el identificador de un modelo concreto, por ejemplo uno con sufijo `:free`, si esta disponible en tu cuenta. Otros modelos pueden ser de pago. Hay limites de solicitudes y disponibilidad incluso con modelos gratuitos.

`.env` esta excluido de Git. La clave se envia desde Node.js en el header `Authorization: Bearer ...`. No pongas la clave en `public`, `index.ejs` ni en mensajes del chat. Reinicia Node.js despues de cambiar `.env`.

## Prueba manual

1. Abre http://localhost:3000 e ingresa un nombre.
2. Escribe `Hola, explicame que es una coleccion de MongoDB` y presiona Enter.
3. Aparecera tu mensaje, el aviso "Asistente Virtual está pensando..." y una respuesta firmada como Asistente Virtual.
4. Pregunta `Dame un ejemplo de eso`: se envian hasta 20 mensajes recientes como contexto.
5. Recarga la pagina: ambos mensajes se recuperan de MongoDB.
6. En mongosh ejecuta:

```javascript
use mydb02
db.messages.find().sort({ _id: 1 })
db.messages.find({ role: "assistant" })
```

Los documentos anteriores sin `role` se tratan como mensajes de usuario. Los nuevos incluyen `role: "user"` o `role: "assistant"`.

## Comportamiento

- Es una sala compartida: todas las pestanas ven el mismo historial y OpenRouter recibe el contexto de esa sala.
- Solo se procesa una pregunta a la vez. Si otra persona envia mientras el asistente responde, su texto se conserva para que pueda reenviarlo cuando termine.
- El mensaje del usuario se guarda antes de consultar OpenRouter; si falla la API, sigue guardado y se muestra el error. El error no se guarda como respuesta del asistente.
- El navegador conserva el texto si el servidor rechaza el mensaje antes de guardarlo.
- La API REST se invoca desde Node.js mediante `fetch`, con una espera maxima de 30 segundos y hasta 1024 tokens de salida.
- No se necesitan paquetes adicionales para llamar a OpenRouter.

## Errores habituales

- **Falta la clave:** completa `.env` y reinicia el servidor.
- **Cuota (429):** revisa los limites de tu cuenta y espera antes de reintentar.
- **Creditos (402):** revisa tu cuenta y el modelo elegido; utiliza `openrouter/free` para el router gratuito.
- **Clave/permisos (400, 401, 403):** comprueba la clave y el acceso al modelo.
- **Modelo no disponible (404):** cambia `OPENROUTER_MODEL` por uno disponible y reinicia.
- **MongoDB:** revisa el servicio local y `config.js`.

## Pruebas automatizadas

Ejecuta `npm test`. Las pruebas simulan OpenRouter y MongoDB: no consumen cuota ni registran mensajes reales.

Referencias oficiales: [Chat Completions](https://openrouter.ai/docs/api-reference/chat-completion) y [Free Models Router](https://openrouter.ai/docs/guides/routing/routers/free-router).
