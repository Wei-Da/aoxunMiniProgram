const serviceCode = {
	LOGIN: 'androidLogin.adr',//登录接口
	TABLE_QUERY_SERVICE: 'findFaultInfoFromSelfByAndroid.adr',//服务台查询服务
	GET_SERVICE_DETAIL:'findHandleProcessingDetailsByAndroid.adr',//获取服务详情
	QUERY_IMAGE_URL: 'findImageUrlByFaultIdByAndroid.adr',//图片地址查询
	IMAGE_URL: 'getImageByImageName.adr?routerCompany=' + wx.getStorageSync('serial')+'&imageName=',//图片加载
	CHECK_IMAGE_URL: 'getImageByImagePath.adr?routerCompany=' + wx.getStorageSync('serial') + '&imageName=',//图片加载
	ADD_FAULT_INFO:'', 
	QUERY_COMPANY_NAME:'getCompany.adr',//服务台服务公司名获取
	QUERY_COMPANY_DEPARTMENT:'getDept.adr',//服务公司获取部门
	QUERY_COMPANY_MEMBER:'getUserInfo.adr',//公司人员查询
	WAIT_CONFIRM:'findFaultInfoEngineerSerComfirmByAndroid.adr',
	GET_WAIT_SERVICE:'findFaultInfoEngineerHandleByAndroid.adr',
	HISTORY_RECORD:'findFaultInfoHistoryByStaffByAndroid.adr',
	COMPANY_CREATE_SERVICE:'addFaultInfoByAndroid.adr',
	SERVICE_DEALING:'findFaultInfoCurrency.adr',//服务进行中
	ENGINEER_HISTORY_RECORD:'findFaultInfoNewsletterByAndroid.adr',//甲方报修记录
	SERVICE_CLOSE_QUERY:'findFaultInfoFromServiceCloseByAndroid.adr',//甲方服务关闭查询
	CUSTOMER_SERVICE_EVALUATE:'addCheckInfoByAEngineerByAndroid.adr',//甲方服务客评
	CREATE_SERVICE:'addFaultInfoByAndroid.adr',//创建服务
	ADD_SERVICE_RECORD:'signByWeixin.adr',
	CLOSE_SERVICE:'updateFaultInfo7ByWorkerByAndroid.adr',
	SERVICE_CONFIRM:'updateFaultInfo5ByWorkerByAndroid.adr',
	SEARCH_KNOW_LIB:'findKnowledgeBycontentsByAndroid.adr',
	GET_BAR_CHART:'getReportInfo.adr',
	GET_SERVICE_CATALOG:'findServiceListByAndroidEstablish.adr',
	GET_SERVICE_CATALOG_DETAIL:'findServiceListByAndroidByPid.adr',
	DEAL_SERVICE:'findFaultInfoFromProcessByAndroid.adr',
	WAIT_SERVICE_CHANGE:'findChangeInfoByType1or2ByAndroid.adr',
	SERVICE_DISTRIBUTE:'updateFaultInfo3ByAndroid.adr',
	GET_REPAIR_NAMES:'findUserByUserIdUserDeptByAndroid.adr',
	SERVICE_CHANGE:'addChangeInfoByAndroid.adr',
	SERVICE_CLOSE:'updateFaultInfo7ByAndroid.adr',
	GET_SERVICE_NAME:'getUserInfo.adr',
	SERVICE_EVALUATE:'addCheckInfoByAndroid.adr',
	WAIT_SERVICE_CHANGE_PASS_OR_REJECT:'updateChangeInfoByAndroid.adr',
	SERVICE_TABLE_ACCOUNT:'findCountFaultInfoByReception.adr',
	SERVICE_ACCOUNT_CUSTOMER:'findCountFaultInfoByAEngineer.adr',
	SERVICE_ACCOUNT:'findCountFaultInfoByBEngineer.adr',
	GET_DEVICE_NAME:'findEqumentInfoByDeptIdByAndroid.adr',
	COMPANY_GET_DEVICE_NAME:'findEqumentInfoByCompanyIdByAndroid.adr',
	GET_SCANNER_CONTENT:'findEquipmentInfoByEidByAndroid.adr',
	GET_PROJECT_AND_FEE_DETAIL:'findProInfoAndCostByFIdByAndroid.adr',
	GET_MEMBER_BY_COMPANY:'findUserByCompanyAndType1ByAndroid.adr',
	GET_NOTICE_CONTENT:'findNoticesByAndriod.adr',
	GET_SCANNER_EQUIPMENT_RECORD: 'findMaintenanceRecordByAndroid.adr',
	SUBMIT_FORMIT_ID:'addUserForm.adr',
	GET_SERVICE_FILE:'findFaultInfoFromServiceFileByAndroid.adr',
	GET_EVENT_FEOM_CHART_DATA:'countTotalSysuserAndroid.adr',
	GET_ENGINNER_CHART_DATA:'countTotalPersonAndroid.adr',
	GET_SERVICE_CATALOG_CHART_DATA:'countTotalServiceListAndroid.adr',
	GET_ASSET_CHART_DATA:'countTotalDeviceAndroid.adr',
	GET_PROJECT_CHART_DATA:'countTotalProjectAndroid.adr',
	GET_DYNAMIC_MENU:'findSysMenuByRidByAndroid.adr',
	GET_PATROL_TASK:'getEquipmentTaskByUser.adr',
	GET_PATROL_TASK_DETAIL:'getEquipByDeloyMentId.adr',
	COMPLETE_TASK:'completeTask.adr',
	GET_PATROL_RECORD:'getScheduleInstanceById.adr',
	GET_PATROL_COMPLETE_RECORD:'getReportImageByReportId.adr',
	SUBMIT_PATROL_RESULT:'saveReportImageWeixin.adr',
	PATROL_IMAGE:'getImageByImagePath.adr',
	ORIGINAL_IMAGE: 'getImageByImageName.adr',
	REMOV_PATROL_IMAGE:'deleteReportImageById.adr',
	GET_NOTICE_TYPE:'findNoticeType.adr',
	UPDATE_SERVICE_TRANSFER:'saveOrUpdateFaultUserByAndroid.adr',
	GET_TRANSFER_PERSON_NAME: 'getUserInfoByAndroid.adr',
	GET_SERVICE_DETAIL_JIA:'findHandleProcessingDetailsByAndroidByJia.adr',//获取详情甲
	GET_SERVICE_DETAIL_YI:'findHandleProcessingDetailsByAndroidByYi.adr',//获取详情乙
	GET_PATROL_REPORT:'getSummarizeByActivitiId.adr',
	SAVE_SUMMARY_RESULT:'saveSummarizeResult.adr',
	GET_HISTORY_EQUIPMENT_REPORT:'getHistoryEquipMentReport.adr',
	MODIFY_PWD:'androidUpdateUserPassword.adr',
	MODIFY_MOBILE: 'androidUpdateMobile.adr',
	SAVE_CHECK_IMAGE:'saveFaultReportImageWeixin.adr',
	QUERY_CHECK_PICTURE:'findFaultReport.adr',
	DELETE_CHECK_PICTURE:'deleteFaultReportImage.adr',
	GET_HOT_SEARCH:'getKnowledgeTopThree.adr',
	GET_PERSON_ORDER_COUNT:'countTotalPersonForA.adr',
	REQUEST_OBSERVE:'findFaultInfoForObserverForA.adr'
}

module.exports = serviceCode;