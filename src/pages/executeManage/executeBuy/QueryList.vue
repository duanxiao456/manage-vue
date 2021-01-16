<template>
    <a-card>
        <div v-if="flag === 'queryList'">
            <div :class="advanced ? 'search' : null">
                <a-form layout="horizontal">
                    <div :class="advanced ? null: 'fold'">
                        <a-row>
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="执行编号"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-input placeholder="请输入"/>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="应用名称"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-select placeholder="请选择">
                                        <a-select-option value="1">Doordash</a-select-option>
                                        <a-select-option value="2">Grubhub</a-select-option>
                                        <a-select-option value="3">Instacart</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="执行状态"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-select placeholder="请选择">
                                        <a-select-option value="0">待执行</a-select-option>
                                        <a-select-option value="1">执行中</a-select-option>
                                        <a-select-option value="2">成功</a-select-option>
                                        <a-select-option value="-2">失败</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row v-if="advanced">
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="设备编号"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-input placeholder="请输入(后四位即可)"/>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="创建日期"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-range-picker style="width: 100%"/>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item
                                        label="错误原因"
                                        :labelCol="{span: 5}"
                                        :wrapperCol="{span: 18, offset: 1}"
                                >
                                    <a-input placeholder="请输入"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                    <span style="float: right; margin-top: 3px;">
                        <a-button type="primary">查询</a-button>
                        <a-button style="margin-left: 8px">重置</a-button>
                        <a @click="toggleAdvanced" style="margin-left: 8px">
                            {{advanced ? '收起' : '展开'}}
                            <a-icon :type="advanced ? 'up' : 'down'"/>
                        </a>
                    </span>
                </a-form>
            </div>
            <div>
                <div class="operator">
                    <a-button @click="addNew" type="primary">新建</a-button>
                    <a-dropdown style="margin-left: 8px">
                        <a-menu @click="handleMenuClick" slot="overlay">
                            <a-menu-item key="share">分享</a-menu-item>
                            <a-menu-item key="delete">删除</a-menu-item>
                        </a-menu>
                        <a-button>
                            批量操作
                            <a-icon type="down"/>
                        </a-button>
                    </a-dropdown>
                </div>
                <standard-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :selectedRows.sync="selectedRows"
                        @clear="onClear"
                        @change="onChange"
                        @selectedRowChange="onSelectChange"
                >
                    <div slot="action" slot-scope="{text, record}">
                        <a style="margin-right: 8px" @click="findRecord(record.id)">
                            <a-icon type="file-search"/>
                            详情
                        </a>
                        <a style="margin-right: 8px" @click="deleteRecord(record.id)">
                            <a-icon type="share-alt"/>
                            分享
                        </a>
                        <a @click="deleteRecord(record.id)">
                            <a-icon type="delete"/>
                            删除
                        </a>
                    </div>
                </standard-table>
            </div>
        </div>
        <details-page v-else-if="flag === 'details'" @findQueryList="findQueryList"/>
    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import DetailsPage from './DetailsPage'

    const columns = [
        {
            title: '执行编号',
            dataIndex: 'id',
            width: '14%'
        },
        {
            title: '设备编号',
            dataIndex: 'clientId',
            customRender: (text) => text.toString().split("_")[1],
            width: '11%'
        },
        {
            title: '应用名称',
            dataIndex: 'appName',
            customRender: (text) => text.toString().charAt(0).toUpperCase() + text.slice(1),
            width: '8%'
        },
        {
            title: '执行状态',
            dataIndex: 'status',
            customRender: (state) => {
                switch (state) {
                    case 0:
                        return "待执行";
                    case 1:
                        return "执行中";
                    case 2:
                        return "成功";
                    case -2:
                        return "失败";
                    case 4:
                        return "手动取消";
                }
            },
            width: '6%'
        },
        {
            title: '错误原因',
            dataIndex: 'errorReason',
            ellipsis: true,
            width: '20%'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: true,
            width: '12%'
        },
        {
            title: '最后修改时间',
            dataIndex: 'updateTime',
            sorter: true,
            width: '12%'
        },
        {
            title: '操作',
            scopedSlots: {customRender: 'action'},
            width: '16%'
        }
    ]

    const dataSource = []

    for (let i = 0; i < 100; i++) {
        dataSource.push({
            key: i,
            id: "5fe3aeff6c9c82001c1428e" + i,
            clientId: "com.huateng.aicontrol_35253008294760" + i,
            appName: "grubhub",
            status: 2,
            errorReason: "Wait too long, target does not appear: UiSelector[CHILD=UiSelector[TEXT=Tip your delivery person?], RESOURCE_ID=com.instacart.client:id/ic__tip_toolbar]",
            createTime: "2020-12-24 11:12:16",
            updateTime: "2020-12-31 23:09:33"
        })
    }

    export default {
        name: 'QueryList',
        components: {StandardTable, DetailsPage},
        data() {
            return {
                advanced: true,
                flag: 'queryList',
                columns: columns,
                dataSource: dataSource,
                selectedRows: []
            }
        },
        authorize: {
            deleteRecord: 'delete',
        },
        methods: {
            deleteRecord(id) {
                this.dataSource = this.dataSource.filter(item => item.id !== id)
                this.selectedRows = this.selectedRows.filter(item => item.id !== id)
            },
            findRecord(id) {
                this.flag = 'details'
                console.log(id)
            },
            findQueryList(type) {
                this.flag = type
            },
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            remove() {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('您清空了勾选的所有行')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },
            onChange() {
                this.$message.info('表格状态改变了')
            },
            onSelectChange() {
                this.$message.info('选中行改变了')
                console.log('选中行改变了')
            },
            addNew() {
                this.dataSource.unshift({
                    id: "5fe3aeff6c9c82001c1428e",
                    clientId: "com.huateng.aicontrol_35253008294760",
                    appName: "grubhub",
                    status: 2,
                    errorReason: "这是一段错误原因",
                    createTime: "2018-07-26",
                })
            },
            handleMenuClick(e) {
                if (e.id === 'delete') {
                    this.remove()
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .search {
        margin-bottom: 54px;
    }

    .fold {
        width: calc(100% - 216px);
        display: inline-block
    }

    .operator {
        margin-bottom: 18px;
    }

    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
