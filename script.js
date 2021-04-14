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
	var length = document.getElementById('password-length').value;
	var count = document.getElementById('password-count').value;
	var numbers = document.getElementById('password-numbers').checked;
	var symbols = [];

	if (document.getElementById('password-symbols').checked) {
		symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
	}

	var words = wordLists[list.dataset.path];

	list.innerHTML = '';

	for (c = 0; c < count; c++) {
		var i = getRandomInt(0, words.length - 1);
		var password = words[i];

		for (l = 1; l < length; l++) {
			var separator = '';

			if (numbers) {
				separator += getRandomInt(2, 9);
			}

			if (symbols.length) {
				separator += symbols[getRandomInt(0, symbols.length - 1)];
			}

			var word = words[getRandomInt(0, words.length - 1)];

			password += separator + word.charAt(0).toUpperCase() + word.slice(1);
		}

		list.innerHTML += '<li class="list-group-item">' + password + '</li>';
	}
}

var wordLists = [];

document.addEventListener('DOMContentLoaded', function (event) {
	document.querySelectorAll('#password-lists .password-list').forEach(function (list) {
		fetch(list.dataset.path).then(function(response) {
			return response.text();
		}).then(function (text) {
			var words = [];

			text.trim().split("\n").forEach(function (line)  {
				var parts = line.split("\t");

				words.push(parts[1]);
			});

			wordLists[list.dataset.path] = words;

			refreshList(list);
		});
	});

	document.getElementById('password-form').onsubmit = function (e) {
		e.preventDefault();

		document.querySelectorAll('#password-lists .password-list').forEach(function (list) {
			refreshList(list);
		});
	};
});
