#pragma strict

class SkillMasterEntity {

	private var skillId : int;
	private var skillName : String;
	private var skillType : int;
	private var mp : int;
	private var effectTarget : int;
	private var effectType1 : int;
	private var effectId1 : int;
	private var effectType2 : int;
	private var effectId2 : int;
	private var effectType3 : int;
	private var effectId3 : int;
	private var fieldUseFlg : boolean;
	private var description : String;

	public function getSkillId() {
		return skillId;
	}
	
	public function setSkillId(skillId) {
		this.skillId = skillId;
	}
	
	public function getSkillName() {
		return skillName;
	}
	
	public function setSkillName(skillName) {
		this.skillName = skillName;
	}
	
	public function getSkillType() {
		return skillType;
	}
	
	public function setSkillType(skillType) {
		this.skillType = skillType;
	}
	
	public function getMp() {
		return mp;
	}
	
	public function setMp(mp) {
		this.mp = mp;
	}
	
	public function getEffectTarget() {
		return effectTarget;
	}
	
	public function setEffectTarget(effectTarget) {
		this.effectTarget = effectTarget;
	}
	
	public function getEffectType1() {
		return effectType1;
	}
	
	public function setEffectType1(effectType1) {
		this.effectType1 = effectType1;
	}
	
	public function getEffectId1() {
		return effectId1;
	}
	
	public function setEffectId1(effectId1) {
		this.effectId1 = effectId1;
	}

	public function getEffectType2() {
		return effectType2;
	}
	
	public function setEffectType2(effectType2) {
		this.effectType2 = effectType2;
	}
	
	public function getEffectId2() {
		return effectId2;
	}
	
	public function setEffectId2(effectId2) {
		this.effectId2 = effectId2;
	}

	public function getEffectType3() {
		return effectType3;
	}
	
	public function setEffectType3(effectType3) {
		this.effectType3 = effectType3;
	}
	
	public function getEffectId3() {
		return effectId3;
	}
	
	public function setEffectId3(effectId3) {
		this.effectId3 = effectId3;
	}
	
	public function getFieldUseFlg() {
		return fieldUseFlg;
	}
	
	public function setFieldUseFlg(fieldUseFlg) {
		this.fieldUseFlg = fieldUseFlg;
	}
	
	public function getDescription() {
		return description;
	}
	
	public function setDescription(description) {
		this.description = description;
	}

}