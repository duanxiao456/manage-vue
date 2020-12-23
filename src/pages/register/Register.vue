<template>
    <common-layout>
        <div class="top">
            <a-steps :current="step">
                <a-step :title="$t('userRegiter')"/>
                <a-step :title="$t('RegiterSuccess')"/>
            </a-steps>
        </div>
        <div class="body">
            <div class="table" :style="`display:${step === 1 && 'none'}`">
                <a-form @submit="onSubmit" :form="form">
                    <a-form-item :label="$t('account')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input :placeholder="$t('accountInput')" allow-clear v-decorator="['loginName', { rules: [{ required: true, message: $t('accountTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :label="$t('phone')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input :placeholder="$t('phoneInput')" allow-clear v-decorator="['mobile', { rules: [{ required: true, message: $t('phoneTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :label="$t('password')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input type="password" :placeholder="$t('passwordInput')" allow-clear v-decorator="['password', { rules: [{ required: true, message: $t('passwordTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :label="$t('rePassword')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input type="password" :placeholder="$t('rePasswordInput')" allow-clear v-decorator="['rePassword', { rules: [{ required: true, message: $t('rePasswordTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :label="$t('name')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input :placeholder="$t('nameInput')" allow-clear v-decorator="['userName', { rules: [{ required: true, message: $t('nameTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :label="$t('email')" :labelCol="{span: 9}" :wrapperCol="{span: 6}">
                        <a-input :placeholder="$t('emailInput')" allow-clear v-decorator="['email', { rules: [{ required: true, message: $t('emailTips') }] }]"/>
                    </a-form-item>
                    <a-form-item :wrapperCol="{span: 10, offset: 11}">
                        <a-button :loading="logging" type="primary" htmlType="submit">{{$t('submit')}}</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div class="result" :style="`display:${step === 0 ? 'none' : 'block'}`">
                <span>
                    恭喜 {{userName}} 注册成功,
                </span>
                <router-link to="/login" >直接登录</router-link>
            </div>
        </div>
    </common-layout>
</template>

<script>
    import CommonLayout from '@/layouts/CommonLayout'
    import {register} from '@/services/user'

    export default {
        name: 'Register',
        components: {CommonLayout},
        i18n: require('./i18n'),

        data () {
            return {
                logging: false,
                step: 0,
                form: this.$form.createForm(this),
                userName: '***'
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err) => {
                    if (!err) {
                        this.logging = true
                        register(this.form.getFieldsValue()).then(this.afterRegister)
                    }
                })
            },

            afterRegister(res) {
                this.logging = false
                const loginRes = res
                if (loginRes.code >= 0) {
                    this.step = 1
                    this.userName = this.form.getFieldValue('userName')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .top {
        padding: 16px 30%;
    }

    .body {
        padding-top: 15px;
        padding-left: 9%;
        padding-right: 7%;
        height: 100%;

        .result {
            height: 90%;
            text-align: center;
            font-size: initial;
            font-weight: 600;
        }

        .result::before{
            display: inline-block;
            content: "";
            height: 100%;
            vertical-align: middle;
        }
    }
</style>
