var key_map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
var pass = '', salt = '';
var key = "";
var addup = new Array();

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
	f = 0;
	r = 31;
	t = 0;
	pass = $.md5($('#pass').val());
	salt = $.md5($('#salt').val());
	key = '';
	
	for(var i = 0; i < 32; ++i) {
		key += pass.charAt(i) + get_salt();
	}
	addup[0] = key.charCodeAt(0);
	for(var i = 1; i < 64; ++i) {
		addup[i] = addup[i - 1] + key.charCodeAt(i);
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
		res += key_map.charAt(sum);
		sum = 0;
	}
	set_pass(8, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 16; ++i) { //16 chars
		var k = i * 3;
		sum = get_sum(k, k + 7) * (16 - i);
		sum %= P;
		res += key_map.charAt(sum);
		sum = 0;
	}
	set_pass(16, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 20; ++i) { //20 chars
		var k = i * 2;
		sum = get_sum(k, k + 7) * (20 - i);
		sum %= P;
		res += key_map.charAt(sum);
		sum = 0;
	}
	set_pass(20, res);
	
	sum = 0;
	res = '';
	for(var i = 0; i < 32; ++i) { //32 chars
		var k = i;
		sum = get_sum(k, k + 7) * (32 - i);
		sum %= P;
		res += key_map.charAt(sum);
		sum = 0;
	}
	set_pass(32, res);
	
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
