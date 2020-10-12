import { Message } from 'element-ui'
class Tools {
  static getPageCount(totalCount, pageSize) {
    let pageCount = 0;
    if (totalCount === 0) {
      pageCount = 0;
    } else {
      if (totalCount < pageSize) {
        pageCount = 1;
      } else {
        pageCount = Math.floor(totalCount / pageSize);
        if (totalCount % pageSize !== 0) {
          pageCount++;
        }
      }
    }
    return pageCount;
  }

  // 导入之前的验证
  static upLoadValidate(file) {
    const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      Message.error('文件只能是 Xlsx 格式!');
    }
    if (!isLt2M) {
      Message.error('上传文件大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
}

class Msg {
  static loading() {
    // document.querySelector('.loading-page').style.display = 'block';
  }

  static hideLoading() {
    // document.querySelector('.loading-page').style.display = 'none';
  }
}

export {
  Tools,
  Msg
}
