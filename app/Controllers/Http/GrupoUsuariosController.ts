import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'

export default class GrupoUsuariosController {
  async setRegistrarGrupoUsuarios({ request, response }: HttpContextContract) {
    try {
      const dataGrupoUsuarios = request.only(['codigo_usuario', 'codigo_grupo', 'fecha_inicio'])
      const codigo_usuario = dataGrupoUsuarios.codigo_usuario
      const codigo_grupo = dataGrupoUsuarios.codigo_grupo
      const codigoGrupoUsuarios = await this.getValidarGrupoUsuariosExistente(
        codigo_usuario,
        codigo_grupo
      )
      switch (codigoGrupoUsuarios) {
        case 0:
          await UsuarioGrupo.create(dataGrupoUsuarios)
          response.status(200).json({ msg: 'Registro de usuario con grupo exitoso' })
          break
        case 1:
          response.status(400).json({ msg: 'Usuario no se encuentra registrado' })
          break
        case 2:
          response.status(400).json({ msg: 'Grupo  no se encuentra registrado' })
          break
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ msg: 'Error en el servidor' })
    }
  }

  async getValidarGrupoUsuariosExistente(
    codigo_usuario: number,
    codigo_grupo: number
  ): Promise<number> {
    const totalGrupos = await Grupo.query()
      .where({ codigo_grupo })
      .count('*')
      .from('usuario_grupos')
    const cantidadDatosGrupo = parseInt(totalGrupos[0]['count(*)'])
    if (cantidadDatosGrupo !== 0) {
      const totalUsuarios = Usuario.query().where({ codigo_usuario }).count('*').from('usuarios')
      const cantidadDatosUsuario = parseInt(totalUsuarios[0]['count(*)'])
      if (cantidadDatosUsuario !== 0) return 0
      return 2 // usuario no existe
    }
    return 1 // grupo no existe
  }
}
