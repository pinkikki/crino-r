#pragma strict

class DbManager {

	public static function select(query) {
		var sqlDB : SqliteDatabase = new SqliteDatabase("crino-rMaster.db");
		var dataTable : DataTable = sqlDB.ExecuteQuery(query);
        return dataTable;
	}
	
	public static function update(query) {
		var sqlDB : SqliteDatabase = new SqliteDatabase("crino-rMaster.db");
		sqlDB.ExecuteNonQuery(query);
	}
}