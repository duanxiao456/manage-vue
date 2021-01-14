<template>
    <div>
        <a-card :bordered="false">
            <div style="display: flex; flex-wrap: wrap">
                <head-info title="待执行任务" content="8个任务" :bordered="true"/>
                <head-info title="本日任务平均处理时间" content="32分钟" :bordered="true"/>
                <head-info title="本日完成任务数" content="24个"/>
            </div>
        </a-card>
        <a-card
                style="margin-top: 12px"
                :bordered="false"
                title="任务列表"
        >
            <div slot="extra">
                <a-select defaultValue="all" style="width: 120px;" >
                    <a-select-option value="all">全部应用</a-select-option>
                    <a-select-option value="doordash">Doordash</a-select-option>
                    <a-select-option value="instrcart">Instrcart</a-select-option>
                    <a-select-option value="grubhub">Grubhub</a-select-option>
                </a-select>
                <a-radio-group style="margin-left: 16px">
                    <a-radio-button>全数据</a-radio-button>
                    <a-radio-button>进行中</a-radio-button>
                    <a-radio-button>等待中</a-radio-button>
                </a-radio-group>
            </div>
            <a-button type="dashed" style="width: 100%" icon="plus">添加</a-button>
            <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
                <a-list-item :key="i" v-for="i in 5">
                    <a-list-item-meta description="buy product from instacart with address ignore payment">
                        <a-avatar slot="avatar" size="large" shape="square" :src='instacartLogo'/>
                        <a slot="title">Instacart</a>
                    </a-list-item-meta>
                    <div slot="actions">
                        <a>编辑</a>
                    </div>
                    <div slot="actions">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item><a>分享</a></a-menu-item>
                                <a-menu-item><a>删除</a></a-menu-item>
                            </a-menu>
                            <a>更多
                                <a-icon type="down"/>
                            </a>
                        </a-dropdown>
                    </div>
                    <div class="list-content">
                        <div class="list-content-item">
                            <span>UserId</span>
                            <p>442</p>
                        </div>
                        <div class="list-content-item">
                            <span>开始时间</span>
                            <p>2018-07-26 22:44</p>
                        </div>
                        <div class="list-content-item">
                            <a-progress :percent="80" style="width: 180px"/>
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </a-card>
    </div>
</template>

<script>
    import HeadInfo from '../../../components/tool/HeadInfo'
    export default {
        name: 'StandardList',
        components: {HeadInfo},
        data() {
            return {
                instacartLogo: require("../../../assets/img/instacartLogo.png")
            }
        }
    }
</script>

<style lang="less" scoped>
    .list-content-item {
        color: @text-color-second;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;

        span {
            line-height: 20px;
        }

        p {
            margin: 4px 0 0;
            line-height: 22px;
        }
    }
</style>
