// components/member-agree/member-agree.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        newNodes:
            "<p style='text-align:center;'><span style='font-size:10px;'><strong><span style='color:#ff0000;'>尊敬的会员</span></strong>：</span></p><p><strong><span style='font-size:10px;'>请认真阅读并理解以下内容，其中以加粗方式显著标识的文字，请着重阅读、慎重考虑。</span></strong></p><p><span style='font-size:10px;'>本协议是用户与平台运营方杭州惠吧网络科技有限公司</span></p><p><span style='font-size:10px;'>(以下简称为“惠吧网络”）之间就“惠吧会员卡”会员所建立的契约。惠吧会员卡（以下简称会员卡）为惠吧网络制作发行的仅供惠吧会员预订、游玩合作乐园，或体验机构提供教育课程所使用的权益凭证。</span></p><p> </p><p><span style='font-size:10px;'>请用户仔细阅读本协议，<strong>用户点击确认后，本协议即构成双方有约束力的法律文件。</strong></span></p><p> </p><p><strong><span style='font-size:10px;'>第1条惠吧会员卡会员相关定义</span></strong></p><p><span style='font-size:10px;'>惠吧会员卡会员：惠吧会员卡致力于打造国内具有特色和知名度的亲子福利联盟品牌。用户作为惠吧会员卡持有者，将免费享受惠吧会员卡所有的合作机构免费游玩或体验之权益。</span></p><p> </p><p> </p><p> </p><p> </p><p><strong><span style='font-size:10px;'>第2条本站服务条款的确认和接纳</span></strong></p><p><strong><span style='font-size:10px;'>2.1本平台所提供的惠吧会员卡使用过程中的解释权归惠吧网络所有。</span></strong></p><p><strong><span style='font-size:10px;'>2.2用户点击同意后，即视为用户确认接受惠吧网络会员协议的相关条款，且同意按协议内容履行，如产生相关用户责任的，应当承担相应法律责任。</span></strong></p><p><span style='font-size:10px;'>2.3凡年满18周岁并同意接受会员服务协议的自然人均可申请成为会员，用户购买会员卡后，需立即根据小程序指引绑定身份证进行实名认证从而完善用户信息。</span></p><p><strong><span style='color:#ff0000;'><span style='font-size:10px;'>2.4惠吧会员卡一经激活，立即开始起算会员有效期。用户在会员有效期内，中途主动取消服务、放弃资格、拒绝进行实名认证等，均将不能获得为开通本服务而支付费用的退还。</span></span></strong></p><p> </p><p><strong><span style='font-size:10px;'>第3条惠吧会员卡版本和会员有效期时间</span></strong></p><p><strong><span style='font-size:10px;'>3.1惠吧会员卡现有两种版本，即“惠吧会员卡”（1成人使用）和“惠吧亲子卡“（1成人1儿童使用），初版发行于2019年；以下统称为会员卡。</span></strong></p><p><span style='font-size:10px;'>3.2会员有效期自购买电子会员卡当日起至1年后止；实体卡的有效期从用户扫描实体卡二维码绑定用户手机号码之日起，至1年后止，每年以365日计。（如：会员2019年8月1日扫描，则有效期截止至2020年7月31曰）。</span></p><p><strong><span style='font-size:10px;'>3.3会员卡有效期期满后，会员有权续费保留会员资格，续费金额以平台彼时公示金额为准。</span></strong></p><p> </p><p><strong><span style='font-size:10px;'>3.4同一身份证可绑定不同版本的会员卡，相同版本的会员卡仅可绑定一次，会员在第一次绑定激活会员卡时需要实名认证。两个版本的会员卡有效期单独计算，会员卡有效期提前终止或有效期期满且未续费的，则视为该版本会员卡失效。</span></strong></p><p> </p><p><strong><span style='font-size:10px;'>第4条会员权益</span></strong></p><p><span style='font-size:10px;'>4.1用户完成购买并成为会员后，可享受的免费景区乐园游玩及教育机构课程体验权益以惠吧网络官方小程序公布的信息为准。为更好的向会员提供服务，惠吧网络有权基于自身业务发展需要，调整会员权益内容。惠吧网络就前述权益的调整将在相应服务页面进行通知或公告，用户可以通过惠吧网络官方小程序查询最新的会员权益内容。</span></p><p> </p><p><strong><span style='font-size:10px;'>第5条会员用户使用注意事项</span></strong></p><p style='text-align:left;'><span style='font-size:10px;'>5.1会员卡在会员通过实名认证绑定前为电子非记名卡，一经售出即不予退换。绑定会员身份证信息后，本卡转为记名卡。</span><br/><span style='font-size:10px;'><strong>5.2使用会员权限预约景区乐园门票或教育机构课程时，会员每次只能预定1个景区乐园或教育机构。</strong></span><br/><span style='font-size:10px;'>5.3会员前往预约景区乐园或教育机构时需提供相应的有效凭证，景区乐园或教育机构核对信息无误后即可享受对应的服务内容。</span><br/><span style='font-size:10px;'>5.4<span style='color:#ff0000;'>“惠吧会员卡”会员理应知晓“惠吧会员卡”小程序每日提供的景区乐园/教育机构的预约数量是有限的。</span>在当日提供景区乐园/教育机构的预约数量达到上限之后，“惠吧会员卡”小程序展示的所有景区乐园/教育机构会产生无法预约的情况，“惠吧会员卡”会员应充分理解并接受此种情况是正常现象。在如上所述情况出现时，“惠吧会员卡”小程序会作出如下措施，包括但不限于：</span></p><p><span style='font-size:10px;'>1)增加当日景区乐园/教育机构的预约数量；</span></p><p><span style='font-size:10px;'>2)无法提供会员预约当日景区乐园/教育机构的服务。</span></p><p style='text-align:left;'><span style='font-size:10px;'>请会员根据自身行程，合理安排出行时间，提前预约。</span><br/><span style='font-size:10px;'><strong>5.5会员在预约时需预付费用，作为保证金，保证金金额按照所预约场所的市场价格计算。在会员核销后，乐客云将退还保证金。保证金将在返还条件达成的一个工作日内退还至会员付款的银行卡或其他收款账户中。会员需确保支付保证金的账户在保证金返还前能够使用，如因账户问题导致用户无法收取或提取保证金，相应责任甶会员自行承担。</strong></span><br/><span style='font-size:10px;'><strong>5.6景区乐园或教育机构开放的时间以景区乐园或教育机构方公布的时间为准，若因会员个人原因无法前往预约场所，需提前48小时申请取消订单。如会员未能提前48小时申请取消订单，平台将扣除30%的保证金作为退订费。如会员在预约日当天未能前往预约场所进行核销，平台将扣除全额保证金。</strong></span><br/><span style='font-size:10px;'><strong>5.7某些特殊景区乐园取消预约无法退还保证金，请会员在预约时慎重考虑，提前安排好出行计划，无法退还保证金的景区乐园可在“惠吧会员卡”官方小程序查询，在会员预约时也会做相应提示和说明。</strong></span><br/><span style='font-size:10px;'>5.8会员在预约过程中出现不正当行为（包括但不限于恶意预约、作弊或者其他影响预约公平的行为），乐客云有权视会员违约情况，采取取消其会员资格，永久冻结会员卡，取消其获得的免费权益的措施，并保留通过法律手段追究其违法行为的权利。</span><br/><span style='font-size:10px;'>5.9免费权益中的起算点自会员有效期的起算点相同。1年内可享受杭州惠吧网络科技有限公司合作景区乐园或教育机构提供的免费权益，用户可以通过惠吧网络官方小程序查询最新的会员权益内容。</span><br/><span style='font-size:10px;'>5.10会员仅限通过网络预约及取消订单，乐客云官方小程序为预约唯一平台。</span><br/><span style='font-size:10px;'>5.11<strong>会员卡“单人版“仅限会员本人使用，会员卡“亲子版”至多由会员本人及一名儿童使用，儿童票的使用规则按照每个景区乐园单独设定的标准执行，在景区乐园方提供免费入场条件的情况下，会员本人可与亲友共同前往，但不得超过景区乐园方提供免费入场的人数上限。</strong></span><br/><span style='font-size:10px;'>5.12会员需遵守国家法律法规，遵守各合作场所的用户提示，不得从事任何违法犯罪行为，一经发现将被取消会员资格。</span><br/><span style='font-size:10px;'><strong>5.13会员在完成当次预约并成功核销以后，即可进行下次预约。</strong></span><br/><span style='font-size:10px;'>5.14<strong>会员免费特权权益仅限会员本人使用，不得转让、转赠、转卖或变现。</strong>若会员有上述行为的，惠吧网络有权视会员违约情况，采取取消其会员资格，永久冻结会员卡，取消其获得的免费权益的措施，并保留通过法律手段追究其违法行为的权利。</span></p><p> </p><p><strong><span style='font-size:10px;'>第6条法律管辖和适用</span></strong></p><p><span style='font-size:10px;'>本协议的订立、执行、解释及争议的解决均适用中华人民共和国法律。用户在使用会员卡的过程中，如有任何问题可通过惠吧网络官方微信公众号直接留言或联系惠吧网络客服咨询、投诉。惠吧网络会在第一时间针对用户的需求进行回复及改进。对于本协议履行期间发生的争议，双方应尽力友好协商解决；协商不一致时，任何一方均可向杭州市余滨江区人民法院提起诉讼。</span></p><p> </p><p><span style='font-size:10px;'>第7条其他</span></p><p><strong><span style='font-size:10px;'>7.1如因不可抗力或其它惠吧网络无法控制的原因使本活动服务无法及时提供或无法按本协议履行的，惠吧网络会尽力协助处理。</span></strong></p><p><strong><span style='font-size:10px;'>7.2本协议中以黑体、加粗方式显著标识的条款，请用户着重阅读。</span></strong></p><p><strong><span style='font-size:10px;'>7.3用户点击勾选按钮，视为已充分阅读、理解、并同意本协议的内容，本协议在用户和惠吧网络之间形成有约束力的法律文件。</span></strong></p><p> </p><p> </p><p> </p>",

        nodes:
            "<p style='text-align:center;'><span style='font-size:'10px';'><strong><span style='color:'#ff0000';'>尊敬的会员</span></strong>：</span></p><p><strong><span style='font-size:10px;'>请认真阅读并理解以下内容，其中以加粗方式显著标识的文字，请着重阅读、慎重考虑。</span></strong></p><p><span style='font-size:10px;'>本协议是用户与平台运营方杭州惠吧网络科技有限公司</span></p><p><span style='font-size:10px;'>(以下简称为“惠吧网络”）之间就“惠吧会员卡”会员所建立的契约。惠吧会员卡（以下简称会员卡）为惠吧网络制作发行的仅供惠吧会员预订、游玩合作乐园，或体验机构提供教育课程所使用的权益凭证。</span></p><p> </p><p><span style='font-size:10px;'>请用户仔细阅读本协议，<strong>用户点击确认后，本协议即构成双方有约束力的法律文件。</strong></span></p><p> </p><p><strong><span style='font-size:10px;'>第1条惠吧会员卡会员相关定义</span></strong></p><p><span style='font-size:10px;'>惠吧会员卡会员：惠吧会员卡致力于打造国内具有特色和知名度的亲子福利联盟品牌。用户作为惠吧会员卡持有者，将免费享受惠吧会员卡所有的合作机构免费游玩或体验之权益。</span></p><p> </p><p> </p><p> </p><p> </p><p><strong><span style='font-size:10px;'>第2条本站服务条款的确认和接纳</span></strong></p><p><strong><span style='font-size:10px;'>2.1本平台所提供的惠吧会员卡使用过程中的解释权归惠吧网络所有。</span></strong></p><p><strong><span style='font-size:10px;'>2.2用户点击同意后，即视为用户确认接受惠吧网络会员协议的相关条款，且同意按协议内容履行，如产生相关用户责任的，应当承担相应法律责任。</span></strong></p><p><span style='font-size:10px;'>2.3凡年满18周岁并同意接受会员服务协议的自然人均可申请成为会员，用户购买会员卡后，需立即根据小程序指引绑定身份证进行实名认证从而完善用户信息。</span></p><p><strong><span style='color:#ff0000;'><span style='font-size:10px;'>2.4惠吧会员卡一经激活，立即开始起算会员有效期。用户在会员有效期内，中途主动取消服务、放弃资格、拒绝进行实名认证等，均将不能获得为开通本服务而支付费用的退还。</span></span></strong></p><p> </p><p><strong><span style='font-size:10px;'>第3条惠吧会员卡版本和会员有效期时间</span></strong></p><p><strong><span style='font-size:10px;'>3.1惠吧会员卡现有两种版本，即“惠吧会员卡”（1成人使用）和“惠吧亲子卡“（1成人1儿童使用），初版发行于2019年；以下统称为会员卡。</span></strong></p><p><span style='font-size:10px;'>3.2会员有效期自购买电子会员卡当日起至1年后止；实体卡的有效期从用户扫描实体卡二维码绑定用户手机号码之日起，至1年后止，每年以365日计。（如：会员2019年8月1日扫描，则有效期截止至2020年7月31曰）。</span></p><p><strong><span style='font-size:10px;'>3.3会员卡有效期期满后，会员有权续费保留会员资格，续费金额以平台彼时公示金额为准。</span></strong></p><p> </p><p><strong><span style='font-size:10px;'>3.4同一身份证可绑定不同版本的会员卡，相同版本的会员卡仅可绑定一次，会员在第一次绑定激活会员卡时需要实名认证。两个版本的会员卡有效期单独计算，会员卡有效期提前终止或有效期期满且未续费的，则视为该版本会员卡失效。</span></strong></p><p> </p><p><strong><span style='font-size:10px;'>第4条会员权益</span></strong></p><p><span style='font-size:10px;'>4.1用户完成购买并成为会员后，可享受的免费景区乐园游玩及教育机构课程体验权益以惠吧网络官方小程序公布的信息为准。为更好的向会员提供服务，惠吧网络有权基于自身业务发展需要，调整会员权益内容。惠吧网络就前述权益的调整将在相应服务页面进行通知或公告，用户可以通过惠吧网络官方小程序查询最新的会员权益内容。</span></p><p> </p><p><strong><span style='font-size:10px;'>第5条会员用户使用注意事项</span></strong></p><p style='text-align:left;'><span style='font-size:10px;'>5.1会员卡在会员通过实名认证绑定前为电子非记名卡，一经售出即不予退换。绑定会员身份证信息后，本卡转为记名卡。</span><br/><span style='font-size:10px;'><strong>5.2使用会员权限预约景区乐园门票或教育机构课程时，会员每次只能预定1个景区乐园或教育机构。</strong></span><br/><span style='font-size:10px;'>5.3会员前往预约景区乐园或教育机构时需提供相应的有效凭证，景区乐园或教育机构核对信息无误后即可享受对应的服务内容。</span><br/><span style='font-size:10px;'>5.4由于某些特定景区乐园和教育机构能够同时容纳的人数有限，节假日期间可能出现无法预约的现象。请会员根据自身行程，合理安排出行时间，提前预订。</span><br/><span style='font-size:10px;'><strong>5.5会员在预约时需预付费用，作为保证金，保证金金额按照所预约场所的市场价格计算。在会员核销后，乐客云将退还保证金。保证金将在返还条件达成的一个工作日内退还至会员付款的银行卡或其他收款账户中。会员需确保支付保证金的账户在保证金返还前能够使用，如因账户问题导致用户无法收取或提取保证金，相应责任甶会员自行承担。</strong></span><br/><span style='font-size:10px;'><strong>5.6景区乐园或教育机构开放的时间以景区乐园或教育机构方公布的时间为准，若因会员个人原因无法前往预约场所，需提前48小时申请取消订单。如会员未能提前48小时申请取消订单，平台将扣除30%的保证金作为退订费。如会员在预约日当天未能前往预约场所进行核销，平台将扣除全额保证金。</strong></span><br/><span style='font-size:10px;'><strong>5.7某些特殊景区乐园取消预约无法退还保证金，请会员在预约时慎重考虑，提前安排好出行计划，无法退还保证金的景区乐园可在“惠吧会员卡”官方小程序查询，在会员预约时也会做相应提示和说明。</strong></span><br/><span style='font-size:10px;'>5.8会员在预约过程中出现不正当行为（包括但不限于恶意预约、作弊或者其他影响预约公平的行为），乐客云有权视会员违约情况，采取取消其会员资格，永久冻结会员卡，取消其获得的免费权益的措施，并保留通过法律手段追究其违法行为的权利。</span><br/><span style='font-size:10px;'>5.9免费权益中的起算点自会员有效期的起算点相同。1年内可享受杭州惠吧网络科技有限公司合作景区乐园或教育机构提供的免费权益，用户可以通过惠吧网络官方小程序查询最新的会员权益内容。</span><br/><span style='font-size:10px;'>5.10会员仅限通过网络预约及取消订单，乐客云官方小程序为预约唯一平台。</span><br/><span style='font-size:10px;'>5.11<strong>会员卡“单人版“仅限会员本人使用，会员卡“亲子版”至多由会员本人及一名儿童使用，儿童票的使用规则按照每个景区乐园单独设定的标准执行，在景区乐园方提供免费入场条件的情况下，会员本人可与亲友共同前往，但不得超过景区乐园方提供免费入场的人数上限。</strong></span><br/><span style='font-size:10px;'>5.12会员需遵守国家法律法规，遵守各合作场所的用户提示，不得从事任何违法犯罪行为，一经发现将被取消会员资格。</span><br/><span style='font-size:10px;'><strong>5.13会员在完成当次预约并成功核销以后，即可进行下次预约。</strong></span><br/><span style='font-size:10px;'>5.14<strong>会员免费特权权益仅限会员本人使用，不得转让、转赠、转卖或变现。</strong>若会员有上述行为的，惠吧网络有权视会员违约情况，采取取消其会员资格，永久冻结会员卡，取消其获得的免费权益的措施，并保留通过法律手段追究其违法行为的权利。</span></p><p> </p><p><strong><span style='font-size:10px;'>第6条法律管辖和适用</span></strong></p><p><span style='font-size:10px;'>本协议的订立、执行、解释及争议的解决均适用中华人民共和国法律。用户在使用会员卡的过程中，如有任何问题可通过惠吧网络官方微信公众号直接留言或联系惠吧网络客服咨询、投诉。惠吧网络会在第一时间针对用户的需求进行回复及改进。对于本协议履行期间发生的争议，双方应尽力友好协商解决；协商不一致时，任何一方均可向杭州市余滨江区人民法院提起诉讼。</span></p><p> </p><p><span style='font-size:10px;'>第7条其他</span></p><p><strong><span style='font-size:10px;'>7.1如因不可抗力或其它如程无法控制的原因使本活动服务无法及时提供或无法按本协议履行的，惠吧网络会尽力协助处理。</span></strong></p><p><strong><span style='font-size:10px;'>7.2本协议中以黑体、加粗方式显著标识的条款，请用户着重阅读。</span></strong></p><p><strong><span style='font-size:10px;'>7.3用户点击勾选按钮，视为已充分阅读、理解、并同意本协议的内容，本协议在用户和乐客云之间形成有约束力的法律文件。</span></strong></p><p> </p><p> </p><p> </p>"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})
