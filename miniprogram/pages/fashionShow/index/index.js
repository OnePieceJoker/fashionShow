const app = getApp();

Component({
    options: {
        // 引用全局样式模板
        addGlobalClass: true
    },
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, {
            id: 4,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        }, {
            id: 5,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        }, {
            id: 6,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        }],
        allFashionShowList: [{
                id: 1,
                type: 'image',
                tag: '有货',
                color: 'green',
                text: '2019春秋薄款韩版宽松流苏针织衫女七分袖休闲上衣套头淑女风圆领',
                url: 'https://gd2.alicdn.com/imgextra/i3/2943380628/O1CN01MzzV6v1GVfHqRhBYP_!!2943380628.jpg_400x400.jpg',
                imageFix: 'aspectFit'
            },
            {
                id: 2,
                type: 'image',
                tag: '新品',
                color: 'blue',
                text: '初春上衣女chic复古气质轻熟流苏网红牛仔短外套夹克2020春装新款',
                url: 'https://img.alicdn.com/imgextra/i1/1641081158/O1CN01mRINmm1KQPEFzGaF2_!!1641081158.jpg',
                imageFix: 'aspectFit'
            },
            {
                id: null,
                type: 'image',
                tag: '热卖',
                color: 'red',
                text: '职业装套装女高端女装正装时尚气质条纹西服西装套裙工装工作服OL',
                url: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/675269713/O1CN01lJfrmu2LcbZ1vyIP4_!!675269713.jpg_430x430q90.jpg',
                imageFix: 'aspectFit'
            },
            {
                id: 4,
                type: 'image',
                tag: '补货中',
                color: 'gray',
                text: '2020春夏季新款夹克女宽松日系工装带帽学院学生外套潮流女装',
                url: 'https://gd2.alicdn.com/imgextra/i2/2482324978/O1CN015oMruO1mdyCUXskhP_!!2482324978.jpg',
                imageFix: 'aspectFit'
            },
        ],
        cardCur: 0,
        isLoad: true,
        isLogin: ''
    },
    methods: {
        onLoad: function() {
            // TODO 调用云函数获取真实数据显示
            console.log('进入商品展示页面: [pages/fashionShow/index');
            // this.setData({
            //     isLogin: app.globalData.isLogin
            // })
            this.getSwiperList();
            this.getAllFashionShowList();

            this.towerSwiper('swiperList');
        },

        // goToLogin() {
        //     console.log("[pages/fashionShow/index] goToLogin: [info login before]app.globalData.isLogin=", app.globalData.isLogin);
        //     app.globalData.isLogin = true;
        //     console.log("[pages/fashionShow/index] goToLogin: [info login after]app.globalData.isLogin=", app.globalData.isLogin);
        //     this.setData({
        //         isLogin: app.globalData.isLogin
        //     })
        // },


        queryAllForPage() {
            var _this = this;
            console.log('查询商品信息开始');
            this.setData({
                isLoad: true
            });
            // TODO 查询
            // setTimeout(function(){
            //     console.log('查询商品信息结束');
            //     _this.setData({
            //         isLoad: false
            //     })
            // }, 5000);
            
        },

        // 前往详细展示页面
        goToDetailed(e) {
            var shopId = e.currentTarget.id;
            if (shopId == '' || shopId == null || shopId == undefined) {
                wx.showToast({
                    title: '该商品详情丢失',
                    icon: 'none'
                })
            } else {
                // 前往商品详情页面
                wx.navigateTo({
                    url: '/pages/fashionShow/apparelDetail/apparelDetail?shopId=' + shopId,
                })
            }
        },

        /**
         * TODO 获取热门服饰数据
         */
        getSwiperList() {

        },

        /**
         * TODO 获取所有服饰数据
         */
        getAllFashionShowList() {

        },

        DotStyle(e) {
            this.setData({
                DotStyle: e.detail.value
            })
        },
        // cardSwiper
        cardSwiper(e) {
            this.setData({
                cardCur: e.detail.current
            })
        },
        // towerSwiper
        // 初始化towerSwiper
        towerSwiper(name) {
            let list = this.data[name];
            for (let i = 0; i < list.length; i++) {
                list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
                list[i].mLeft = i - parseInt(list.length / 2)
            }
            this.setData({
                swiperList: list
            })
        },
        // towerSwiper触摸开始
        towerStart(e) {
            this.setData({
                towerStart: e.touches[0].pageX
            })
        },
        // towerSwiper计算方向
        towerMove(e) {
            this.setData({
                direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
            })
        },
        // towerSwiper计算滚动
        towerEnd(e) {
            let direction = this.data.direction;
            let list = this.data.swiperList;
            if (direction == 'right') {
                let mLeft = list[0].mLeft;
                let zIndex = list[0].zIndex;
                for (let i = 1; i < list.length; i++) {
                    list[i - 1].mLeft = list[i].mLeft
                    list[i - 1].zIndex = list[i].zIndex
                }
                list[list.length - 1].mLeft = mLeft;
                list[list.length - 1].zIndex = zIndex;
                this.setData({
                    swiperList: list
                })
            } else {
                let mLeft = list[list.length - 1].mLeft;
                let zIndex = list[list.length - 1].zIndex;
                for (let i = list.length - 1; i > 0; i--) {
                    list[i].mLeft = list[i - 1].mLeft
                    list[i].zIndex = list[i - 1].zIndex
                }
                list[0].mLeft = mLeft;
                list[0].zIndex = zIndex;
                this.setData({
                    swiperList: list
                })
            }
        }
    }

})