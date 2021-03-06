if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../uview-ui/components/u-icon/u-icon?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-toast/u-toast?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-mask/u-mask?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-popup/u-popup?hash=93778e59e9c142492cad72fd41ad6441b3624d39');
require('../../uview-ui/components/u-loading/u-loading?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-modal/u-modal?hash=1f55b4a79a4c8ac38bc0e98811ba942475bbad72');
require('../../uview-ui/components/u-search/u-search?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-action-sheet/u-action-sheet?hash=3c9f7133bdf7d16fec3ef0aaab0556f4e1889c01');
require('../../pages/login/login?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/customerPage/customerPage?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/noticeContent/noticeContent?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/deviceDetail/deviceDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/wxChartSample/wxChartSample?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting?hash=62e6cd762c2059f7693d7f4ecca8ea00611466fd');
require('../../components/serviceList/serviceList?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/searchPage/searchPage?hash=686d571b8c31899772edfca87e9c00cadcb29b1a');
require('../../pages/waitServiceDetail/waitServiceDetail?hash=cc3891b906750794f356ea3f069740e20dfcf30c');
require('../../pages/waitConfirmDetail/waitConfirmDetail?hash=cc3891b906750794f356ea3f069740e20dfcf30c');
require('../../pages/serviceHistoryRecordDetail/serviceHistoryRecordDetail?hash=e73f6357e0cb439bf8f01817cd54d3acdbd12bfd');
require('../../pages/oldVersionFileDetail/oldVersionFileDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/serviceSign/serviceSign?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/addServiceRecord/addServiceRecord?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/checkReport/checkReport?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/serviceClose/serviceClose?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/serviceDescribe/serviceDescribe?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/patrolContentHistory/patrolContentHistory?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/patrolPageDetail/patrolPageDetail?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/personalInfo/personalInfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/modifyPwd/modifyPwd?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/modifyLoginName/modifyLoginName?hash=b141339d46c767b8a9ac695e9acba0616c6ec01f');
require('../../pages/versionsPage/versionsPage?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/noticeContentTitle/noticeContentTitle?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mineCreateService/mineCreateService?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/dateChoose/dateChoose?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/createService/createService?hash=62e6cd762c2059f7693d7f4ecca8ea00611466fd');
require('../../pages/searchCompanyName/searchCompanyName?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/customerCreateService/customerCreateService?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}