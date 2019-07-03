var app = new Vue({
  el: '#app',
  data: {
    columns: [
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '年龄',
        key: 'age',
        sortable: true
      },
      {
        title: '出生日期',
        key: 'birthday',
        sortable: true
      },
      {
        title: '地址',
        key: 'address'
      }
    ],
    data: [
      {
        name: '王小明',
        age: 18,
        birthday: '1999-02-31',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '张小刚',
        age: 25,
        birthday: '1992-01-23',
        address: '北京市海淀区西二旗'
      }
    ]
  },
  methods: {
    handleAddData: function () {
      this.data.push({
        name: '刘小天',
        age: 19,
        birthday: '1998-05-30',
        address: '北京市东城区东直门'
      });
      console.log(this.data)
    }
  }
});
