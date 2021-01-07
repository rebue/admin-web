import Vue from 'vue';
import {
    Button,
    Card,
    ConfigProvider,
    Divider,
    FormModel,
    Icon,
    Input,
    Form,
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

// 导航
Vue.use(Card);
// Vue.use(Tabs);
// Vue.use(TabPane);

// 表格
Vue.use(Form);
Vue.use(Table);
Vue.use(Col);
Vue.use(Row);
Vue.use(DatePicker);
Vue.use(InputNumber);

// 选择框
Vue.use(Select);

// 对话框
Vue.use(Modal);
Vue.use(Popconfirm);
// 弹框
Vue.use(Alert);
