USE [master]
GO
/****** Object:  Database [GDS]    Script Date: 2019/6/29 7:57:33 ******/
CREATE DATABASE [GDS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GDS', FILENAME = N'E:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\GDS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GDS_log', FILENAME = N'E:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\GDS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GDS] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GDS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GDS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GDS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GDS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GDS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GDS] SET ARITHABORT OFF 
GO
ALTER DATABASE [GDS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GDS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GDS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GDS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GDS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GDS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GDS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GDS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GDS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GDS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GDS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GDS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GDS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GDS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GDS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GDS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GDS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GDS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GDS] SET  MULTI_USER 
GO
ALTER DATABASE [GDS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GDS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GDS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GDS] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [GDS] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GDS', N'ON'
GO
ALTER DATABASE [GDS] SET QUERY_STORE = OFF
GO
USE [GDS]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [GDS]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[No] [varchar](50) NULL,
	[Description] [nvarchar](2000) NULL,
	[ProjectType] [int] NULL,
	[TemplateId] [int] NULL,
	[ProjectManager] [varchar](50) NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[Supplier] [int] NULL,
	[ReadOnlyRight] [nvarchar](2000) NULL,
	[EditRight] [nvarchar](2000) NULL,
	[Remark] [nvarchar](2000) NULL,
	[CurrentStatus] [int] NULL,
	[CurrentPhase] [int] NULL,
	[Status] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectType]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [varchar](2000) NULL,
	[Auditor] [varchar](50) NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_ProjectType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[View_Project]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[View_Project]
AS
SELECT  a.Id, a.Name, a.No, a.Description, a.ProjectType, a.TemplateId, a.ProjectManager, a.StartTime, a.EndTime, a.Supplier, 
                   a.ReadOnlyRight, a.EditRight, a.Remark, a.CurrentStatus, a.CurrentPhase, a.Status, a.CreateBy, a.CreateTime, 
                   a.UpdateBy, a.UpdateTime, a.IsDelete
FROM      dbo.Project AS a INNER JOIN
                   dbo.ProjectType AS b ON a.ProjectType = b.Id

