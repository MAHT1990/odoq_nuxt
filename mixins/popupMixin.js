export default {
    props: ['title', 'initValue', 'subTitle', 'message', 'okCallback', 'cancelCallback', 'closeCallback'],
    data() {
      return {
        params: {
          $destroy: () => (this.$destroy()),
        },
      };
    },
    computed: {
      $store: () => (window.$nuxt.$store),
    },
    created() {
      this.$vuetify = window.$nuxt.$vuetify;
    },
    mounted() {
      document.querySelector('body').appendChild(this.$el);
      setTimeout(() => {
        document.addEventListener('click', this.onClickOutside);
      }, 300);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.onClickOutside);
      document.querySelector('body').removeChild(this.$el);
      if (this.closeCallback) this.closeCallback();

    },
    methods: {
      async ok() {
        // console.log('ok', this.$options);
        if (typeof this.okCallback !== 'undefined') {
          await this.okCallback(this.params);
        } else if (this.$options.okCallback !== 'undefined') {
          await this.$options.okCallback(this.params);
        }
      },
      cancel() {
        if (this.cancelCallback) this.cancelCallback(this.params);
        this.$destroy();
      },
      onClickOutside(e) {
        if (!this.$el.contains(e.target)) {
          if (this.closeCallback) this.closeCallback();
          this.$destroy();
        }
      },
    },
  };
