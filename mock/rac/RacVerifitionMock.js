const jigsawImageBase64 = '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';
const getCaptcha = (req, res, u, b) => {
    const body = (b && b.body) || req.body;
    return res.json({
        result:1,
        msg:'',
        extra:{
            dataVo:{
                captchaId:null,
                projectCode:null,
                captchaType:null,
                captchaOriginalPath:null,
                captchaFontType:null,
                captchaFontSize:null,
                jigsawImageBase64, //图片
                originalImageBase64:'', //图片
                point: null,
                pointJson: null,
                pointList: null,
                projectCode: null,
                result: false,
                secretKey: 'SFagzlk2zkCLkZp1',
                token: '08808fdd1fee4e59b548818c7cc1a2a8',
                wordList: null
            }
        }
    })
}
const checkCaptcha = (req, res, u, b) => {
    const body = (b && b.body) || req.body;
    return res.json({
        result:1,
        msg:'',
        extra:{
            dataVo:{
                'captchaId':null,
                'projectCode':null,
                'captchaType':'blockPuzzle',
                'captchaOriginalPath':null,
                'captchaFontType':null,
                'captchaFontSize':null,
                'secretKey':null,
                'originalImageBase64':null,
                'point':null,
                'jigsawImageBase64':null,
                'wordList':null,
                'pointList':null,
                'pointJson':'wClJtu6MRBAN/B7uS6FC1wyHh8pVPmm+xjMlpwP9+TM=',
                'token':'8100967e52194a039a4426a2a803e8eb',
                'result':true,'captchaVerification':null
            }
        }
    })
}
module.exports = {
    routes: { 
        'POST /cap-svr/cap/captcha/get': getCaptcha,
        'POST /cap-svr/cap/captcha/check': checkCaptcha,
        'GET /cap-svr/cap/sms/get': (req, res, u, b) => {
            // setTimeout(()=>{
            //     return res.json({
            //         result: 0,
            //         msg: '查询失败',
            //         extra: ''
            //     });
            // }, 2000)
            setTimeout(()=>{
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: ''
                });
            }, 2000)
        },
        'GET /cap-svr/cap/sms/get': (req, res, u, b) => {
            // setTimeout(()=>{
            //     return res.json({
            //         result: 0,
            //         msg: '查询失败',
            //         extra: ''
            //     });
            // }, 2000)
            setTimeout(()=>{
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: ''
                });
            }, 2000)
        },
        'POST /orp-svr/orp/bind/mobile': (req, res, u, b) => {
            return res.json({
                result: 1,
                msg: '查询成功',
                extra: ''
            });
        }
    }
}
