Vue.component('tabs',{
  template: '\
    <div class="tabs">\
      <div class="tabs-bar">\
        <div\
            :class="tabCls(item)"\
            v-for="(item, index) in navList"\
            @click="handleChange(index)">\
            {{item.label}}\
          <span v-if="isShown(item)" class="close" @click="deleteTab(index, item.name)"></span>\
        </div>\
      <!-- 标签页标题，这里要用v-for -->\
      </div>\
      <div class="tabs-content">\
       <!-- 这里的slot就是嵌套的pane -->\
       <slot></slot>\
      </div>\
    </div>\
    ',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data: function () {
    return {
      currentValue: this.value,
      //用于渲染tabs的标题
      navList: []
    }
  },
  methods: {
    tabCls: function(item){
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange: function(index){
      var nav = this.navList[index];
      var name = nav.name;
      //改变当前选中的 tab ，并触发下面的 watch
      this.currentValue = name;
      //更新 value
      this.$emit('input', name);
      //触发一个自定义事件，供父级使用
      this.$emit('on-click', name);
    },
    getTabs: function () {
      return this.$children.filter(function (item) {
        console.log(item.$options.name+'..............')
        return item.$options.name === 'pane';
      })
    },
    updateNav() {
      this.navList = [];
      //设置对this的引用，在function回调里，this指向的并不是Vue实例
      var _this = this;
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index,
          closable: pane.closable
        });

        if (!pane.name){pane.name = index;}

        if(index === 0){
          if (!_this.currentValue){
            _this.currentValue = pane.name || index;
          }
        }
      });
      this.updateStatus();
    },
    updateStatus(){
      var tabs = this.getTabs();
      var _this = this;
      tabs.forEach(function (tab) {
        return tab.show = tab.name === _this.currentValue;
      })
    },
    deleteTab: function (index, name) {
      this.navList.splice(index, 1);
      var tabs = this.getTabs();
      var that = this;
      //迭代判断并设置点击的标签页是隐藏状态
      tabs.forEach(function (tab, index) {
        if (index === name) {
          return tab.isShow = false;
        }
      });
    },
    isShown: function (item) {
      var falg = item.closable == 'true';
      return falg;
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    },
    currentValue: function () {
      this.updateStatus();
    }
  }
});
