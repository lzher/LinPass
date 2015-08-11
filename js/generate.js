var key_map = "JG5$2cpNB%U0nM&Y4TqkfvFubV9w1I8XECDRm#aOLQ!eWtASysiKj7xgH*o6hdP@3lZ^rz";
var pass = '', salt = '';
var key = "";
var addup = new Array();
var type = new Array();
var custom_num = 16;

var f = 0, r = 31, t = 0;
function get_salt() {
	t = 1 - t;
	if(t) {
		return salt[f++].toUpperCase();
	} else {
		return salt[r--];
	}
}

function init() {
	if($('#key_map').val() != '') {
		key_map = $('#key_map').val();
	}
	if($('#custom_num').val() != '' && $('#custom_num').val() < 32) {
		custom_num = $('#custom_num').val();
	} else {
		alert('Custom number error. Now it is set to 16.');
	}
	f = 0;
	r = 31;
	t = 0;
	pass = $.md5($('#pass').val());
	salt = $.md5($('#salt').val());
	key = '';
	type = [];
	
	for(var i = 0; i < 32; ++i) {
		key += pass.charAt(i) + get_salt();
	}
	addup[0] = key.charCodeAt(0);
	for(var i = 1; i < 64; ++i) {
		addup[i] = addup[i - 1] + key.charCodeAt(i);
	}
	
	type.push(document.getElementById("upper").checked);
	type.push(document.getElementById("lower").checked);
	type.push(document.getElementById("digit").checked);
	type.push(document.getElementById("symbol").checked);
}

function is_upper(p) {
	var max = 'Z'.charCodeAt(), min = 'A'.charCodeAt();
	var t = p.charCodeAt();
	return (min <= t) && (max >= t);
}

function is_lower(p) {
	var max = 'z'.charCodeAt(), min = 'a'.charCodeAt();
	var t = p.charCodeAt();
	return (min <= t) && (max >= t);
}

function is_digit(p) {
	var max = '9'.charCodeAt(), min = '0'.charCodeAt();
	var t = p.charCodeAt();
	return (min <= t) && (max >= t);
}

function get_type(adding) {
	if(is_upper(adding)) {
		return 0;
	} else if(is_lower(adding)) {
		return 1;
	} else if(is_digit(adding)) {
		return 2;
	} else {
		return 3;
	}
}

function get_sum(beg, end) {
	var t = 0;
	if(beg > 0) {
		t = addup[beg - 1]
	}
	return addup[end] - t;
}

function generate() {
	init();
	var P = key_map.length;
	
	var sum = 0;
	var res = '';
	for(var i = 0; i < 8; ++i) { //8 chars
		var k = i * 7;
		sum = get_sum(k, k + 7) * (8 - i);
		sum %= P;
		var adding = key_map.charAt(sum);
		if(!type[get_type(adding)]) {
			var j = sum + 1;
			adding = key_map.charAt(j);
			while(!type[get_type(adding)]) {
				if(j == sum) {
					alert('No matching password.');
					return;
				}
				++j;
				j %= P;
				adding = key_map.charAt(j);
			}
		}
		res += adding;
	}
	set_pass(8, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 16; ++i) { //16 chars
		var k = i * 3;
		sum = get_sum(k, k + 7) * (16 - i);
		sum %= P;
		var adding = key_map.charAt(sum);
		if(!type[get_type(adding)]) {
			var j = sum + 1;
			adding = key_map.charAt(j);
			while(!type[get_type(adding)]) {
				if(j == sum) {
					alert('No matching password.');
					return;
				}
				++j;
				j %= P;
				adding = key_map.charAt(j);
			}
		}
		res += adding;
	}
	set_pass(16, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 20; ++i) { //20 chars
		var k = i * 2;
		sum = get_sum(k, k + 7) * (20 - i);
		sum %= P;
		var adding = key_map.charAt(sum);
		if(!type[get_type(adding)]) {
			var j = sum + 1;
			adding = key_map.charAt(j);
			while(!type[get_type(adding)]) {
				if(j == sum) {
					alert('No matching password.');
					return;
				}
				++j;
				j %= P;
				adding = key_map.charAt(j);
			}
		}
		res += adding;
	}
	set_pass(20, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 32; ++i) { //32 chars
		var k = i;
		sum = get_sum(k, k + 7) * (32 - i);
		sum %= P;
		var adding = key_map.charAt(sum);
		if(!type[get_type(adding)]) {
			var j = sum + 1;
			adding = key_map.charAt(j);
			while(!type[get_type(adding)]) {
				if(j == sum) {
					alert('No matching password.');
					return;
				}
				++j;
				j %= P;
				adding = key_map.charAt(j);
			}
		}
		res += adding;
	}
	set_pass(32, res);
	
	sum = 0;
	res = '';
	var step = Math.floor(64 / custom_num) - 1;
	if(step <= 0) {
		alert('Custom number error.');
		return;
	}
	for(var i = 0; i < custom_num; ++i) { //32 chars
		var k = i * step;
		sum = get_sum(k, k + 7) * (32 - i);
		sum %= P;
		var adding = key_map.charAt(sum);
		if(!type[get_type(adding)]) {
			var j = sum + 1;
			adding = key_map.charAt(j);
			while(!type[get_type(adding)]) {
				if(j == sum) {
					alert('No matching password.');
					return;
				}
				++j;
				j %= P;
				adding = key_map.charAt(j);
			}
		}
		res += adding;
	}
	set_pass('custom', res);
	
	//debug();
}

function set_pass(num, res) {
	$('#res_' + num).val(res);
}

function rand_map() {
	var map = $('#key_map').val().split('');
	map.sort(function(){return Math.random()>0.5?-1:1;});
	var res = map.join('');
	$('#key_map').val(res);
	$('#map_history').append(res + '<br />');
}

function debug() {
	$('#result_debug').text(key);
}
