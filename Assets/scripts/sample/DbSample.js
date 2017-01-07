#pragma strict

function Start () {
//	CharacterMasterDao.selectAll();
//	var entity : CharacterMasterEntity = CharacterMasterDao.selectByPk(1);
//	Debug.Log(entity.getUserCharacterName());
//	CharacterMasterDao.selectByPk(3);
//	entity.setUserCharacterName("わたる");
//	CharacterMasterDao.update(entity);
//	ItemMasterDao.selectAll();
//	ItemMasterDao.selectByPk(1);
//	ItemMasterDao.selectByPk(3);
//	SkillMasterDao.selectAll();
//	SkillMasterDao.selectByPk(1);
//	SkillMasterDao.selectByPk(3);
//	var teamMasterEntity : TeamMasterEntity = TeamMasterDao.select();
//	teamMasterEntity.setCharacterId1(2);
//	TeamMasterDao.update(teamMasterEntity);
//	var systemSettingMasterEntity : SystemSettingMasterEntity = SystemSettingMasterDao.select();
//	systemSettingMasterEntity.setWatchFlg(false);
//	SystemSettingMasterDao.update(systemSettingMasterEntity);
//	BelongingsTransactionDao.selectAll();
//	BelongingsTransactionDao.selectByPk(1);
//	BelongingsTransactionDao.selectByPk(3);
//	SaveUtil.save();
	SaveUtil.start();
}

function Update () {
//	Debug.Log(Time.realtimeSinceStartup);
}