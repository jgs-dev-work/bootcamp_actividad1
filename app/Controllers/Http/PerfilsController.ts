import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil';

export default class PerfilsController {
  async setRegistrarPerfil({request, response}: HttpContextContract){
    try{
      const dataPerfil = request.only(['codigo_perfil', 'codigo_usuario', 'nombre_perfil', 'fecha_creacion']);
      const codigoPerfil = dataPerfil.codigo_perfil;
      const codigoPerfilExistente = await this.getValidarPerfilExistente(codigoPerfil)
      if(codigoPerfilExistente === 0 ){
        await Perfil.create(dataPerfil)
        response.status(200).json({msg: 'El perfil se ha creado exitosamente'})
      } else {
        response.status(400).json({msg: 'El codigo de perfil ya esta registrado!'})
      }
    } catch(error){
      console.log(error);
      response.status(500).json({msg: 'error del servidor'})
    }
  }

  async getValidarPerfilExistente(codigo_perfil:number):Promise<number>{
    const total = await Perfil.query().where({codigo_perfil}).count('*').from('perfils')
    return parseInt(total[0]['count(*)'])
  }
}
