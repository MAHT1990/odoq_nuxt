<template>
    <div class="login_box">
        <form id="login_box_form" action="">
            <input
            v-model.lazy="user.email" 
            type="text" 
            placeholder="ODOQ ID"
            required
            @keyup.enter="testLinkMethod"
            >
            <input 
            v-model.lazy="user.password"
            type="password"
            placeholder="PASSWORD"
            required
            @keyup.enter="testLinkMethod"
            >
        </form>
        <div class="login_box_buttons">
        <button @click="testLinkMethod">Log In</button>
        <nuxt-link to="/user/signup">
            <button>Sign Up</button>
        </nuxt-link>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Utils from '@/plugins/utils';

const EMAIL = 'email';
const JWT = 'jwt';

export default {
    data () {
        return {
            user: {
                email: '',
                password: '',
            },
            message: {
                login: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            result: 'result',
        })
    },
    methods: {
        async userLogin() {
            const that = this;
            const jwt = Utils.getCookie(document.cookie, JWT);
            const jwtGrade = jwt ? JSON.parse(atob(jwt.split('.')[1])).info.split('_')[1] : '';
            if (jwtGrade === '0') {
                that.$router.replace('/');
            } else {
                that.message.login = '';
                if (!that.user.email) that.message.login= '아이디';
                if (!that.user.password) {
                    if (that.message.login) that.message.login += ' / ';
                    that.message.login += '비밀번호';
                }
                if (that.message.login === '') {
                    await that.$store.dispatch('user/login/getUserInfo', that.user);
                    if (that.result.result === 'success') {
                        if (that.rememberID === true) Utils.addCookie(EMAIL, that.user.email, 99999999999)
                        that.$router.replace('/');
                    } else {
                        that.message.login = that.result.message;
                    }
                } else {
                    that.message.login += '를 입력해주세요.';
                }
            }
        },
        testLinkMethod() {
            this.$store.dispatch('user/login/linkTestAction')
        }
    }
}
</script>