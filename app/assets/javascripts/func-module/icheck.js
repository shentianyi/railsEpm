define(["jquery.icheck"],function(){
    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-aero'
    });
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    return {

    }
})