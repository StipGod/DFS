# DFS

## Configuración del sistema

Antes de correr el sistema de archivos distribuidos, es importante tener las siguientes herramientas instaladas en la máquina:

- `node`
- `npm`

Una vez instaladas estas herramientas, haga un fork de este repositorio y corra el siguiente comando en la raíz del proyecto para instalar todas las dependencias:

```bash
npm i
```

## Estructura y puesta en marcha del sistema

Dentro de src, encontrará las dos carpetas principales:

- `dataNode`
- `nameNode`

Para correr toda la API de cada uno de estos sistemas, diríjase a sus archivos main y ejecute el siguiente comando:

```bash
node main.js
```

Entienda que este proyecto está estructurado de la siguiente manera: el `main` de cada nodo llama al `startup`, al `server` y lee del `config`. El startup solo se ejecuta al momento de inicialización y el servidor contiene el listado de todas las rutas API Rest.

También es necesario ejecutar todos los servidores gRPC de cada servidor. Para ejecutar estos servidores, diríjase a los archivos `rpcServer.js` y ejecute el siguiente comando:

```bash
node rpcServer.js
```
