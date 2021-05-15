const jwt = require('jsonwebtoken');

function generate(id) {
	return jwt.sign({id:id},proscess.env.SECRET);
}

async function validate(token) {
	let id = await jwt.verify(token, proscess.env.SECRET);
	return id.id;
}

module.exports.generate = generate;
module.exports.validate = validate;
