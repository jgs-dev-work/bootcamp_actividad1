import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UsuarioGrupo extends BaseModel {
  @column({ isPrimary: true }) public codigo_usuario: number
  @column({ isPrimary: true }) public codigo_grupo: number
  @column() public fecha_inicio: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
