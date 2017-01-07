#pragma strict

class CharacterMasterEntity {

	private var characterId : int;
	private var characterName : String;
	private var userCharacterName : String;
	private var characterType : String;
	private var level : int;
	private var currentHp : int;
	private var maxHp : int;
	private var currentMp : int;
	private var maxMp : int;
	private var power : int;
	private var defense : int;
	private var magic : int;
	private var speed : int;
	private var weaponId : int;
	private var clothesId : int;
	private var shoesId : int;
	private var hatId : int;
	private var fopperyId : int;
	private var experiencePoint : int;
	private var statusDead : boolean;
	private var statusConfusion : boolean;
	private var statusPoison : boolean;
	private var statusParalysis : boolean;
	private var masterSort : int;
	private var currentSort : int;

	public function getCharacterId() {
		return characterId;
	}
	
	public function setCharacterId(characterId) {
		this.characterId = characterId;
	}
	
	public function getCharacterName() {
		return characterName;
	}
	
	public function setCharacterName(characterName) {
		this.characterName = characterName;
	}
	
	public function getUserCharacterName() {
		return userCharacterName;
	}
	
	public function setUserCharacterName(userCharacterName) {
		this.userCharacterName = userCharacterName;
	}
	
	public function getCharacterType() {
		return characterType;
	}
	
	public function setCharacterType(characterType) {
		this.characterType = characterType;
	}
	
	public function getLevel() {
		return level;
	}
	
	public function setLevel(level) {
		this.level = level;
	}
	
	public function getCurrentHp() {
		return currentHp;
	}
	
	public function setCurrentHp(currentHp) {
		this.currentHp = currentHp;
	}
	
	public function getMaxHp() {
		return maxHp;
	}
	
	public function setMaxHp(maxHp) {
		this.maxHp = maxHp;
	}
	
	public function getCurrentMp() {
		return currentMp;
	}
	
	public function setCurrentMp(currentMp) {
		this.currentMp = currentMp;
	}
	
	public function getMaxMp() {
		return maxMp;
	}
	
	public function setMaxMp(maxMp) {
		this.maxMp = maxMp;
	}
	
	public function getPower() {
		return power;
	}
	
	public function setPower(power) {
		this.power = power;
	}
	
	public function getDefense() {
		return defense;
	}
	
	public function setDefense(defense) {
		this.defense = defense;
	}
	
	public function getMagic() {
		return magic;
	}
	
	public function setMagic(magic) {
		this.magic = magic;
	}
	
	public function getSpeed() {
		return speed;
	}
	
	public function setSpeed(speed) {
		this.speed = speed;
	}
	
	public function getWeaponId() {
		return weaponId;
	}
	
	public function setWeaponId(weaponId) {
		this.weaponId = weaponId;
	}
	
	public function getClothesId() {
		return clothesId;
	}
	
	public function setClothesId(clothesId) {
		this.clothesId = clothesId;
	}
	
	public function getShoesId() {
		return shoesId;
	}
	
	public function setShoesId(shoesId) {
		this.shoesId = shoesId;
	}
	
	public function getHatId() {
		return hatId;
	}
	
	public function setHatId(hatId) {
		this.hatId = hatId;
	}
	
	public function getFopperyId() {
		return fopperyId;
	}
	
	public function setFopperyId(fopperyId) {
		this.fopperyId = fopperyId;
	}
	
	public function getExperiencePoint() {
		return experiencePoint;
	}
	
	public function setExperiencePoint(experiencePoint) {
		this.experiencePoint = experiencePoint;
	}
	
	public function getStatusDead() {
		return statusDead;
	}
	
	public function setStatusDead(statusDead) {
		this.statusDead = statusDead;
	}
	
	public function getStatusConfusion() {
		return statusConfusion;
	}
	
	public function setStatusConfusion(statusConfusion) {
		this.statusConfusion = statusConfusion;
	}
	
	public function getStatusPoison() {
		return statusPoison;
	}
	
	public function setStatusPoison(statusPoison) {
		this.statusPoison = statusPoison;
	}
	
	public function getStatusParalysis() {
		return statusParalysis;
	}
	
	public function setStatusParalysis(statusParalysis) {
		this.statusParalysis = statusParalysis;
	}
	
	public function getMasterSort() {
		return masterSort;
	}
	
	public function setMasterSort(masterSort) {
		this.masterSort = masterSort;
	}

	public function getCurrentSort() {
		return currentSort;
	}
	
	public function setCurrentSort(currentSort) {
		this.currentSort = currentSort;
	}
}