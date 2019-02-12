Vue.config.productionTip = false;
var app = new Vue({
  el: "#app",
  data: {
    message: "Welcome to BT3103!",
    emoticon: "😆",
    letter: "e"
  },
  methods: {
    // Modify to translate each word in sentence.
    translate: async function(word) {
      let url =
        "https://alset.azurewebsites.net/api/go?code=6Y8V2MvVrfCVUIHEIGczJTkffUgQ5IflaHkz9w1peu82c/Cc0BzTvQ==";
      //let response = await fetch(url);
      let options = {
        word: word,
        letter: this.letter,
        emoticon: this.emoticon
      };

      let response = await fetch(url, {
        method: "post",
        body: JSON.stringify(options)
      });

      console.log(response.status);
      //console.log(resposne.text()); // won't work. text() is async
      let result = await response.text();
      // let result = await response.json();
      console.log(result);
      return result;
    },
    reset: function() {
      this.message = "Welcome to BT3103!";
    },
    run: async function() {
      let result = "";
      // Wait on each promise to be resolved in serial.
      let promises = [];
      let originalMessage = this.message;
  
      for (let word of originalMessage.split(" ")) {
        promises.push(this.translate(word));
      }
      let allResults = await Promise.all(promises);
      for (let eachResponse of allResults) {
        result = result + eachResponse + " ";
      }
      this.message = result;
    }


  }
});
