/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
]

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweetData) {
  const tweetDate = new Date(tweetData.created_at);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(tweetDate);
  const secondDate = new Date();
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  let daysAgo = '';
  diffDays === 0 ? daysAgo = 'Today' : daysAgo = diffDays + ' Day(s) Ago'


  $('.tweet-container').prepend(
      `<article class="tweet-box">
      <header class="tweeter">
        <div>
          <img class="tweeter-image" src=${tweetData.user.avatars}>
          <p>${tweetData.user.name}</p>
        </div>
        <p class="user-id">${tweetData.user.handle}</p>
      </header>
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <p>${daysAgo}</p>
        <div>
        <i class="fa fa-heart icon" aria-hidden="true" ></i>
        <i class="fa fa-flag icon" aria-hidden="true" ></i>
        <i class="fa fa-refresh icon" aria-hidden="true" ></i>
        </div>
      </footer>
    </article>`
      )

}

const renderTweet = function(tweetData) {
  $('.tweet-container').empty();
 for (let tweet of tweetData) {
   createTweetElement(tweet);
 }
}

$(document).ready(function() {
  
  $('.tweet-form').submit(function (event) {
    event.preventDefault();
    $('.tweet-form .error').slideUp()
    if ($('textarea').val() === "" || $('textarea').val() === null) {
      $('.tweet-form .error').text("A penny for your tweet? Looks like you forgot to type out your tweet.").slideDown()
    } else if (parseInt($('.counter').val()) < 0) {
      $('.tweet-form .error').text("Whoa! Ranting much?? Your tweet is too long. Shorten it and smash that tweet button again.").slideDown()
    } else {
      $.ajax('/tweets/', { method: 'POST', data: $(this).serialize() })
      .then(function () {
        console.log('Success: ');
        loadTweets();
    });
    }
  });
 
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET'})
    .then((response) => {
      console.log("RESPONSE: ", response);
      renderTweet(response);
    })
  }

  loadTweets();


  // Check for breakpoint on scroll and changes nav-bar background 
  $(window).scroll(function () {
    const scrollHandler = $(this).scrollTop();
    
    
    if (window.matchMedia('(min-width: 799px)').matches) {
      if (scrollHandler > 400) {
        $('.navText').css("color", "#4056A1")
      } else {
        $('.navText').css("color", "#FFFFFF")
      }
    } else {
      $('.navText').css("color", "#FFFFFF");
    }
     
  });


});



