#pragma strict

class CharacterMasterDao {

	public static function selectAll() {
		var query : String = "select * from CharacterMaster order by character_id asc";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<CharacterMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(characterId : int) {
		var query : String = "select * from CharacterMaster where character_id = " + characterId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<CharacterMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}
	
	public static function update(entity : CharacterMasterEntity) {
		var query : String = "update CharacterMaster set ";
		query += "character_id = " + entity.getCharacterId() + ",";
		query += "character_name = " + "'" + entity.getCharacterName() + "'" + ",";
		query += "user_character_name = " + "'" + entity.getUserCharacterName() + "'" + ",";
		query += "character_type = " + "'" + entity.getCharacterType() + "'" + ",";
		query += "level = " + "'" + entity.getLevel() + "'" + ",";
		query += "current_hp = " + entity.getCurrentHp() + ",";
		query += "max_hp = " + entity.getMaxHp() + ",";
		query += "current_mp = " + entity.getCurrentMp() + ",";
		query += "max_mp = " + entity.getMaxMp() + ",";
		query += "power = " + entity.getPower() + ",";
		query += "defense = " + entity.getDefense() + ",";
		query += "magic = " + entity.getMagic() + ",";
		query += "speed = " + entity.getSpeed() + ",";
		if (entity.getWeaponId() == 0) {
			query += "weapon_id = null,";	
		} else {
			query += "weapon_id = " + entity.getWeaponId() + ",";
		}
		if (entity.getClothesId() == 0) {
			query += "clothes_id = null,";	
		} else {
			query += "clothes_id = " + entity.getClothesId() + ",";
		}
		if (entity.getShoesId() == 0) {
			query += "shoes_id = null,";	
		} else {
			query += "shoes_id = " + entity.getShoesId() + ",";
		}
		if (entity.getHatId() == 0) {
			query += "hat_id = null,";	
		} else {
			query += "hat_id = " + entity.getHatId() + ",";
		}
		if (entity.getFopperyId() == 0) {
			query += "foppery_id = null,";	
		} else {
			query += "foppery_id = " + entity.getFopperyId() + ",";
		}
		
		query += "experience_point = " + entity.getExperiencePoint() + ",";
		query += "status_dead = " + "'" + entity.getStatusDead() + "'" + ",";
		query += "status_confusion = " + "'" + entity.getStatusConfusion() + "'" + ",";
		query += "status_poison = " + "'" + entity.getStatusPoison() + "'" + ",";
		query += "status_paralysis = " + "'" + entity.getStatusParalysis() + "'" + ",";
		query += "master_sort = " + entity.getMasterSort() + ",";
		query += "current_sort = " + "'" + entity.getCurrentSort() + "'" + " ";
		query += "where character_id = " + entity.getCharacterId() + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : CharacterMasterEntity = new CharacterMasterEntity();
		var characterId = dr["character_id"];
		var characterName = dr["character_name"];
		var userCharacterName = dr["user_character_name"];
		var characterType = dr["character_type"];
		var level = dr["level"];
		var currentHp = dr["current_hp"];
		var maxHp = dr["max_hp"];
		var currentMp = dr["current_mp"];
		var maxMp = dr["max_mp"];
		var power = dr["power"];
		var defense = dr["defense"];
		var magic = dr["magic"];
		var speed = dr["speed"];
		var weaponId = dr["weapon_id"];
		var clothesId = dr["clothes_id"];
		var shoesId = dr["shoes_id"];
		var hatId = dr["hat_id"];
		var fopperyId = dr["foppery_id"];
		var experiencePoint = dr["experience_point"];
		var statusDead = dr["status_dead"];
		var statusConfusion = dr["status_confusion"];
		var statusPoison = dr["status_poison"];
		var statusParalysis = dr["status_paralysis"];
		var masterSort = dr["master_sort"];
		var currentSort = dr["current_sort"];
		
		if (characterId != null) {
			entity.setCharacterId(characterId);
		}
		
		if (characterName != null) {
			entity.setCharacterName(characterName);
		}
		
		if (userCharacterName != null) {
			entity.setUserCharacterName(userCharacterName);
		}
		
		if (characterType != null) {
			entity.setCharacterType(characterType);
		}
		
		if (level != null) {
			entity.setLevel(level);
		}
		
		if (currentHp != null) {
			entity.setCurrentHp(currentHp);
		}
		
		if (maxHp != null) {
			entity.setMaxHp(maxHp);
		}
		
		if (currentMp != null) {
			entity.setCurrentMp(currentMp);
		}
		
		if (maxMp != null) {
			entity.setMaxMp(maxMp);
		}
		
		if (power != null) {
			entity.setPower(power);
		}
		
		if (defense != null) {
			entity.setDefense(defense);
		}
		
		if (magic != null) {
			entity.setMagic(magic);
		}
		
		if (speed != null) {
			entity.setSpeed(speed);	
		}
		
		if (weaponId != null) {
			entity.setWeaponId(weaponId);	
		}
		
		if (clothesId != null) {
			entity.setClothesId(clothesId);	
		}
		
		if (shoesId != null) {
			entity.setShoesId(shoesId);	
		}
		
		if (hatId != null) {
			entity.setHatId(hatId);	
		}
		
		if (fopperyId != null) {
			entity.setFopperyId(fopperyId);	
		}
		
		if (experiencePoint != null) {
			entity.setExperiencePoint(experiencePoint);	
		}
		
		if (statusDead != null) {
			if (statusDead) {
				entity.setStatusDead(true);
			} else {
				entity.setStatusDead(false);
			}
		}
		
		if (statusConfusion != null) {
			if (statusConfusion) {
				entity.setStatusConfusion(true);
			} else {
				entity.setStatusConfusion(false);
			}
		}
		
		if (statusPoison != null) {
			if (statusPoison) {
				entity.setStatusPoison(true);
			} else {
				entity.setStatusPoison(false);
			}
		}
		
		if (statusParalysis != null) {
			if (statusParalysis) {
				entity.setStatusParalysis(true);
			} else {
				entity.setStatusParalysis(false);
			}
		}
		
		if (masterSort != null) {
			entity.setMasterSort(masterSort);	
		}
		
		if (currentSort != null) {
			entity.setCurrentSort(currentSort);	
		}
		return entity;
	}
}