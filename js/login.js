$("#loginForm").bootstrapValidator({
  message: "当前输入的值有误",
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    username: {
      validators: {
        notEmpty: {
          message: '用户名不能为空'
        },
        regexp: { //正则校验
          regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: '请输入正确的手机号'
        },
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        stringLength:{
          min:6,
          message:"密码长度至少6位"
        }
      }
    }
  }
})