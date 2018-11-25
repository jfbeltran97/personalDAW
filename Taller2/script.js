function createTweet(author, description, time){
	function createMainRow(author, description){
		function createWrapper(author, description){
			function createAuthor(name){
				var author = document.createElement('p');
				var span = document.createElement('span');
				span.className = "author";
				span.innerHTML = "@" + name;
				author.innerHTML = span.innerHTML + " dijo:"
				return author;
			}
			
			function createDesc(description){
				var desc = document.createElement('p');
				desc.innerHTML = description;
				return desc;
			}
			
			var wrapper = document.createElement('div');
			wrapper.className = "col-md-8";
			
			wrapper.appendChild(createAuthor(author));
			wrapper.innerHTML += description;
			return wrapper;
		}

		function createIcon(){
			var icon = document.createElement('a'); 
		  	icon.className = "fa fa-twitter col-md-4 text-center";
		  	return icon;
		}
		
		var row = document.createElement('div');
		row.className = "row";
		
		row.append(createIcon(), createWrapper(author, description));
		return row;
	}

	function createTime(time){
		var div = document.createElement('div');
		div.className = "row";
		var timeTag = document.createElement('time');
		timeTag.className = "col-md-12 text-right";
		timeTag.innerHTML = time;
		div.appendChild(timeTag);
		return div;
	}
	
	var tweet = document.createElement('div');
  	tweet.className = 'tweet';
  	
  	var mainRow = createMainRow(author, description);
  	var timeDiv = createTime(time);
  	
  	tweet.append(mainRow, timeDiv);
  	return tweet;
	
}
function loadNews(term){
  $.ajax({
    type: 'GET',
    url: 'https://twitrss.me/twitter_search_to_rss/?term=' + term,
    dataType: 'xml',
    success: function(xml){
      //console.log('SUCCESS');
      $(xml).find('item').each(function(){
      	var author = $(this).find("dc\\:creator").text();
      	var description = $(this).find('description').text();
      	var date = $(this).find('pubDate').text();
      	var tweet = createTweet(author, description, date);
      	$('#tweets').append(tweet);
      	
      });
      console.log('Termino');
    },
    error: function(error){
      console.log(error);
    },
  });
}


$('#submit').on('click', function(e){
		e.preventDefault();
		var term = $('#term').val();
		loadNews(term);
		
});

