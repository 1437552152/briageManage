/**
 * 页面辅助类
 * 1.表单验证 (根据业务情况扩展)
 * 2.搜索栏默认值字典
 */

let pageStore ={}
pageStore.rules={ //表单验证
    def:{required: true, message: '必填', trigger: 'blur'},
    defInt:{required: true,type:'number',message: '必填', trigger: 'blur'},
    defString:{required: true, message: '必填',type:'string',max:255, trigger: 'blur'},
    string50:{required: true, message: '必填',type:'string',max:50, trigger: 'blur'},
    string100:{required: true, message: '必填',type:'string',max:50, trigger: 'blur'},
    zh:(rule, value, callback) => { //汉字验证规则
        var regExp = /^[\u4e00-\u9fa5]+$/; 
        if (String.isNullOrEmpty(value)) {
            callback(new Error('必填'));
            return;
        }
        if(!regExp.test(value)){
            callback(new Error('请输入汉字'));
            return;
        }   
        callback();
    },
    phone:(rule, value, callback) => { //汉字验证规则
        var regExp = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (String.isNullOrEmpty(value)) {
            callback(new Error('必填'));
            return;
        }
        if(!regExp.test(value)){
            callback(new Error('请输入手机号码'));
            return;
        }   
        callback();
    },
    passwordConfrim:(rule,value,callback)=>{
        if(!pageStore.rules.ext.auto('string',rule,value,callback)) return;//长度判断
        if (String.isNullOrEmpty(rule.compare)) {
            callback();
            return;
        }
        if(rule.compare!=value){
            callback(new Error('密码不一致'));
            return;
        }
        callback();
    },
    cardNo:(rule, value, callback) => { //汉字验证规则
        var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (String.isNullOrEmpty(value)) {
            callback(new Error('必填'));
            return;
        }
        if(!regExp.test(value)){
            callback(new Error('请输入身份证'));
            return;
        }   
        callback();
    },
    email: (rule, value, callback) => { //汉字验证规则
        var regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
        if (String.isNullOrEmpty(value)) {
            callback(new Error('必填'));
            return;
        };
        if (!regExp.test(value)){
            callback(new Error('请输入正确的邮箱！'));
            return;
        };
        callback();
    },
    ext:{
        auto:function(t,r,v,c){
            if(String.isNullOrEmpty(v)) {
                c(new Error('必填'))
                return false;
            }else{
                return true;
            }
        }
    }
}
pageStore.parser={
   
}
export default pageStore;
