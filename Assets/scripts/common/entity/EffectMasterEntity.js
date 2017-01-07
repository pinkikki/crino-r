#pragma strict

class EffectMasterEntity {

	private var effectId : int;
	private var valueType : int;
	private var rangeType : int;
	private var min : int;
	private var max : int;

	public function getEffectId() {
		return effectId;
	}
	
	public function setEffectId(effectId) {
		this.effectId = effectId;
	}
	
	public function getValueType() {
		return valueType;
	}
	
	public function setValueType(valueType) {
		this.valueType = valueType;
	}
	
	public function getRangeType() {
		return rangeType;
	}
	
	public function setRangeType(rangeType) {
		this.rangeType = rangeType;
	}
	
	public function getMin() {
		return min;
	}
	
	public function setMin(min) {
		this.min = min;
	}

	public function getMax() {
		return max;
	}
	
	public function setMax(max) {
		this.max = max;
	}
}