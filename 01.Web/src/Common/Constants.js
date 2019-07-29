
export const Constants = {
    
    //APIBaseUrl: process.env.NODE_ENV === "production"? "http://172.16.70.181:802/" : "http://localhost:21790/",
    APIBaseUrl: process.env.NODE_ENV === "production"? "http://211.152.45.77:8081/" : "http://211.152.45.77:8081/",
    //APIBaseUrlDev: "http://localhost:21790/",

    UserNameLabel: "UserName",
    UserTypeStr:"UserType",

    AdminRole: "管理员",
    PMRole: "项目经理",

    NotStarted: 0,
    InProgress: 1,
    Complete: 2,

    //固定模板的ID
    FixedTemplateId: -999,

    getProjectStatusStr(statusInt) {
        let statusStr = "未启动";
        switch (statusInt) {
            case 0: statusStr = "未启动"; break;
            case 1: statusStr = "进行中"; break;
            case 2: statusStr = "已完成"; break;
            default: statusStr = "未启动"; break;
        }

        return statusStr;
    }

}
