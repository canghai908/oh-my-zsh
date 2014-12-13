var activitis = store.get('activitis');
$.ajax({
    url: "/merchant/promotion_get?promotion_id="+ activitis.id,
    type: "get",
    success: function(A) {
        console.log(A);
        // editactivitie.actId = '880';
        // editactivitie.userid = '489';
        // editactivitie.title = '集分享赢U盘';
        // editactivitie.shareIco = '/Content/Upload/ShareIcon/489/707b8b5638a346b1bd3bba6996397c80.png';
        // editactivitie.actImg = '/Content/Upload/ActivityPic/489/c478ea693ff74ab3bc54015b1e9d38cb.gif';
        // editactivitie.bgcolor = '';
        // editactivitie.bgImage = '/Content/Upload/ActivityBgPic/489/b7335bf3b9364a818e7c3d430bbce597.gif';
        // editactivitie.bgImageIsrepeat = 'True';
        // editactivitie.content = '&lt;p&gt;DSADemo&lt;/p&gt;';
        // editactivitie.starttime = '2014年12月07日 00:00:00';
        // editactivitie.endtime = '2014年12月22日 00:00';
        // editactivitie.actsatte = '6';
        // editactivitie.exMethod = '到店直接兑奖';
        // editactivitie.phone = '18922222228';
        // editactivitie.description = '';
        // editactivitie.purl = '';
    },
    error:function(){
    	alert("返回数据错误")
    }
});



        editactivitie.actId = '880';
        editactivitie.userid = '489';
        editactivitie.title = '集分享赢U盘';
        editactivitie.shareIco = '/Content/Upload/ShareIcon/489/707b8b5638a346b1bd3bba6996397c80.png';
        editactivitie.actImg = '/Content/Upload/ActivityPic/489/c478ea693ff74ab3bc54015b1e9d38cb.gif';
        editactivitie.bgcolor = '';
        editactivitie.bgImage = '/Content/Upload/ActivityBgPic/489/b7335bf3b9364a818e7c3d430bbce597.gif';
        editactivitie.bgImageIsrepeat = 'True';
        editactivitie.content = '&lt;p&gt;DSADemo&lt;/p&gt;';
        editactivitie.starttime = '2014年12月07日 00:00:00';
        editactivitie.endtime = '2014年12月22日 00:00';
        editactivitie.actsatte = '6';
        editactivitie.exMethod = '到店直接兑奖';
        editactivitie.phone = '18922222228';
        editactivitie.description = '';
        editactivitie.purl = '';









