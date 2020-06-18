exports.leadZero = function(n){ return n < 10 ? '0'+n : n.toString(); }
exports.dateFormat = function(date){ return `${exports.leadZero(date.getDate())}/${exports.leadZero(date.getMonth()+1)}/${exports.leadZero(date.getFullYear())}`; }
exports.hourFormat = function(date){ return `${exports.leadZero(date.getHours())}:${exports.leadZero(date.getMinutes())}:${exports.leadZero(date.getSeconds())}`; }
exports.logTime = content => {
	let dateNow = new Date();
	console.log(`${exports.dateFormat(dateNow)} ${exports.hourFormat(dateNow)} ${content}`);
}