// 多个表单校验，formRefs 是表单实例数组
export function validateForms(formRefs) {
    const objectList = []
    const results = formRefs.map(formRef =>
        new Promise((resolve, reject) => {
            formRef.validate((valid, object) => {
                if (valid) {
                    resolve()
                } else {
                    objectList.push(object)
                    reject()
                }
            })
        })
    )
    return Promise.all(results).catch(() => {
        return Promise.reject(objectList)
    })
}
export function scrollToTop() {
    window.scrollTo(0, 0)
}
/* 校验姓名 */
export function verifyFullName(rule, value, callback) {
    if (value !== '') {
        if (/\s/.test(value)) {
            callback(new Error('姓名不能包含空格！'))
        } else {
            if (/^[\u4e00-\u9fa5]+$/.test(value)) {
                if (value.length >= 20) {
                    callback(new Error('长度不能超过20个汉字！'))
                } else {
                    callback()
                }
            } else {
                callback(new Error('请输入汉字类型！'))
            }
        }
    } else {
        callback()
    }
}
/* 校验身份证 */
export function verifyIdCard(rule, value, callback) {
    if (value !== '' && value !== null) {
      const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      if (reg.test(value) && value !== '') {
         return callback()
      } else {
        return callback(new Error('请输入正确的证件号码！'))
      }
    } else {
      callback()
    }
}
// 通过身份证截取出生日期
export function getBirthdayFromIdCard(idCard) {
    let birthday = ''
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
    if (idCard != null && idCard != '' && reg.test(idCard)) {
      if (idCard.length == 15) {
        birthday = '19' + idCard.substr(6, 6)
      } else if (idCard.length == 18) {
        birthday = idCard.substr(6, 8)
      }
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    }
    return birthday
  }
  //计算年龄
  export function computerAge(strBirthday) {
    if (strBirthday) {
      const birthdays = new Date(strBirthday.replace(/-/g, '/'))
      const d = new Date()
      const age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() ||
              (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0)
      return age + ''
    } else {
      return ''
    }
  }
  /* 手机号码 */
export function verifyMobile(rule, value, callback) {
    if (value !== '' && value !== null) {
      if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|199|17[35678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式有误，请重新输入！'))
      }
    } else {
      callback()
    }
}
/* 家庭电话 */
export function verifyHomePhone(rule, value, callback) {
    if (value !== '' && value !== null) {
      if (/^\d{3,4}[-]\d{7,8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('电话格式有误，请重新输入！'))
      }
    } else {
      callback()
    }
  }
  