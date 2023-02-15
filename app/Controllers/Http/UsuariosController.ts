import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  async getUsuarioPorId({ request, response }: HttpContextContract): Promise<Usuario | null> {
    try {
      const id = request.param('id')
      const user = await Usuario.find(id)
      response.status(200).json({ msg: 'Query exitoso' })
      return user
    } catch (error) {
      response.status(500).json({ msg: 'Error finding this user' })
      return null
    }
  }

  public async actualizarUsuario({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const datos = request.all()
    const usuario = await Usuario.findOrFail(id)
    usuario.nombre_usuario = datos.nombre_usuario
    usuario.contrasena = datos.contrasena
    usuario.email = datos.email
    usuario.telefono = datos.telefono
    await usuario.save()
    response.status(200).json({ msg: 'Registro actualizado.' })
  }

  public async eliminarUsuario({ request, response }: HttpContextContract) {
    const id = request.param('id')
    await Usuario.query().where('codigo_usuario', id).delete()
    response.status(200).json({ msg: 'Registro eliminado.' })
  }

  public async getUsuarioPorNombre({ request }: HttpContextContract) {
    const name = request.all()
    const users = await Usuario.query().where('nombre_usuario', 'like', `%${name}%`)
    return users
  }

  public async getListarUsuarios(): Promise<Usuario[]> {
    return await Usuario.all()
  }

  async getListarUsuariosYPerfil(): Promise<Usuario[]> {
    const usuarios = await Usuario.query().preload('perfil')
    return usuarios
  }

  async getListarUsuariosYPublicaciones(): Promise<Usuario[]> {
    const usuarios = await Usuario.query().preload('publicaciones')
    return usuarios
  }

  async getListarUsuariosYGrupos(): Promise<Usuario[]> {
    const usuarios = await Usuario.query().preload('usuario_grupos')
    return usuarios
  }

  async setRegistrarUsuarios({ request, response }: HttpContextContract) {
    try {
      const dataUsuario = request.only([
        'codigo_usuario',
        'nombre_usuario',
        'telefono',
        'contrasena',
        'email',
      ])
      const codigo_usuario = dataUsuario.codigo_usuario
      const usuarioExistente = await this.getValidarUsuarioExiste(codigo_usuario)
      if (usuarioExistente === 0) {
        await Usuario.create(dataUsuario)
        response.status(200).json({ msg: 'usuario creado exitosamente' })
      } else {
        response.status(400).json({ msg: 'codigo de usuario ya esta registrado!' })
      }
    } catch (error) {
      console.log(error)
      console.log('HERE REQUEST', JSON.stringify(request,null, 4))
      response.status(500).json({ msg: 'Error en el servidor' })
    }
  }

  async getValidarUsuarioExiste(codigo_usuario: number): Promise<number> {
    const total = await Usuario.query()
      .where({ codigo_usuario: codigo_usuario })
      .count('*')
      .from('usuarios')
    return parseInt(total[0]['count(*)'])
  }
}
