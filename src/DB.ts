import * as mysql from 'mysql'
import * as DBSetting from './config/dbsetting.json'
import * as SLog from './SLog'

class DB {
  static conn: mysql.Connection

  static init() {
    this.conn = mysql.createConnection(DBSetting)
    SLog.success('DB Connection Ready')
  }

  static query(query: string, values: any, callback: mysql.queryCallback) {
    this.conn.query(query, values, callback)
  }
}

export default DB
