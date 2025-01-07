import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Cita } from '../modelo/cita';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  // Nueva conexión con la base de datos
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection;
  plataforma: string = ""

  // Declaro las variables que utilizaremos para las configuraciones de la db
  DB_NAME: string = "lista_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "lista_citas";
  COL_CITA: string = "cita";
  COL_AUTOR: string = "autor";
  // Query para crear la tabla que utlizaremos
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS  ${this.TABLE_NAME}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_CITA} TEXT NOT NULL,
      ${this.COL_AUTOR} TEXT NOT NULL
    );
  `;



  constructor() { }


  private async _iniciarPluginWeb(): Promise<void> {
    // Este codigo espera la inserción 
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore()
    }
  }


  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform()
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
    //await this.delete()
    await this.agregarCita({ cita: "Cargar una cita aleatoria3", autor: "autorprueba" })

  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency()
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }


  // Agregamos los metodos que tendrá este clase servicio
  async getCitas(): Promise<Cita[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    return resultado?.values ?? []
  }

  // metodo para eliminar todos los reguistros de la tabla
  async delete(): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)

  }

  // Agregar una cita a la db
  async agregarCita(c: Cita): Promise<void> {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_CITA}, ${this.COL_AUTOR}) VALUES(?, ?)`
    await this.db.run(sql, [c.cita, c.autor])
  }

  // Método para obtener una cita random
  async obtenerCitaRandom(lista_citas: Cita[]): Promise<Cita> {

    const ind = Math.floor(Math.random() * lista_citas.length);
    const result = await lista_citas.splice(ind, 1)[0];
    console.log("cita", result.cita)
    return result
  }
}
