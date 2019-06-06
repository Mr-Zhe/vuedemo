const data = {
  commodity: {
    electronicProducts: {
      commodityType: '电子产品',
      list: [
        {
          id: 1,
          name: 'iPhone 7',
          price: 6188,
          count: 10,
          selected: false
        },
        {
          id: 2,
          name: 'iPad Pro',
          price: 5888,
          count: 1,
          selected: false
        },
        {
          id: 3,
          name: 'MacBook Pro',
          price: 21488,
          count: 1,
          selected: false
        }
      ],
    },
    lifeProducts: {
      commodityType: '生活用品',
      list: [
        {
          id: 1,
          name: '牙膏',
          price: 22.9,
          count: 1,
          selected: false
        },
        {
          id: 1,
          name: '牙刷',
          price: 20,
          count: 1,
          selected: true
        },
        {
          id: 1,
          name: '洗脸盆',
          price: 5,
          count: 1,
          selected: false
        }
      ]
    },
    FruitsAndVegetables: {
      commodityType: '果蔬',
      list: [
        {
          id: 1,
          name: '苹果',
          price: 30,
          count: 1,
          selected: false
        },
        {
          id: 1,
          name: '白菜',
          price: 10,
          count: 1,
          selected: false
        }
      ]
    }
  },
  totalAmount: 0
};
const app = new Vue({
  el: '#app',
  data: data,
  computed: {
    totalPrice: function () {
      var total = 0;
      const data = this.commodity;
      for (const k in data){
        var goodsList = data[k].list;
        for (var i = 0; i < goodsList.length; i++) {
          var item = goodsList[i];
          if (item.selected) {
            total += item.price * item.count;
          }
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    handleReduce: function (index, type) {
      var goods = this.commodity[type];
      if (goods.list[index].count === 1) return;
      goods.list[index].count--;
    },
    handleAdd: function (index, type) {
      var goods = this.commodity[type];
      goods.list[index].count++;
    },
    handleRemove: function (index, type) {
      var goods = this.commodity[type];
      goods.list.splice(index, 1);
      if (goods.list.length === 0){
        delete this.commodity[type];
      }
    },
    handleChange: function (index, type) {
      var goods = this.commodity[type];
      if (goods.list[index].selected) {
        goods.list[index].selected = false;
      } else {
        goods.list[index].selected = true;
      }
    }
  },
  mounted: function () {
    var totalAmount = 0;
    const data = this.commodity;
    for (const k in data){
      totalAmount += data[k].list.length;
    }
    this.totalAmount = totalAmount;
  }
});
