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
} from 'ant-design-vue';

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

// 导航
Vue.use(Card);
// Vue.use(Tabs);
// Vue.use(TabPane);

// 表格
Vue.use(Table);
Vue.use(Col);
Vue.use(Row);

// 选择框
Vue.use(Select);

// 对话框
Vue.use(Modal);
Vue.use(Popconfirm);
// 弹框
Vue.use(Alert);
Vue.use(Tooltip);
