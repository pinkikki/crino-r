#pragma strict

class SkillMasterDao {

	public static function selectAll() {
		var query : String = "select * from SkillMaster order by skill_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<SkillMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(skillId : int) {
		var query : String = "select * from SkillMaster where skill_id = " + skillId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<SkillMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : SkillMasterEntity = new SkillMasterEntity();
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