Vue.component('mybutton', {
  template: '\
    <div>\
      <button class="buttonClass" @click="handleClick" :disabled="banned">\
        <slot></slot>\
      </button>\
    </div>\
  ',
  props: {
    fontcolor: {
      type: String,
      default: "#000"
    },
    banned: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getStyle: function () {
      return {
        color: this.fontcolor,
        ":active color": "#fff"
      }
    },
    handleClick: function () {
      this.$emit('click')
    }
  }
});
