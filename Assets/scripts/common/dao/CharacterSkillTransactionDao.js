#pragma strict

class CharacterSkillTransactionDao {

	public static function selectAll() {
		var query : String = "select * from CharacterSkillTransaction";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<CharacterSkillTransactionEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByCharacterId(characterId : int) {
		var query : String = "select sm.skill_name, sm.skill_type, sm.mp, sm.description from CharacterSkillTransaction cst inner join SkillMaster sm on cst.skill_id = sm.skill_id where cst.character_id = " + characterId + " and field_use_flg = '1' order by cst.skill_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<CskSkmEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createCustomEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByCharacterIdAndSkillType(characterId : int, skillType : int) {
		var query : String = "select sm.skill_id, sm.skill_name, sm.skill_type, sm.mp, sm.effect_target, sm.effect_type1, sm.effect_id1, sm.effect_type2, sm.effect_id2, sm.effect_type3, sm.effect_id3 from CharacterSkillTransaction cst inner join SkillMaster sm on cst.skill_id = sm.skill_id where cst.character_id = " + characterId + " and sm.skill_type = " + skillType + " order by cst.skill_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<CskSkmEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createCustomEntity(dr));
        }
        
        return entityList;
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : CharacterSkillTransactionEntity = new CharacterSkillTransactionEntity();
		var characterId = dr["character_id"];
		var skillId = dr["skill_id"];
		
		if (characterId != null) {
			entity.setCharacterId(characterId);
		}
		
		if (skillId != null) {
			entity.setSkillId(skillId);
		}
		
		return entity;
	}
	
	private static function createCustomEntity(dr : DataRow) {
        var entity : CskSkmEntity = new CskSkmEntity();
		var skillId = dr["skill_id"];
		var skillName = dr["skill_name"];
		var skillType = dr["skill_type"];
		var mp = dr["mp"];
		var effectTarget = dr["effect_target"];
		var effectType1 = dr["effect_type1"];
		var effectId1 = dr["effect_id1"];
		var effectType2 = dr["effect_type2"];
		var effectId2= dr["effect_id2"];
		var effectType3 = dr["effect_type3"];
		var effectId3 = dr["effect_id3"];
		var fieldUseFlg = dr["field_use_flg"];
		var description = dr["description"];
		
		if (skillId != null) {
			entity.setSkillId(skillId);
		}
		
		if (skillName != null) {
			entity.setSkillName(skillName);
		}
		
		if (skillType != null) {
			entity.setSkillType(skillType);
		}
		
		if (mp != null) {
			entity.setMp(mp);
		}

		if (effectTarget != null) {
			entity.setEffectTarget(effectTarget);
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
		
		if (fieldUseFlg != null) {
			entity.setFieldUseFlg(fieldUseFlg);
		}
		
		if (description != null) {
			entity.setDescription(description);
		}
		
		return entity;
	}
}

