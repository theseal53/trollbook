var app = new Vue({
  el: '#app',
  data: {
    users: [],
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    aboutMe: "",
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get('/api/users');
        this.users = response.data;
        console.log(this.users);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        const formData = new FormData();
        let r2 = await axios.post('/api/users', {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          aboutMe: this.aboutMe,
        });

        console.log(this.username)
      } catch (error) {
        console.log(error);
      }
    },
    loadUserData() {
      if (this.username != "") {
        var found = data.users.find(function(element) {
          return this.username == found.username;
        });
        this.firstName = found.username;
        this.lastName = found.lastName;
        this.gender = found.gender;
        this.aboutMe = found.aboutMe;
      }
    }
  },
  beforeMount() {
    this.getUsers();
    this.loadUserData();
  },
});
