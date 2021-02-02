import Vue from 'vue';
import {
    Button,
    Card,
    ConfigProvider,
    Divider,
    FormModel,
    Icon,
    Input,
    Table,
    Alert,
    Col,
    Row,
    Select,
    DatePicker,
    InputNumber,
    Modal,
    Spin,
    Popconfirm,
    Tooltip,
    Dropdown,
    Switch,
    Menu,
    Popover,
    Checkbox,
    Tabs,
    Tag,
    Radio,
    Pagination,
} from 'ant-design-vue';

import IconFont from '@/component/rebue/IconFont';

// 使用iconfont.cn上的图标，项目库的地址在.env中配置
Vue.component('icon-font', IconFont);

// 国际化
Vue.use(ConfigProvider);

// 布局
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Main);
// Vue.use(Footer);

// 常用
Vue.use(Icon);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Spin);

// 表单
Vue.use(FormModel);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Switch);
Vue.use(Popover);
Vue.use(Checkbox);
Vue.use(Radio);

// 导航
Vue.use(Card);
Vue.use(Tabs);
// Vue.use(TabPane);
Vue.use(Tag);

// 表格
Vue.use(Table);
Vue.use(Col);
Vue.use(Row);
Vue.use(Pagination);

// 选择框
Vue.use(Select);

// 对话框
Vue.use(Modal);
Vue.use(Popconfirm);
// 弹框
Vue.use(Alert);
Vue.use(Tooltip);
