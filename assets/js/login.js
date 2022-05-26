$(function(){
    
    // 点击去注册
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    });

    // 点击去登陆
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    });


    // 从layui获取form对象
    var form = layui.form
    var layer= layui.layer
    // 通过lay-verify()函数自定义检验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
          ] ,
        repass: function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 拿到密码框里的内容
            // 然后进行一次等于的校验
            // 判断失败，返回错误提示
            var pass = $('.reg-box [name=password]').val()
            if(pass !== value){
                return `两次密码不一致！`
            }
        }
    });


    // 注册
    // 监听表单的注册事件
    $('#form_reg').on('submit',function(e){
        // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
            return layer.msg(res.message)
        }
            layer.msg('注册成功，请登录！')
        })
         // 模拟人的点击行为
        $('#link_login').click()
    })


    // 登录
    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台
                location.href = '/index.html'
            }

        })

    })
})
