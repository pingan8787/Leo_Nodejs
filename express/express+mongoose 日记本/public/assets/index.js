$(document).ready(function(){
    const password = "mypassword"; // 增删改查的验证密码
    // 提交添加
    $('form').on('submit',function(event){
        event.preventDefault();
        const textarea_value = $('form textarea').val().trim();
        const input_value = $('form input').val().trim();
        const date = new Date();
        const list = {content:textarea_value, date: date.toLocaleString() }
        if(input_value == password){
            $.ajax({
                type:'POST',
                url:'/list',
                data:list,
                success:function(data){
                    location.reload();
                }
            }); 
        }else{
            alert('验证码错误，请重新输入！')
        }
        return false;
    })
    
    $('.delete_open').on('click',function(){
        $('#list_delete').fadeToggle();
        const id = $(this).find('span').text();
        $('.delete_id').text(id);
    })
    // 删除
    $('#submit_delete').on('click',function(){
        if($('.delete_code').val() != password){
            alert('验证码错误！')
            return false;
        };
        const list_id = $('.delete_id').text();
        $.ajax({
            type:'DELETE',
            url:'/list/'+list_id,
            success:function(data){
                location.reload();
            },
            error:function(err){
                console.log(err)
            }
        })
    })
})
// 通用开启关闭弹框 
// b 控制的弹框元素
function commonToggle(id){
    $(id).fadeToggle();
}