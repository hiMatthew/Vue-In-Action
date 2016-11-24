var demo = new Vue({
    el:"#demo",
    data:{
        searchQuery:"",
        gridColumns:['name','power'],
        gridData:[
          { name: 'Chuck Norris', power: Infinity },
          { name: 'Bruce Lee', power: 9000 },
          { name: 'Jackie Chan', power: 7000 },
          { name: 'Jet Li', power: 8000 } 
        ]
    }
});

// 注册grid组件
Vue.component('demo-grid',{
    template:"#grid-template",
    replace:true,
    props:{
        data:Array,
        columns:Array,
        filterKey:String
    },
    data:function(){
        var sortOrders={};
        this.columns.forEach(function(key){
            sortOrders[key]=1;
        });
        return {
            sortKey:'',
            sortOrders:sortOrders
        }
    },
    computed:{
        filteredData:function(){
            var sortKey=this.sortKey;
            var filterKey=this.filterKey&&this.filterKey.toLowerCase();
            var order=this.sortOrders[sortKey]
        }
    }
});