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



const createTweetElement = function(tweetData) {
  console.log("TWEET DATA: ", tweetData);
  $('.tweet-container').prepend(
      `<article class="tweet-box">
      <header class="tweeter">
        <div>
          <img class="tweeter-image" src=${tweetData.user.avatars}>
          <p>${tweetData.user.name}</p>
        </div>
        <p class="user-id">${tweetData.user.handle}</p>
      </header>
      <p>${tweetData.content.text}</p>
      <footer>
        <p>10 days agao</p>
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
    
    if ($('textarea').val() === "" || $('textarea').val() === null) {
      window.alert("A penny for your tweet? Looks like you forgot to type out your tweet.")
    } else if (parseInt($('.counter').val()) < 0) {
      window.alert("Whoa! Save some characters for another tweet. Your tweet is too long. Shorten it and smash that tweet button.")
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

});



