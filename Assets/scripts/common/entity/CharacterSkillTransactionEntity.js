#pragma strict

class CharacterSkillTransactionEntity {

	private var characterId : int;
	private var skillId : int;
	private var mp : int;
	
	public function getCharacterId() {
		return characterId;
	}
	
	public function setCharacterId(characterId) {
		this.characterId = characterId;
	}
	
	public function getSkillId() {
		return skillId;
	}
	
	public function setSkillId(skillId) {
		this.skillId = skillId;
	}
	
	public function getMp() {
		return mp;
	}
	
	public function setMp(mp) {
		this.mp = mp;
	}
}

