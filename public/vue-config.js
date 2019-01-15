(function() {
  let vueConfig = new vueConfig({
    el: "#vueRender",
    data: {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      con_password: null
    },
    created: () => {
      var self = this;
      axios.get("");
    },
    methods: {
      signupHandler: () => {
        var self = this;
        var payload = {};
      }
    }
  });
})();
  