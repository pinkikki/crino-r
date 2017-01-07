
private var skillId : int;
private var description : String;
private var descriptionText : Text;


function Start () {
}

function Update () {
}

public function setDescriptionText(descriptionText : Text) {
	this.descriptionText = descriptionText;
}

public function getSkillId() {
	return skillId;
}

public function setSkillId(skillId) {
	this.skillId = skillId;
}

public function getDescription() {
	return description;
}

public function setDescription(description) {
	this.description = description;
}

public function onClick() {
	descriptionText.text = description;
}