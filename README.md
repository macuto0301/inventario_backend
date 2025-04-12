# Inventario Backend

Backend para el sistema de inventario desarrollado con Node.js, Express y PostgreSQL.

## Características

- API RESTful para gestión de productos
- Integración con base de datos PostgreSQL
- Endpoint para consultar precios del dólar (oficial y paralelo)
- Manejo de errores centralizado
- Arquitectura limpia y modular

## Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/macuto0301/inventario_backend.git
cd inventario_backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_USER=tu_usuario
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_PASSWORD=tu_contraseña
PORT=3001
```

## Estructura del Proyecto

```
src/
├── application/     # Casos de uso y lógica de negocio
├── domain/         # Entidades y puertos
├── infrastructure/ # Implementaciones concretas
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   └── routes/
└── index.js        # Punto de entrada de la aplicación
```

## Endpoints Disponibles

### Productos

- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener un producto por ID
- `POST /productos` - Crear un nuevo producto
- `PUT /productos/:id` - Actualizar un producto
- `DELETE /productos/:id` - Eliminar un producto
- `PUT /productos/:id/stock` - Actualizar stock de un producto

### Dólar

- `GET /dolar` - Obtener precios del dólar oficial y paralelo

### Health Check

- `GET /health` - Verificar estado del servidor

## Ejemplo de Uso

### Obtener precios del dólar

```bash
curl http://localhost:3001/dolar
```

Respuesta:

```json
{
  "oficial": {
    "precio": 78.3635,
    "fechaActualizacion": "2025-04-11T21:00:48.774Z"
  },
  "paralelo": {
    "precio": 101.09,
    "fechaActualizacion": "2025-04-11T21:00:48.774Z"
  }
}
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
