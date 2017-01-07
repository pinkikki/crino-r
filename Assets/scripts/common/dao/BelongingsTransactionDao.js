#pragma strict

class BelongingsTransactionDao {

	public static function selectAll() {
		var query : String = "select * from BelongingsTransaction order by item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<BelongingsTransactionEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectExhaustionJoinItemMaster() {
		var query : String = "select bt.item_id, bt.number, im.item_name, im.description from BelongingsTransaction bt inner join ItemMaster im on bt.item_id = im.item_id where im.item_type = '1' order by bt.item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<BltItmEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createCustomEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectEquipmentJoinItemMaster() {
		var query : String = "select bt.item_id, im.item_type, bt.number, im.item_name, im.description from BelongingsTransaction bt inner join ItemMaster im on bt.item_id = im.item_id where im.item_type = '2' order by bt.item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<BltItmEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createCustomEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectImportantJoinItemMaster() {
		var query : String = "select bt.item_id, bt.number, im.item_name, im.description from BelongingsTransaction bt inner join ItemMaster im on bt.item_id = im.item_id where im.item_type = '3' order by bt.item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<BltItmEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createCustomEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(itemId : int) {
		var query : String = "select * from BelongingsTransaction where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}

	public static function insert(entity : BelongingsTransactionEntity) {
		var query : String = "insert into BelongingsTransaction (item_id, number) values (";
		query += entity.getItemId() + ",";
		query += entity.getNumber() + ");";
		DbManager.update(query);
	}

	public static function update(entity : BelongingsTransactionEntity) {
		var query : String = "update BelongingsTransaction set ";
		query += "number = " + entity.getNumber() + " ";
		query += "where item_id = " + entity.getItemId() + ";";
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : BelongingsTransactionEntity = new BelongingsTransactionEntity();
		var itemId = dr["item_id"];
		var number = dr["number"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (number != null) {
			entity.setNumber(number);
		}
		
		return entity;
	}
	
	private static function createCustomEntity(dr : DataRow) {
        var entity : BltItmEntity = new BltItmEntity();
		var itemId = dr["item_id"];
		var itemType = dr["item_type"];
		var number = dr["number"];
		var itemName = dr["item_name"];
		var description = dr["description"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (itemType != null) {
			entity.setItemType(itemType);
		}
		
		if (number != null) {
			entity.setNumber(number);
		}
		
		if (itemName != null) {
			entity.setItemName(itemName);
		}
		
		if (description != null) {
			entity.setDescription(description);
		}
		
		return entity;
	}
}