/*


        editactivitie.actId = '546';
        editactivitie.userid = '489';
        editactivitie.title = '【巧芋工坊】回馈新老客户啦！分享送好礼，超值回馈，尽享美味！';
        editactivitie.shareIco = '/Content/Upload/ShareIcon/489/3042ded811414690a6edb8c87a17cc34.png';
        editactivitie.actImg = '/Content/Upload/ActivityPic/489/5742c99ae8d04c348b4be8cc42fe9e0d.jpg';
        editactivitie.bgcolor = '#FFFFFF';
        editactivitie.bgImage = '';
        editactivitie.bgImageIsrepeat = 'True';
        editactivitie.content = '&lt;p&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-top: 5px; margin-bottom: 0px; font-size: 16px; font-family:Microsoft YaHei,微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: #0070C0;&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;参与方式&lt;br style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;/&gt;&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; background-color: rgb(250, 250, 240); word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;font-size: 16px; color: black;&quot;&gt;&lt;/span&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;将本页分享到朋友圈，此页面在朋友圈被好友（自己朋友圈的好友哦）分享一次，就可以集一个分享（分享数+1，系统自动计入，在自己分享的活动页面可查看收集分享个数），时刻关注分享页面最下面的分享图标，当灰色图标变成彩色图标的个数达到活动要求时，即可获得兑奖密码。&lt;/span&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-bottom: 0px; font-size: 16px; font-family: &apos;Microsoft YaHei&apos;, 微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(0, 112, 192);&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;奖品设置&lt;br style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;/&gt;&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(250, 250, 240);&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;集满3个分享，可以&lt;/span&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0); background-color: rgb(255, 192, 0);&quot;&gt;1元购买原&lt;/span&gt;&lt;/strong&gt;&lt;/span&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0); background-color: rgb(255, 192, 0);&quot;&gt;味奶茶或冬瓜茶1份&lt;/span&gt;&lt;/strong&gt;(共888份)&lt;span style=&quot;font-size: 16px;&quot;&gt;&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;集满10个分享，可&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;以&lt;/span&gt;&lt;strong style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;background-color: rgb(255, 192, 0);&quot;&gt;1元购买&lt;/span&gt;&lt;/strong&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0); background-color: rgb(255, 192, 0);&quot;&gt;养生热饮共五种任选&lt;strong style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;background-color: rgb(255, 192, 0);&quot;&gt;1&lt;/span&gt;&lt;/strong&gt;份&lt;/span&gt;&lt;/strong&gt;&lt;/span&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;(共588份)&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;集满20个分享，可&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;以&lt;/span&gt;&lt;strong style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;background-color: rgb(255, 192, 0);&quot;&gt;1元购买&lt;/span&gt;&lt;/strong&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0); background-color: rgb(255, 192, 0);&quot;&gt;特色芋圆、仙草共十种任选&lt;strong style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: pre-wrap; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;background-color: rgb(255, 192, 0);&quot;&gt;1&lt;/span&gt;&lt;/strong&gt;份&lt;/span&gt;&lt;/strong&gt;(共388份)&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;注：金额须通过微店（&lt;/span&gt;&lt;strong style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: normal; widows: 2; color: rgb(102, 102, 102); background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;a href=&quot;http://wd.koudai.com/s/215381994&quot; target=&quot;_self&quot;&gt;巧芋工坊甜品店&lt;/a&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;）或关注玉熙商城公众号（详见兑奖方式）微支付交易，更可享受所有品种买一送一优惠。&lt;/span&gt;&lt;/span&gt;&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;img src=&quot;http://jfx.jssdw.com/Content/Upload/ActivityContentPic/489/503ff1e4101f46c8acac18fe7e9c4ab6.jpg&quot; title=&quot;503ff1e4101f46c8acac18fe7e9c4ab6.jpg&quot; alt=&quot;503ff1e4101f46c8acac18fe7e9c4ab6.jpg&quot; width=&quot;100%&quot;/&gt;&lt;/span&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p style=&quot;white-space: normal;&quot;&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-top: 5px; margin-bottom: 0px; font-size: 16px; font-family:Microsoft YaHei,微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: #0070C0;&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;活动时间&lt;br style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;/&gt;&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; background-color: rgb(250, 250, 240); word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;font-size: 16px; color: black;&quot;&gt;&lt;/span&gt;&lt;strong style=&quot;color: rgb(102, 102, 102); font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: normal; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;2014.11.8 - 2014.11.30&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-bottom: 0px; font-size: 16px; font-family: &apos;Microsoft YaHei&apos;, 微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(0, 112, 192);&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;兑奖方式&lt;br style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;/&gt;&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(250, 250, 240);&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;凭有效兑奖码到店直接兑奖&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;line-height: 24px; orphans: 2; white-space: normal; widows: 2;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;注：金额须通过微店（&lt;strong style=&quot;color: rgb(102, 102, 102); background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;a href=&quot;http://wd.koudai.com/s/215381994&quot; target=&quot;_self&quot;&gt;巧芋工坊甜品店&lt;/a&gt;&lt;/span&gt;&lt;/strong&gt;）或关注玉熙商城公众号（见下图）微支付交易。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;line-height: 24px; orphans: 2; white-space: normal; widows: 2;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;img src=&quot;http://jfx.jssdw.com/Content/Upload/ActivityContentPic/489/b8cd9d2216a14a098c21653974ce1e3f.jpg&quot; title=&quot;b8cd9d2216a14a098c21653974ce1e3f.jpg&quot; alt=&quot;b8cd9d2216a14a098c21653974ce1e3f.jpg&quot;/&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;兑奖日期：2014.11.8 - 2014.11.30&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;line-height: 24px; orphans: 2; white-space: normal; widows: 2;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;地址：昆山市亭林路136号（奥灶馆斜对面）&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;line-height: 24px; orphans: 2; white-space: normal; widows: 2;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;电话：&lt;/span&gt;&lt;a href=&quot;tel:0512-55235666&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0); text-decoration: none;&quot;&gt;0512-55235666&lt;/span&gt;&lt;/a&gt;&lt;span style=&quot;color: rgb(0, 0, 0); text-decoration: none;&quot;&gt;、&lt;a href=&quot;tel:15062678378&quot;&gt;&lt;/a&gt;&lt;a href=&quot;tel:18952453119&quot; style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: normal; widows: 2; color: rgb(0, 0, 0); text-decoration: underline;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0); text-decoration: none;&quot;&gt;18952453119&lt;/span&gt;&lt;/a&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;line-height: 24px; orphans: 2; white-space: normal; widows: 2;&quot;&gt;&lt;strong&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;注：通过&lt;a href=&quot;http://wd.koudai.com/s/213399598&quot; target=&quot;_self&quot;&gt;香格里拉足浴&lt;/a&gt;、&lt;a href=&quot;http://wd.koudai.com/s/215381994&quot; target=&quot;_self&quot;&gt;巧芋工坊甜品店&lt;/a&gt;&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;或关注玉熙商城公众号&lt;/span&gt;微支付购买甜品，客房，足浴，可享受买一送一活动&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p style=&quot;white-space: normal;&quot;&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-bottom: 0px; font-size: 16px; font-family: &apos;Microsoft YaHei&apos;, 微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(0, 112, 192);&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;巧芋工坊&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(250, 250, 240);&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;巧芋工坊，台湾复合式甜品，大陆复合甜品第一品牌，您巧遇到的美味惊喜和缘分！&lt;/span&gt;&lt;span style=&quot;font-size: 16px; color: black;&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;img src=&quot;http://jfx.jssdw.com/Content/Upload/ActivityContentPic/489/1f6f2def23e14423b152ba628576ded2.jpg&quot; title=&quot;1f6f2def23e14423b152ba628576ded2.jpg&quot; alt=&quot;1f6f2def23e14423b152ba628576ded2.jpg&quot; width=&quot;100%&quot;/&gt;&lt;img src=&quot;http://jfx.jssdw.com/Content/Upload/ActivityContentPic/489/bb0243f6e4284e62ba64879d154a1f4f.jpg&quot; title=&quot;bb0243f6e4284e62ba64879d154a1f4f.jpg&quot; alt=&quot;bb0243f6e4284e62ba64879d154a1f4f.jpg&quot; width=&quot;100%&quot;/&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;巧芋工坊的产品天然取材，原味呈现，手工制作，健康营养；新鲜的芋圆，Q感香甜，独创的混搭，将美味和健康演绎到极致！&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;img src=&quot;http://jfx.jssdw.com/Content/Upload/ActivityContentPic/489/b57b661f4b0547e7903398ddbeb1951b.jpg&quot; title=&quot;b57b661f4b0547e7903398ddbeb1951b.jpg&quot; alt=&quot;b57b661f4b0547e7903398ddbeb1951b.jpg&quot; width=&quot;100%&quot;/&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;巧芋工坊，让幸福滑进你的胃，让回忆入驻你的心，让甜蜜嚼到我们一起海枯石烂！&lt;/span&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p style=&quot;white-space: normal;&quot;&gt;&lt;br/&gt;&lt;/p&gt;&lt;p style=&quot;margin-bottom: 0px; font-size: 16px; font-family: &apos;Microsoft YaHei&apos;, 微软雅黑; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; line-height: 25px; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;max-width: 100%; padding: 4px 10px; color: rgb(255, 255, 255); box-shadow: rgb(165, 165, 165) 4px 4px 2px; border-top-left-radius: 2em 0.5em; border-top-right-radius: 1em 3em; border-bottom-left-radius: 1em 3em; border-bottom-right-radius: 4em 0.5em; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(0, 112, 192);&quot;&gt;&lt;strong style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;&gt;联系方式&lt;br style=&quot;max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important;&quot;/&gt;&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;fieldset style=&quot;white-space: normal; margin: 0px; padding: 5px; border: 1px solid rgb(204, 204, 204); max-width: 100%; widows: 2; line-height: 24px; orphans: 2; box-shadow: rgb(165, 165, 165) 5px 5px 2px; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(250, 250, 240);&quot;&gt;&lt;p style=&quot;margin-top: 0px; margin-bottom: 0px; max-width: 100%; word-wrap: normal; min-height: 1em; white-space: pre-wrap; box-sizing: border-box !important;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;【巧芋工坊】&lt;/span&gt;&lt;span style=&quot;font-size: 16px; color: black;&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;地址：昆山市亭林路136号（奥灶馆斜对面）&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;电话：&lt;a href=&quot;tel:0512-55235666&quot; style=&quot;color: rgb(0, 0, 0); text-decoration: underline;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0);&quot;&gt;&lt;/span&gt;&lt;/a&gt;&lt;a href=&quot;tel:0512-55235666&quot; style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; white-space: normal; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0); text-decoration: none;&quot;&gt;0512-55235666&lt;/span&gt;&lt;/a&gt;&lt;span style=&quot;font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;、&lt;a href=&quot;tel:18952453119&quot; style=&quot;color: rgb(0, 0, 0); text-decoration: underline;&quot;&gt;&lt;span style=&quot;color: rgb(0, 0, 0); font-family: 微软雅黑, &apos;Microsoft YaHei&apos;; font-size: 14px; line-height: 24px; orphans: 2; widows: 2; background-color: rgb(250, 250, 240);&quot;&gt;18952453119&lt;/span&gt;&lt;/a&gt;&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;/fieldset&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;';
        editactivitie.starttime = '2014年11月08日 10:00:00';
        editactivitie.endtime = '2014年12月01日 00:00';
        editactivitie.actsatte = '4';
        editactivitie.exMethod = '凭有效兑奖码到店直接兑奖。';
        editactivitie.phone = '0512-55235666';
        editactivitie.description = '';
        editactivitie.purl = '';




        var pri = {
            id: '20951',
            actId: '546',
            shareCount: '10',
            prizeContent: '1元购买养生热饮任选1份',
            isLimit: 'True',
            LimitPrizeCount: '588'
        };
        editactivitie.prizes.push(pri);






        var pri = {
            id: '20952',
            actId: '546',
            shareCount: '20',
            prizeContent: '1元购买特色芋圆、仙草任选1份',
            isLimit: 'True',
            LimitPrizeCount: '388'
        };
        editactivitie.prizes.push(pri);




*/





































