import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacione from 'App/Models/Publicacione'

export default class PublicacionesController {
  async setRegistrarPublicacion({ request, response }: HttpContextContract) {
    try {
      const dataPublicacion = request.only([
        'codigo_publicacion',
        'titulo',
        'cuerpo',
        'codigo_usuario',
      ])
      const codigoPublicacion = dataPublicacion.codigo_publicacion
      const codigoPublicacionExistente = await this.getValidadPublicacionExistente(
        codigoPublicacion
      )
      if (codigoPublicacionExistente === 0) {
        await Publicacione.create(dataPublicacion)
        response.status(200).json({ msg: 'Publicacion se ha creado exitosamente' })
      } else {
        response.status(400).json({ msg: 'El codigo de la publicacion ya esta registrado!' })
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ msg: 'error del servidor' })
    }
  }

  async getValidadPublicacionExistente(codigo_publicacion: number): Promise<number> {
    const total = await Publicacione.query()
      .where({ "codigo_publicacion": codigo_publicacion })
      .count('*')
      .from('publicaciones')
    return parseInt(total[0]['count(*)'])
  }
}
