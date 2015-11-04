beforeEach(function() {
  this.addMatchers({
    toBeTest: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});
