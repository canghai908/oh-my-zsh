UE.registerUI('pb',function(editor,uiName){
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            //alert('execCommand:' + uiName)
            
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:'插入直接拨打',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url(./statics/images/system/phone.png) !important',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
            //editor.execCommand(uiName);
            editor.selection.getRange().select();
            var txt = editor.selection.getText();
            if ($.trim(txt) == '') {
                return;
            }
            //var re = /^0[0-9]{2,3}(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$)/;
            //if (!re.test(txt)) {
            //    alert('只能操作电话号码');
            //    return;
            //}
            editor.execCommand('link', {
                href: 'tel:' + txt
            });
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState('link');
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);