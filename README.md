# DFS

## Configuración del sistema

Antes de correr el sistema de archivos distribuidos, es importante tener las siguientes herramientas instaladas en la máquina:

- `node`
- `npm`

Una vez instaladas estas herramientas, haga un fork de este repositorio y corra el siguiente comando en la raíz del proyecto para instalar todas las dependencias:

```bash
npm i
```

Ahora es necesario crear el archivo `.env` Para esto, ejecute el siguiente comando en la raíz:

```bash
cp .env.example .env
```

Para que el sistema pueda funcionar adecuadamente, debe asignar un valor a cada una de estas variables de ambiente.

## Configuración de los nodos

Configuración de los Naming Nodes:
En el archivo de configuración de los Naming Nodes, debe escribir todas las IPs de los diferentes DataNodes que tendrá su sistema.

Configuración de los Data Nodes:
En el archivo de configuración de los Data Nodes, debe listar las IPs de los dos NamingNodes que tendrá el sistema.

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
