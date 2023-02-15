/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', () => console.log('It works'))
  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios')
  Route.get('/listar-todo', 'UsuariosController.getListarUsuariosTodos') // this doesnt exist th
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicaciones')
  Route.get('/listar-usuarios-grupos', 'UsuariosController.getListarUsuariosYGrupos')

  Route.post('/registro-usuarios', 'UsuariosController.setRegistrarUsuarios')
  Route.post('/registro-perfil', 'PerfilsController.setRegistrarPerfil')
  Route.post('/registro-publicacion', 'PublicacionesController.setRegistrarPublicacion')
  Route.post('/registro-grupo', 'GruposController.setRegistrarGrupo')
  Route.post('/registro-usuario-grupo', 'GrupoUsuariosController.setRegistrarGrupoUsuarios')

  Route.get('/usuario-por-id/:id', 'UsuariosController.getUsuarioPorId')
  Route.get('/usuario-por-nombre/:nombre', 'UsuariosController.getUsuarioPorNombre')

  Route.put('/actualizar-usuario/:id', 'UsuariosController.actualizarUsuario')
  Route.delete('/eliminar-usuario/:id', 'UsuariosController.eliminarUsuario')
}).prefix('/alcaldia')
