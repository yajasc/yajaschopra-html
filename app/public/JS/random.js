const SomeApp = {
    data() {
      return {
        result: {},
        list: [5,6,7,8],
        message: "Waiting ...",
        bookForm: {}
      }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            //Method 1:
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((json) => {
                console.log("Got json back:", json);
                this.result = json.results[0];
                console.log("C");
            })
            .catch( (error) => {
                console.error(error);
            });
    },
    postNewOffer(evt) {
        this.bookForm.bookId = this.selectedBook.id;        
        
        console.log("Posting!", this.bookForm);

        fetch('api/student/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.bookForm = {};
          });
      }
  },
    created() {
        this.fetchUserData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#someApp');