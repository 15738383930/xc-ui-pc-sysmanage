import Home from '@/module/home/page/home.vue';
import page_list from '@/module/test/page/page_list.vue';
import page_add from '@/module/test/page/page_add.vue';

export default [{
  path: '/test',
  component: Home,
  name: 'Test',
  hidden: false,
  children: [
    {path: '/test/page/list', name: '页面列表', component: page_list, hidden: false},
    {path:'/test/page/add',name:'新增页面',component: page_add,hidden:true}
  ]
}
]
