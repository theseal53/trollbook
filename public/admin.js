//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"


var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    description: "",
    file: null,
    addItem: null,
    findTitle: "",
    findItem: null,
    items: [],
  },
  created() {
    this.getItems();
  },
  computed: {
    findTitleMethod() {
      return this.findTitle;
    },
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    selectItem(item) {
      this.findTitle = item.title;
      this.findItem = item;
    },
    async upload() {
      if (this.title != "") {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/items', {
            title: this.title,
            description: this.description,
            path: r1.data.path
          });
          console.log(this.description)
          this.addItem = r2.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getItems() {

        try {
          let response = await axios.get("/api/items");
          this.items = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
    },
    async deleteItem(item) {

        try {
          let response = axios.delete("/api/items/" + item._id);
          this.findItem = null;
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
    },
    async editItem(item) {
        try {
          let response = await axios.put("/api/items/" + item._id, {
            title: this.findItem.title,
          });
          this.findItem = null;
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
    },

  }
});
