// @see https://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues

function getRandomInt(min, max)
{
	var range = max - min + 1;
	var maxRange = 65536;
	var numbers = new Uint16Array(1);

	window.crypto.getRandomValues(numbers);

	if (numbers[0] >= Math.floor(maxRange / range) * range) {
		return getRandomInt(min, max);
	}

	return min + (numbers[0] % range);
}

function testGetRandomInt()
{
	var results = [];

	for (i = 0; i < 5000000; i++) {
		results.push(getRandomInt(1, 49));
	}

	console.log('Average should be close to 25.');
	console.log('Actual average: ' + (results.reduce(function (a, b) { return a + b; }, 0) / results.length));

	return true;
}

function refreshList(list)
{
	var length = $('#password-length').val();
	var count = $('#password-count').val();

	var words = list.data('words');

	list.empty();

	for (c = 0; c < count; c++) {
		var i = getRandomInt(0, words.length - 1);
		var password = words[i];

		for (l = 1; l < length; l++) {
			var v = getRandomInt(1, 9);
			var i = getRandomInt(0, words.length - 1);
			var word = words[i];
			password += v + word.charAt(0).toUpperCase() + word.slice(1);
		}

		list.append($('<li class="list-group-item">').html(password));
	}
}

$('#password-lists .password-list').each(function () {
	var list = $(this);

	$.get($(this).data('path'), function(data) {
		var words = [];

		data.trim().split("\n").forEach(function (line)  {
			var parts = line.split("\t");

			words.push(parts[1]);
		});

		list.data('words', words);

		refreshList(list);
	});
});

$('#password-form').submit(function (e) {
	e.preventDefault();

	$('#password-lists .password-list').each(function () {
		refreshList($(this));
	});
});
