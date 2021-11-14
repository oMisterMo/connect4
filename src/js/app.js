
var app = new Vue({
    el: '#app',

    //HTML
    template: `<div>
      <h1>Hello</h1>
    </div>`,

    //JS
    data: function(){
        return {
            message: 'Hello Mo!'
        }
    },
    methods: {
        
    },
    mounted(){
      console.log("Mounted #app");
    }
  })