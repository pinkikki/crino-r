#pragma strict

class TeamMasterEntity {

	private var characterId1 : int;
	private var characterId2 : int;
	private var characterId3 : int;
	private var characterId4 : int;
	private var money : int;

	public function getCharacterId1() {
		return characterId1;
	}
	
	public function setCharacterId1(characterId1) {
		this.characterId1 = characterId1;
	}
	
	public function getCharacterId2() {
		return characterId2;
	}
	
	public function setCharacterId2(characterId2) {
		this.characterId2 = characterId2;
	}
	
	public function getCharacterId3() {
		return characterId3;
	}
	
	public function setCharacterId3(characterId3) {
		this.characterId3 = characterId3;
	}
	
	public function getCharacterId4() {
		return characterId4;
	}
	
	public function setCharacterId4(characterId4) {
		this.characterId4 = characterId4;
	}
	
	public function getMoney() {
		return money;
	}
	
	public function setMoney(money) {
		this.money = money;
	}

}