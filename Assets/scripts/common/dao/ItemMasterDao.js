#pragma strict

class ItemMasterDao {

	public static function selectAll() {
		var query : String = "select * from ItemMaster order by item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ItemMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(itemId : int) {
		var query : String = "select * from ItemMaster where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ItemMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	public static function selectByPkItemName(itemId : int) {
		var query : String = "select item_name from ItemMaster where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ItemMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return dr["item_name"];
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : ItemMasterEntity = new ItemMasterEntity();
		var itemId = dr["item_id"];
		var itemName = dr["item_name"];
		var itemType = dr["item_type"];
		var description = dr["description"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (itemName != null) {
			entity.setItemName(itemName);
		}
		
		if (itemType != null) {
			entity.setItemType(itemType);
		}
		
		if (description != null) {
			entity.setDescription(description);	
		}
		return entity;
	}
}