console.log("Let's get this party started!");

const $searchEntered = $('#search');
const $giphyArea = $('#giphy-area');

// need to make a function for adding/creating gif and appending it

function makeGif(res) {
	let numRes = res.data.length;

	if (numRes) {
		let rdmIndex = Math.floor(Math.random() * numRes);
		// need a new colounm and add bootstrap class to help keep styling consistent
		let $newCol = $('<div>', { class: 'col-md-4 col-12 mb-4' });
		// here is the new gif with a built in class so it is not too large for the screen
		let $newGif = $('<img>', {
			src: res.data[rdmIndex].images.original.url,
			class: 'w-100'
		});
		// now we need to append what was created
		$newCol.append($newGif);
		$giphyArea.append($newCol);
	}
}

// need to handle the submissions properly

$('form').on('submit', async function(e) {
	e.preventDefault();

	let searchTerm = $searchEntered.val();
	$searchEntered.val('');

	const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
		params: {
			q: searchTerm,
			api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
		}
	});
	makeGif(response.data);
});

// remove on click function

$('#delete').on('click', function() {
	$giphyArea.empty();
});
