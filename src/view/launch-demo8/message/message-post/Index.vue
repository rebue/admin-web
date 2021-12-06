<template>
    <div>
        <div class="title">
            <div class="header-top">
                <span>注意提示</span>
            </div>
            <div class="header-button">
                <span
                    >短信发送字数不得超过350字，少于70字算一条短信，多于70个字67字计为一条短信，总条数需要加上签名字数，实际条数按照服务器返回结果为准</span
                >
                <div class="left">
                    <div class="left-child1">
                        <span class="ziti"><strong>短信批次名称</strong></span>
                    </div>
                    <div class="left-child2">
                        <input
                            style="width: 98%;height: 20px;background-color: #D9D9D9;"
                            placeholder="非必填,默认以发送时间为批次名"
                        />
                    </div>
                    <div class="left-child1">
                        <span class="ziti"><strong>院内收信人</strong></span>
                    </div>
                    <div style="height: 20px;"></div>
                    <div class="left-child1">
                        <span class="ziti"><strong>自定义收信号码</strong></span>
                    </div>
                    <div class="left-child3">
                        <textarea
                            style="width: 98%;height: 70px;overflow: auto;"
                            placeholder="自定义电话号码以英文逗号分隔"
                        ></textarea>
                    </div>
                    <div class="left-child1">
                        <span class="ziti"
                            ><strong>短信内容<span style="color: red;">(必填)</span></strong></span
                        >
                        <span class="ziti" style="float: right;padding-right: 5px;"><strong>短信模板</strong></span>
                    </div>
                    <div class="left-child3">
                        <textarea
                            style="width: 98%;height: 150%;max-width: 98%;max-height: 150px;overflow: auto;"
                            placeholder="自定义电话号码以英文逗号分隔"
                        ></textarea>
                    </div>
                </div>
                <div class="right">
                    <div class="right-child1">
                        <ul>
                            <li><a>教职工</a></li>
                            <li><a>学员</a></li>
                            <li><a>自定义</a></li>
                        </ul>
                    </div>

                    <div class="right-child2">
                        <input type="text" placeholder="请输入您要查找的部门" style="width:390px;height: 25px;" />
                    </div>
                    <div class="showBtn">
                        <div class="right-child3">
                            <a>校(院)领导<span class="btn">全选</span></a>
                        </div>
                        <div class="right-child3">
                            <a>办公室(业务指导工作处)<span class="btn">全选</span></a>
                        </div>
                        <div class="right-child3">
                            <a>组织人事处<span class="btn">全选</span></a>
                        </div>
                        <div class="right-child3">
                            <a>机关党委<span class="btn">全选</span></a>
                        </div>
                        <div class="right-child3">
                            <a>财务处<span class="btn">全选</span></a>
                        </div>
                        <div class="right-child3">
                            <a>资源管理处<span class="btn">全选</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'message-post',
};
</script>

<style scoped>
* {
    font-family: '微软雅黑';
}
.title {
    height: 60px;
}
.header-top {
    height: 30px;
    background-color: #ffe4e1;
    padding: 5px;
    line-height: 25px;
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #ffe4e1;
}
.header-top span {
    padding-left: 10px;
    color: #dc2727;
}
.header-button {
    height: 30px;

    padding: 5px;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    border: 1px solid #ffe4e1;
}
.header-button span {
    line-height: 30px;
    padding-left: 10px;
}
.left {
    width: 500px;
    height: 380px;
    margin-top: 50px;
    margin-left: -500px;
    border: 1px solid #8cc0f7;
    position: absolute;
}
.right {
    width: 420px;
    margin-top: 50px;
    height: 380px;
    position: absolute;
    right: 50px;
    border: 1px solid #8cc0f7;
}
.left-child1 {
    height: 30px;
    padding-left: 10px;
    background-color: #8cc0f7;
}
.left-child2 {
    height: 35px;
    line-height: 35px;
    padding: 5px;
}
.left-child3 {
    height: 80px;

    padding: 5px;
}
.ziti {
    color: #1e9fff;
}

.right-child1 {
    background-color: rgb(238, 238, 238);
    height: 40px;
    line-height: 40px;
    margin-top: -13px;
}
.titleBtn {
    background-color: rgb(14, 144, 210);
    display: block;
    width: 170px;
    text-align: center;
}
/* .right-child1{

            height: 40px;
            line-height: 40px;


} */
.right-child1 li {
    width: 140px;
    text-align: center;
    list-style-type: none;
    cursor: pointer;
    float: left;
}
.right-child1 li:first-child {
    margin-left: -2px;
}
.right-child1 li:hover {
    background-color: rgb(14, 144, 210);
}
.right-child2 {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
}
.right-child3 {
    width: 400px;
    padding-left: 10px;
}
.right-child3 a {
    display: block;
    width: 390px;
    height: 40px;
    margin-top: 5px;
    line-height: 40px;
    padding-left: 20px;
    background-color: rgb(238, 238, 238);
}
.btn {
    margin-top: 5px;
    float: right;
    width: 50px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
    background-color: rgb(59, 180, 242);
}
.showBtn {
    height: 400px;
    width: 410px;
    overflow: auto;
}
</style>
