#pragma strict
class ItemUtil {

	public static function add(itemId : int) {
		var entity : BelongingsTransactionEntity = BelongingsTransactionDao.selectByPk(itemId);

		if (entity != null) {
			var num : int = entity.getNumber();
			if (num == 99) {
				return false;
			} else {
				entity.setNumber(num + 1);
			}
			BelongingsTransactionDao.update(entity);
		} else {
			entity = new BelongingsTransactionEntity();
			entity.setItemId(itemId);
			entity.setNumber(1);
			BelongingsTransactionDao.insert(entity);
		}
		return true;
	}
}

