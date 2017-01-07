#pragma strict

class EnemyMasterEntity {

	private var enemyId : String;
	private var enemyName : String;
	private var hp : int;
	private var mp : int;
	private var power : int;
	private var defense : int;
	private var magic : int;
	private var speed : int;
	private var size : int;
	private var assertBundleId : String;

	public function getEnemyId() {
		return enemyId;
	}
	
	public function setEnemyId(enemyId) {
		this.enemyId = enemyId;
	}
	
	public function getEnemyName() {
		return enemyName;
	}
	
	public function setEnemyName(enemyName) {
		this.enemyName = enemyName;
	}
	
	public function getHp() {
		return hp;
	}
	
	public function setHp(hp) {
		this.hp = hp;
	}
	
	public function getMp() {
		return mp;
	}
	
	public function setMp(mp) {
		this.mp = mp;
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
	
	public function getSize() {
		return size;
	}
	
	public function setSize(size) {
		this.size = size;
	}
	
	public function getAssertBundleId() {
		return assertBundleId;
	}
	
	public function setAssertBundleId(assertBundleId) {
		this.assertBundleId = assertBundleId;
	}
	
	public function clone() {
		var returnEntity : EnemyMasterEntity = new EnemyMasterEntity();
		returnEntity.setEnemyId(this.enemyId);
		returnEntity.setEnemyName(this.enemyName);
		returnEntity.setHp(this.hp);
		returnEntity.setMp(this.mp);
		returnEntity.setPower(this.power);
		returnEntity.setDefense(this.defense);
		returnEntity.setMagic(this.magic);
		returnEntity.setSpeed(this.speed);
		returnEntity.setSize(this.size);
		returnEntity.setAssertBundleId(this.assertBundleId);
		return returnEntity;
	}
}