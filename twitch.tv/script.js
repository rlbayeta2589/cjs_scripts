function expandAllFollowedChannels(){
  let showMoreButton;
  let followedChannels;
  let temp = 0;
  do {
    showMoreButton = $([
        'div[aria-label="Followed Channels"] ',
        'div.side-nav-show-more-toggle__button ',
        'button[data-a-target="side-nav-show-more-button"]'
    ].join(''))[0];
    
    if (showMoreButton){
      showMoreButton.click();
      console.log(`showMoreButton clicked ${temp}`);
    } else {
      break;
    }
    
    followedChannels = $([
      'div[aria-label="Followed Channels"] ',
      'div.tw-transition-group > div'
    ].join(''));
    
    let lastExpandedChannel = followedChannels[followedChannels.length - 1];
    let channelStatus = $(lastExpandedChannel).find('div.side-nav-card__live-status')[0];

    temp++;
    if ($(channelStatus).html().includes('Offline')){
      console.log("All live channel already expanded.")
      break;
    }
  } while(temp < 10);
}

function collapseChannels(){
  let showLessButton;
  let temp = 0;
  do {
    showLessButton = $([
        'div[aria-label="Followed Channels"] ',
        'div.side-nav-show-more-toggle__button ',
        'button[data-a-target="side-nav-show-less-button"]'
    ].join(''))[0];
    
    if (showLessButton){
      showLessButton.click();
      console.log(`showLessButton clicked ${temp}`);
    } else {
      break;
    }
    
    temp++;
  } while(temp < 10);
}

$(document).ready(function(){
  const channelCountLimit = 10;
  const favoriteChannelNames = [
    'amamori_naco',
    'cesilia_grace',
    'hakumai',
    'hitohira_hana',
    'iotancha',
    'iitifox',
    'kagasumire',
    'kumako___',
    'mmafu_',
    'puioff',
    'salmonchuxd',
    'valorant',
    'valorant_jpn',
  ]
  
  $('div.top-nav__menu div').first().append([
    '<button id="favorite-arrange-btn" class="fav-custom-btn">FAVORITE</button>',
    '<button id="live-show-btn" class="fav-custom-btn">LIVE</button>'
  ].join(''));
  let liveButton = $('#live-show-btn');
  let favButton = $('#favorite-arrange-btn');
  
  $('.fav-custom-btn').css({
    "font-size": "1em",
    "font-weight": "600",
    "border": "1px solid darkgray",
    "padding": "5px",
    "margin": "auto",
    "height": "70%",
    "border-radius": "25px",
    "background": "gray"
  });
  
  liveButton.click(function(){
    let followedChannels = $('div[aria-label="Followed Channels"] div.tw-transition-group > div');
    $(followedChannels).each(function() {
      if (!$(this).html().includes('Offline')) {
        $(this).attr('style', 'display: block');
      }
    })
  })
  
  favButton.click(function(){
    expandAllFollowedChannels();
  
    let followedChannels = $('div[aria-label="Followed Channels"] div.tw-transition-group > div');
    let showLessButton = $([
        'div[aria-label="Followed Channels"] ',
        'div.side-nav-show-more-toggle__button ',
        'button[data-a-target="side-nav-show-less-button"]'
    ].join(''))[0];
    $(showLessButton).attr('style', 'display: none !important');
    
    let channelCount = 0;
    $(followedChannels).each(function() {
      if ($(this).html().includes('Offline')) {
        $(this).attr('style', 'display: none');
        return;
      }
      if (!$(this).html().includes('favorite-channel') && 
          favoriteChannelNames.some(x => $(this).html().includes(x))) {
            $(this).find('div').first().addClass('favorite-channel');
            $(this).prependTo(this.parentNode);
      }
    });
    
    if (followedChannels.length >= channelCountLimit) {
      let diff = channelCountLimit - followedChannels.length;
      followedChannels = $('div[aria-label="Followed Channels"] div.tw-transition-group > div');
      $(followedChannels).slice(diff).each(function() {
        $(this).attr('style', 'display: none');
      })
    }
    
    $('div.favorite-channel div.tw-channel-status-indicator').css({
      "background-color": "yellow",
      "width": "1em",
      "height": "1em"
    }).addClass('favorite-channel-star');
    
    // collapseChannels();
    // setTimeout(collapseChannels, 1000);
  });
});

