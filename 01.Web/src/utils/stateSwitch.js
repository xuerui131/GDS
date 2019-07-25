export default {
    switchTwoStatus(Status){ // 常规两种状态转换：0：否，1：是
      switch (Status){
        case 0:
          return '否';
          break;
        case 1:
          return '是';
          break;
        default:
          return '状态有误';
          break;
      }
    },
    switchIsShow(IsShow){ // 是否显示
      switch (IsShow){
        case 0:
          return '隐藏';
          break;
        case 1:
          return '显示';
          break;
        default:
          return '状态有误';
          break;
      }
    },
    switchIsEnable(IsEnable){ // 是否可用
      switch (IsEnable){
        case 0:
          return '不可用';
          break;
        case 1:
          return '可用';
          break;
        default:
          return '状态有误';
          break;
      }
    },
    switchMenuType(MenuType){ // 菜单类型
      switch (MenuType){
        case 1:
          return '直接页面';
          break;
        case 2:
          return '弹窗页面';
          break;
        case 3:
          return '内嵌页面';
          break;
        default:
          return '状态有误';
          break;
      }
    },
    switchUrlType(UrlType){ // 地址类型
      switch (UrlType){
        case 1:
          return '内部地址';
          break;
        case 2:
          return '外部地址';
          break;
        default:
          return '状态有误';
          break;
      }
    },
    switchGender(Gender){ // 地址类型
      switch (Gender){
        case 2:
          return '女';
          break;
        case 1:
          return '男';
          break;
        default:
          return '状态有误';
          break;
      }
    },
  }
  