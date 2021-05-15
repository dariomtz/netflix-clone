const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;

function generate(id) {
	return jwt.sign({id:id},secret);
}

async function validate(token) {
	let id = await jwt.verify(token, secret);
	return id.id;
}

module.exports.generate = generate;
module.exports.validate = validate;