GO
/****** Object:  Table [dbo].[Template]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Template](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [nvarchar](2000) NULL,
	[ProjectType] [int] NULL,
	[Status] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_Template] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[View_Template]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[View_Template]
AS
SELECT  a.Id, a.Name, a.Description, a.ProjectType, a.Status, a.CreateBy, a.CreateTime, a.UpdateBy, a.UpdateTime, a.IsDelete, 
                   a.Remark, b.Name AS ProjectTypeName
FROM      dbo.Template AS a INNER JOIN
                   dbo.ProjectType AS b ON a.ProjectType = b.Id

GO
/****** Object:  Table [dbo].[BackMenu]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackMenu](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MenuNo] [nvarchar](50) NULL,
	[ParentId] [int] NULL,
	[MenuType] [int] NULL,
	[UrlType] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[Sequence] [int] NOT NULL,
	[AccessUrl] [nvarchar](500) NULL,
	[MenuIcon] [nvarchar](200) NULL,
	[IsShow] [int] NULL,
	[IsEnable] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_BackMenu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BackRole]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[RoleNo] [nvarchar](50) NULL,
	[Sequence] [int] NULL,
	[IsEnable] [int] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_BackRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BackRoleMenuBind]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackRoleMenuBind](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MenuId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_BackRoleMenuBind] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BackUserInfo]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackUserInfo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LoginName] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[State] [int] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
	[loginToken] [varchar](200) NULL,
	[loginTokenTime] [datetime] NULL,
	[UserType] [int] NULL,
	[Department] [int] NULL,
 CONSTRAINT [PK_UserInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BackUserRoleBind]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackUserRoleBind](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UId] [int] NULL,
	[RoleId] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_BackUserRoleBind] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BaseData]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaseData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Value] [nvarchar](500) NULL,
	[Description] [varchar](2000) NULL,
	[ParentId] [int] NULL,
	[GroupType] [varchar](50) NULL,
	[Sort] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_BaseData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DepmentNo] [nvarchar](50) NULL,
	[Name] [nvarchar](255) NULL,
	[NameEN] [nvarchar](255) NULL,
	[RegionID] [int] NULL,
	[ParentID] [int] NOT NULL,
	[TypeID] [int] NOT NULL,
	[DeptTypeID] [int] NOT NULL,
	[CompanyID] [int] NULL,
	[Address] [nvarchar](max) NULL,
	[AddressEN] [nvarchar](max) NULL,
	[Zip] [nvarchar](20) NULL,
	[SortID] [int] NULL,
	[AddTime] [datetime] NOT NULL,
	[IsAgent] [int] NULL,
	[IsEnabled] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FormLibrary]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FormLibrary](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Content] [nvarchar](2000) NULL,
	[ProjectType] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_FormLibrary] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Operator] [varchar](50) NULL,
	[OperationModule] [varchar](50) NULL,
	[OperationType] [varchar](50) NULL,
	[OperationContent] [varchar](2000) NULL,
	[OperationTime] [datetime] NULL,
	[Remark] [varchar](500) NULL,
	[CreateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Position](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[NodeNum] [nvarchar](50) NULL,
	[DepID] [int] NULL,
	[ParentID] [int] NULL,
	[CompanyID] [int] NULL,
	[AddUser] [nvarchar](50) NULL,
	[AddTime] [datetime] NOT NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_Position_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectAttachment]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectAttachment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Url] [varchar](500) NULL,
	[ProjectId] [int] NULL,
	[ProjectPhaseId] [int] NULL,
	[ProjectMusetContentId] [int] NULL,
	[Type] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_ProjectAttachment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectPhase]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectPhase](
	[Id] [int] NULL,
	[TemplatePhaseId] [int] NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[Status] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierInfo]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupplierInfo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Supplier] [nvarchar](500) NULL,
	[SupplierContact] [nvarchar](50) NULL,
	[Phone] [varchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_SupplierInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TemplateMustContent]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplateMustContent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [nvarchar](2000) NULL,
	[IsMust] [int] NULL,
	[ProjectType] [int] NULL,
	[FormId] [int] NULL,
	[MustContentType] [int] NULL,
	[TemplatePhaseId] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_TemplateMustContent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TemplatePhase]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplatePhase](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateId] [int] NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [nvarchar](2000) NULL,
	[MustContent] [int] NULL,
	[HasDocList] [int] NULL,
	[HasLinkedForm] [int] NULL,
	[Sort] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_TemplatePhase] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserDetail]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nvarchar](50) NULL,
	[PostID] [int] NULL,
	[DepartID] [int] NULL,
	[CompanyID] [int] NULL,
	[Images] [nvarchar](50) NULL,
	[IsAgent] [int] NULL,
	[AddUser] [nvarchar](50) NULL,
	[AddTime] [datetime] NULL,
	[IsExam] [int] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[Isdelete] [int] NULL,
	[Remark] [varchar](500) NULL,
 CONSTRAINT [PK_UserDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PowerNum] [nvarchar](50) NULL,
	[StaffNo] [nvarchar](30) NULL,
	[Name] [nvarchar](255) NULL,
	[NameEN] [nvarchar](255) NULL,
	[PinyinJC] [nvarchar](255) NULL,
	[UserName] [nvarchar](255) NULL,
	[Pwd] [nvarchar](500) NULL,
	[Phone] [nvarchar](50) NULL,
	[Tel] [nvarchar](50) NULL,
	[FixedTel] [nvarchar](50) NULL,
	[MilitaryTel] [nvarchar](50) NULL,
	[Email] [nvarchar](255) NULL,
	[BirthDay] [nvarchar](100) NULL,
	[JoinJob] [nvarchar](50) NULL,
	[WorkingAge] [decimal](18, 2) NULL,
	[EntryDate] [nvarchar](50) NULL,
	[Sex] [int] NULL,
	[IsMarry] [int] NULL,
	[Disable] [bit] NULL,
	[Images] [image] NULL,
	[IDCard] [nvarchar](200) NULL,
	[Spouse] [nvarchar](50) NULL,
	[IsDel] [bit] NULL,
	[AddTime] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BackUserInfo] ON 

INSERT [dbo].[BackUserInfo] ([Id], [LoginName], [Name], [Password], [Phone], [State], [CreateTime], [CreateBy], [UpdateTime], [UpdateBy], [Isdelete], [Remark], [loginToken], [loginTokenTime], [UserType], [Department]) VALUES (1, N'admin', N'admin', N'admin', N'15921279199', 0, CAST(N'2019-06-26T00:40:17.813' AS DateTime), NULL, NULL, NULL, 0, NULL, N'175b18edf3d24a519b7777fb69a5d1d4', CAST(N'2019-06-29T01:19:35.577' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[BackUserInfo] OFF
SET IDENTITY_INSERT [dbo].[ProjectType] ON 

INSERT [dbo].[ProjectType] ([Id], [Name], [Description], [Auditor], [CreateBy], [CreateTime], [UpdateBy], [UpdateTime], [IsDelete], [Remark]) VALUES (1, N'IT', N'IT', NULL, NULL, CAST(N'2019-06-28T00:00:00.000' AS DateTime), NULL, NULL, 0, NULL)
INSERT [dbo].[ProjectType] ([Id], [Name], [Description], [Auditor], [CreateBy], [CreateTime], [UpdateBy], [UpdateTime], [IsDelete], [Remark]) VALUES (2, N'其他', N'其他', NULL, NULL, CAST(N'2019-06-28T00:22:55.630' AS DateTime), NULL, NULL, 0, NULL)
SET IDENTITY_INSERT [dbo].[ProjectType] OFF
SET IDENTITY_INSERT [dbo].[Template] ON 

INSERT [dbo].[Template] ([Id], [Name], [Description], [ProjectType], [Status], [CreateBy], [CreateTime], [UpdateBy], [UpdateTime], [IsDelete], [Remark]) VALUES (1, N'Andy的测试模板001', N'备注', 2, NULL, N'', CAST(N'2019-06-28T00:26:45.133' AS DateTime), N'', CAST(N'2019-06-28T00:26:45.133' AS DateTime), 0, NULL)
SET IDENTITY_INSERT [dbo].[Template] OFF
SET IDENTITY_INSERT [dbo].[TemplatePhase] ON 

INSERT [dbo].[TemplatePhase] ([Id], [TemplateId], [Name], [Description], [MustContent], [HasDocList], [HasLinkedForm], [Sort], [CreateBy], [CreateTime], [UpdateBy], [UpdateTime], [IsDelete], [Remark]) VALUES (1, 1, N'阶段1', N'阶段2', 1, NULL, NULL, 1, N'', CAST(N'2019-06-28T00:26:45.180' AS DateTime), N'', CAST(N'2019-06-28T00:26:45.180' AS DateTime), 0, NULL)
INSERT [dbo].[TemplatePhase] ([Id], [TemplateId], [Name], [Description], [MustContent], [HasDocList], [HasLinkedForm], [Sort], [CreateBy], [CreateTime], [UpdateBy], [UpdateTime], [IsDelete], [Remark]) VALUES (2, 2, N'项目阶段001', N'项目阶段描述001', 1, NULL, NULL, 1, N'', CAST(N'2019-06-28T07:09:49.230' AS DateTime), N'', CAST(N'2019-06-28T07:09:49.230' AS DateTime), 0, NULL)
SET IDENTITY_INSERT [dbo].[TemplatePhase] OFF
ALTER TABLE [dbo].[BackMenu] ADD  CONSTRAINT [DF_BackMenu_Sequence]  DEFAULT ((1)) FOR [Sequence]
GO
ALTER TABLE [dbo].[BackMenu] ADD  CONSTRAINT [DF_BackMenu_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BackMenu] ADD  CONSTRAINT [DF_BackMenu_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[BackRole] ADD  CONSTRAINT [DF_BackRole_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BackRole] ADD  CONSTRAINT [DF_BackRole_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[BackRoleMenuBind] ADD  CONSTRAINT [DF_BackRoleMenuBind_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BackRoleMenuBind] ADD  CONSTRAINT [DF_BackRoleMenuBind_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[BackUserInfo] ADD  CONSTRAINT [DF_UserInfo1_State]  DEFAULT ((0)) FOR [State]
GO
ALTER TABLE [dbo].[BackUserInfo] ADD  CONSTRAINT [DF_UserInfo1_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BackUserInfo] ADD  CONSTRAINT [DF_UserInfo1_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[BackUserRoleBind] ADD  CONSTRAINT [DF_BackUserRoleBind_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BackUserRoleBind] ADD  CONSTRAINT [DF_BackUserRoleBind_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[BaseData] ADD  CONSTRAINT [DF_BaseData_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BaseData] ADD  CONSTRAINT [DF_BaseData_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_ParentID]  DEFAULT ((0)) FOR [ParentID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_TypeID]  DEFAULT ((0)) FOR [TypeID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_DeptTypeID]  DEFAULT ((0)) FOR [DeptTypeID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_SortID]  DEFAULT ((0)) FOR [SortID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_AddTime]  DEFAULT (getdate()) FOR [AddTime]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[FormLibrary] ADD  CONSTRAINT [DF_FormLibrary_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[FormLibrary] ADD  CONSTRAINT [DF_FormLibrary_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[Log] ADD  CONSTRAINT [DF_Log_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Log] ADD  CONSTRAINT [DF_Log_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [DF_Position_ParentID]  DEFAULT ((0)) FOR [ParentID]
GO
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [DF_Position_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [DF_Position_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[ProjectAttachment] ADD  CONSTRAINT [DF_ProjectAttachment_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[ProjectAttachment] ADD  CONSTRAINT [DF_ProjectAttachment_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[ProjectPhase] ADD  CONSTRAINT [DF_ProjectPhase_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[ProjectPhase] ADD  CONSTRAINT [DF_ProjectPhase_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[ProjectType] ADD  CONSTRAINT [DF_ProjectType_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[ProjectType] ADD  CONSTRAINT [DF_ProjectType_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[SupplierInfo] ADD  CONSTRAINT [DF_SupplierInfo_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[SupplierInfo] ADD  CONSTRAINT [DF_SupplierInfo_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[Template] ADD  CONSTRAINT [DF_Template_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Template] ADD  CONSTRAINT [DF_Template_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[TemplateMustContent] ADD  CONSTRAINT [DF_TemplateMustContent_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[TemplateMustContent] ADD  CONSTRAINT [DF_TemplateMustContent_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[TemplatePhase] ADD  CONSTRAINT [DF_TemplatePhase_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[TemplatePhase] ADD  CONSTRAINT [DF_TemplatePhase_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[UserDetail] ADD  CONSTRAINT [DF_UserDetail_AddTime]  DEFAULT (getdate()) FOR [AddTime]
GO
ALTER TABLE [dbo].[UserDetail] ADD  CONSTRAINT [DF_UserDetail_IsExam]  DEFAULT ((1)) FOR [IsExam]
GO
ALTER TABLE [dbo].[UserDetail] ADD  CONSTRAINT [DF_UserDetail_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[UserDetail] ADD  CONSTRAINT [DF_UserDetail_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_WorkingAge]  DEFAULT ((0)) FOR [WorkingAge]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsDel]  DEFAULT ((0)) FOR [IsDel]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_AddTime]  DEFAULT (getdate()) FOR [AddTime]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPageData]    Script Date: 2019/6/29 7:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetPageData] -- Add the parameters for the stored procedure here
 @TVName nvarchar(1000),--表或视图或查询语句
 @IsSelectSQL bit, --@TVName是否带select的查询语句
 @IsReturnRecord bit, --是否返回记录
 @PageSize int, --每页记录大小
 @PageIndex int, --要返回的页数
 @WhereStr nvarchar(1000),--where后面的查询条件
 @OrderStr nvarchar(400),---order by 后面用于排序的子句
 @FieldStr nvarchar(1000),--要返回的字段名
 @AllRecordCount int OUTPUT, --返回本次查询能够查到的所有记录数目
 @RecordCount int OUTPUT, --本次查到返回的记录数目
 @PageCount int OUTPUT, --返回本次查询能够返回的页数
 @RMessage nvarchar(MAX) OUTPUT --返回执行结果信息
AS BEGIN -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.

SET NOCOUNT ON;

 DECLARE @SQLCount nvarchar(MAX);

 DECLARE @SQLSelect nvarchar(MAX);

 DECLARE @SQLstr nvarchar(MAX);

 DECLARE @SQLOrderStr nvarchar(450);

 if(@IsSelectSQL=1)--表明是一个查询语句
 BEGIN
SET @TVName=N' '+@TVName+' ttb ' END if(RTRIM(LTRIM(@WhereStr))<>'')--没有输入查询条件
 BEGIN
SET @SQLCount = 'select @AllRecordCount = count(*) from '+@TVName +' where '+@WhereStr END ELSE BEGIN
SET @SQLCount = 'select @AllRecordCount = count(*) from '+@TVName END --执行可以多次重复使用或动态生成的 Transact-SQL 语句或批处理。Transact-SQL 语句或批处理可以包含嵌入参数。
 EXEC sp_executesql @SQLCount,
      N'@AllRecordCount int out',
       @AllRecordCount OUTPUT --计算页数
 if(@AllRecordCount%@PageSize>0) BEGIN
SET @PageCount=@AllRecordCount/@PageSize + 1 END ELSE BEGIN
SET @PageCount=@AllRecordCount/@PageSize END if(@PageIndex>@PageCount
                                                OR @PageIndex<=0
                                                OR @PageSize<=0)--要求的页超出总页面范围
 BEGIN
SET @RecordCount=0
SET @RMessage='Out of page or bad size' RETURN END --计算本次能够返回的行数
 if(@AllRecordCount=0)--如果符合记录数为0
 BEGIN
SET @RecordCount=0 END ELSE BEGIN if(@AllRecordCount%@PageSize=0)--如果符合记录数能被页数整除
 BEGIN
SET @RecordCount=@PageSize;

 END ELSE BEGIN if(@PageIndex = @PageCount)--如果符合记录数不能能被页数整除，并且是最后一页
 BEGIN
SET @RecordCount=@AllRecordCount%@PageSize;

 END ELSE BEGIN
SET @RecordCount=@PageSize; --如果不能整除并且不在最后一页,返回页记录数

END END END if(@IsReturnRecord=0) BEGIN
SET @RMessage=@SQLCount RETURN END if(Rtrim(LTRIM(@OrderStr))<>'')--排序字段为空
 BEGIN
SET @SQLOrderStr = N' order by '+@OrderStr END ELSE BEGIN
SET @RMessage='No Order Field' RETURN END DECLARE @StartNums varchar(20) DECLARE @EndNums varchar(20)
SET @StartNums = (@PageSize*(@PageIndex-1)) + 1
SET @EndNums = (@PageSize*@PageIndex) if(NULL=@FieldStr
                                         OR RTRIM(LTRIM(@FieldStr))='')--没有输入字段
 BEGIN
SET @FieldStr=N'*' END if(RTRIM(LTRIM(@WhereStr))<>'')--没有输入查询条件
 BEGIN
SET @SQLSelect = @TVName + ' where '+@WhereStr END ELSE BEGIN
SET @SQLSelect = @TVName END
SET @SQLstr = ' WITH t_rowtable AS
  (SELECT row_number() over(' + @SQLOrderStr + ') AS row_number,
                       ' + @FieldStr + '
   FROM ' + @SQLSelect + ')
SELECT ' + @FieldStr + '
FROM t_rowtable
WHERE row_number BETWEEN ' + @StartNums + ' AND ' + @EndNums + +' '+ @SQLOrderStr
  SET @RMessage = @SQLstr EXEC(@SQLstr) END




GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1：公司  2:标识部门' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Department', @level2type=N'COLUMN',@level2name=N'TypeID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否启用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Department', @level2type=N'COLUMN',@level2name=N'IsEnabled'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'职位表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'职位编码 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'Code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'职位名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'节点编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'NodeNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'部门ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'DepID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'父级职位ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'ParentID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'公司ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'CompanyID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'AddUser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'AddTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主键ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用户工号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'UserID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'职位ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'PostID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'部门ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'DepartID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'公司ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'CompanyID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'头像' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'Images'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否代理' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'IsAgent'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'AddUser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'AddTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主键' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'排序' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'PowerNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'工号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'StaffNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'姓名EN' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'NameEN'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'简拼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'PinyinJC'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'账号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'密码' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Pwd'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'手机' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'电话' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Tel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'固定电话' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'FixedTel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'直线' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'MilitaryTel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'邮箱地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'出生日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'BirthDay'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'参加工作时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'JoinJob'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'工龄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'WorkingAge'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'入职日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'EntryDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性别 1 男 2 女' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Sex'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否结婚 ：1未婚 2 已婚 3 丧偶 4离婚 5 其他' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'IsMarry'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'禁用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Disable'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'头像' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Images'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身份证' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'IDCard'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'配偶出生日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Spouse'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否删除' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'IsDel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'AddTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "a"
            Begin Extent = 
               Top = 7
               Left = 48
               Bottom = 170
               Right = 261
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 7
               Left = 309
               Bottom = 170
               Right = 511
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1176
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1356
         SortOrder = 1416
         GroupBy = 1350
         Filter = 1356
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_Project'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_Project'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = -120
         Left = 0
      End
      Begin Tables = 
         Begin Table = "a"
            Begin Extent = 
               Top = 127
               Left = 48
               Bottom = 290
               Right = 250
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 127
               Left = 298
               Bottom = 290
               Right = 500
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1176
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1356
         SortOrder = 1416
         GroupBy = 1350
         Filter = 1356
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_Template'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_Template'
GO
USE [master]
GO
ALTER DATABASE [GDS] SET  READ_WRITE 
GO
