import Vue from 'vue';
import {
    Avatar,
    Button,
    Card,
    ConfigProvider,
    LocaleProvider,
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
    Tree,
    Transfer,
    Drawer,
    Space,
    Upload,
    Calendar,
} from 'ant-design-vue';

import IconFont from '@/component/rebue/IconFont';

// 使用iconfont.cn上的图标，项目库的地址在.env中配置
Vue.component('icon-font', IconFont);

// 国际化
Vue.use(ConfigProvider);
Vue.use(LocaleProvider);

// 布局
Vue.use(Row);
Vue.use(Col);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Main);
// Vue.use(Footer);

// 常用
Vue.use(Icon);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Spin);
Vue.use(Space);

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
Vue.use(Tag);
Vue.use(Tree);

// 表格
Vue.use(Table);
Vue.use(Pagination);

// 选择框
Vue.use(Select);

// 对话框
Vue.use(Modal);
Vue.use(Popconfirm);
Vue.use(Transfer);
Vue.use(Drawer);
// 弹框
Vue.use(Alert);
Vue.use(Tooltip);

// 头像
Vue.use(Avatar);
//上传
Vue.use(Upload);

Vue.use(Calendar);

Vue.prototype.$confirm = Modal.confirm;
