#pragma strict

class EquipmentItemMasterDao {

	public static function selectAll() {
		var query : String = "select * from EquipmentItemMaster order by item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EquipmentItemMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(itemId : int) {
		var query : String = "select * from EquipmentItemMaster where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EquipmentItemMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : EquipmentItemMasterEntity = new EquipmentItemMasterEntity();
		var itemId = dr["item_id"];
		var equipmentType = dr["equipment_type"];
		var effectType1 = dr["effect_type1"];
		var effectId1 = dr["effect_id1"];
		var effectType2 = dr["effect_type2"];
		var effectId2= dr["effect_id2"];
		var effectType3 = dr["effect_type3"];
		var effectId3 = dr["effect_id3"];
		var money = dr["money"];
		var characterId1 = dr["character_id1"];
		var characterId2 = dr["character_id2"];
		var characterId3 = dr["character_id3"];
		var characterId4 = dr["character_id4"];
		var characterId5 = dr["character_id5"];
		var characterId6 = dr["character_id6"];
		var characterId7 = dr["character_id7"];
		var characterId8 = dr["character_id8"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (equipmentType != null) {
			entity.setEquipmentType(equipmentType);
		}
		
		if (effectType1 != null) {
			entity.setEffectType1(effectType1);
		}
		
		if (effectId1 != null) {
			entity.setEffectId1(effectId1);
		}
		
		if (effectType2 != null) {
			entity.setEffectType2(effectType2);
		}
		
		if (effectId2 != null) {
			entity.setEffectId2(effectId2);
		}
		
		if (effectType3 != null) {
			entity.setEffectType3(effectType3);
		}
		
		if (effectId3 != null) {
			entity.setEffectId3(effectId3);
		}
		
		if (money != null) {
			entity.setMoney(money);
		}

		if (characterId1 != null) {
			entity.setCharacterId1(characterId1);
		}
		
		if (characterId2 != null) {
			entity.setCharacterId2(characterId2);
		}
		
		if (characterId3 != null) {
			entity.setCharacterId3(characterId3);
		}
		
		if (characterId4 != null) {
			entity.setCharacterId4(characterId4);
		}

		if (characterId5 != null) {
			entity.setCharacterId5(characterId5);
		}
		
		if (characterId6 != null) {
			entity.setCharacterId6(characterId6);
		}
		
		if (characterId7 != null) {
			entity.setCharacterId7(characterId7);
		}
		
		if (characterId8 != null) {
			entity.setCharacterId8(characterId8);
		}
		return entity;
	}
}