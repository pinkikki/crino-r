#pragma strict
class WaterBottleUtil {

	public static function getHp(scale : int) {
		var entity : WaterBottleMasterEntity = WaterBottleMasterDao.selectJoinExhaustionItemMaster();
		var resultAmount : int = entity.getAmount() - scale;
		if (resultAmount < 0) {
			resultAmount = 0;
		}
		entity.setAmount(resultAmount);
		WaterBottleMasterDao.update(entity.getWaterBottleId(), entity.getAmount());
		var recoveryHp : int = scale * entity.getHp();
		return recoveryHp;
	}
}
