-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: arpanet
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `arpanet`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `arpanet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `arpanet`;

--
-- Table structure for table `computer_model`
--

DROP TABLE IF EXISTS `computer_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `computer_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `computer_model`
--

LOCK TABLES `computer_model` WRITE;
/*!40000 ALTER TABLE `computer_model` DISABLE KEYS */;
INSERT INTO `computer_model` VALUES (1,'DDP-516'),(2,'H-645'),(3,'IBM-360/44'),(4,'IBM-360/65'),(5,'IBM-360/67'),(6,'IBM-360/75'),(7,'IBM-360/91'),(8,'IBM-370/15'),(9,'IBM-370/155'),(10,'ILLIAC (B6500)'),(11,'ILLIAC (PDP-10)'),(12,'PDP-1'),(13,'PDP-10'),(14,'PDP-11'),(15,'SIGMA-7'),(16,'TIP'),(17,'TSP'),(18,'TX-2');
/*!40000 ALTER TABLE `computer_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateway`
--

DROP TABLE IF EXISTS `gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateway` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(255) DEFAULT NULL,
  `long_name` varchar(255) DEFAULT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `wikidata_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `gateway_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `gateway_variant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway`
--

LOCK TABLES `gateway` WRITE;
/*!40000 ALTER TABLE `gateway` DISABLE KEYS */;
INSERT INTO `gateway` VALUES (1,'SRI','Stanford Research Institute',1,37.4282,-122.169,NULL,'Q604924'),(2,'UCSB','University of California, Santa Barbara',1,34.414,-119.849,NULL,'Q263064'),(3,'UCLA','University of California, Los Angelos',1,34.0689,-118.445,NULL,'Q174710'),(4,'UTAH','University of Utah',1,40.7649,-111.842,NULL,'Q168515'),(5,'RAND','RAND Corporation',1,34.0096,-118.491,NULL,'Q861141'),(6,'SDC','System Development Corporation',1,34.0195,-118.491,NULL,'Q7663644'),(7,'MIT','Massachussetts Institute of Technology',1,42.3601,-71.0942,NULL,'Q49108'),(8,'BBN','Bolt Beranek and Newman Inc.',1,42.3919,-71.1461,NULL,'Q891612'),(9,'HARVARD','Harvard University',1,42.377,-71.1167,NULL,'Q13371'),(10,'STANFORD','Stanford University',1,37.4275,-122.17,NULL,'Q41506'),(11,'LINCOLN','MIT Lincoln Laboratory',1,42.4405,-71.2268,NULL,'Q3138607'),(12,'CASE','Case Western Reserve University',1,41.5043,-81.6084,NULL,'Q1047060'),(13,'CMU','Carnegie Mellon University',1,40.4429,-79.9431,NULL,'Q190080'),(14,'AMES','NASA Ames Research Center',2,37.4152,-122.063,NULL,'Q181052'),(15,'ILLINOIS','University of Illinois',1,40.1106,-88.2283,NULL,'Q457281'),(16,'BURROUGHS','Burroughs Corporation Paoli Research Center',1,39.9619,-75.1612,NULL,'Q7132126'),(17,'MITRE','MITRE',2,38.9237,-77.1718,NULL,'Q627039'),(18,'MCCLELLAN','McClellan Air Force Base',1,38.6678,-121.401,NULL,'Q6800306'),(19,'USC','University of Southern California',1,34.0205,-118.286,NULL,'Q4614'),(20,'TINKER','Tinker Air Force Base',1,35.4088,-97.3853,NULL,'Q1999664'),(21,'NBS','National Bureau of Standards',1,39.1445,-77.2165,NULL,'Q176691'),(22,'RADC','Rome Air Development Center',1,43.2251,-75.4071,NULL,'Q14707242'),(23,'GWC','Air Force Global Weather Central',1,41.1243,-95.9146,NULL,'Q4697973'),(24,'ETAC','United States Air Force Environmental Technical Application Center, aka USAFETAC',1,38.5416,-89.855,NULL,'Q4550117'),(25,'BELVOIR','Fort Belvoir',1,38.7119,-77.1459,NULL,'Q1375761'),(26,'SDAC','Seismic Data Analysis Center',1,38.8136,-77.0413,NULL,NULL),(27,'ARPA','Advanced Research Projects Agency',1,38.8944,-77.0734,NULL,NULL),(28,'NOAA','National Oceanic and Atmospheric Administration',1,40.015,-105.271,NULL,NULL),(29,'LLL','Lawrence Livermore Laboratory',1,37.687,-121.706,NULL,'Q519826'),(30,'LBL','Lawrence Berkeley Laboratory',1,37.8759,-122.25,NULL,'Q1133630'),(31,'XEROX','Xerox Corporation Palo Alto Research Center',1,37.4025,-122.148,NULL,'Q750428'),(32,'FNWC','Navy Fleet Numerical Weather Central',1,36.5974,-121.898,NULL,NULL),(33,'UCSD','University of California, San Diego',1,32.8801,-117.234,NULL,'Q622664'),(34,'USC-ISI','University of Southern California Information Sciences Institute',1,33.9802,-118.44,NULL,NULL),(35,'CCA','Computer Corporation of America',1,42.3601,-71.0942,NULL,'Q65090984'),(36,'ABERDEEN','Aberdeen Ballistic Research Lab',1,39.4756,-76.1114,NULL,NULL),(37,'HAWAII','University of Hawaii',1,21.2969,-157.817,NULL,NULL),(38,'DOCB','Department of Commerce National Telecommunications and Information Administration',1,39.9951,-105.26,NULL,NULL),(39,'RML','Range Measurements Laboratory',1,28.2395,-80.6075,NULL,NULL),(40,'NORSAR','Royal Norwegian Council for Scientific and Industrial Research Seismic Array',1,59.975,11.0475,NULL,'Q1037544'),(41,'TYMSHARE','Tymshare Inc. Augmentation Resources Center',1,37.3325,-122.035,NULL,'Q7860427'),(42,'LONDON','University College London Department of Statistics and Computer Science',1,51.5246,-0.134,NULL,'Q193196'),(43,'WPAFB','Wright-Patterson Air Force Base',1,39.8137,-84.0537,NULL,'Q730187'),(44,'NCC','Bolt, Beranek, and Newman Inc. Network Control Center',1,42.3919,-71.1461,NULL,NULL),(45,'RUTGERS','Rutgers University',1,40.5221,-74.4627,NULL,'Q499451'),(47,'MOFFETT','ARPA Research Center, Moffett Field, CA',1,37.4085,-122.052,NULL,'Q3565247'),(48,'KIRTLAND','Kirtland Air Force Base',1,35.0489,-106.551,NULL,'Q577946'),(49,'SCRL','Speech Communications Research Laboratory',1,34.4107,-119.709,'800A Miramonte Drive, Santa Barbara, California 93109',NULL),(50,'IOX',NULL,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `gateway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateway_variant`
--

DROP TABLE IF EXISTS `gateway_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateway_variant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(255) DEFAULT NULL,
  `long_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway_variant`
--

LOCK TABLES `gateway_variant` WRITE;
/*!40000 ALTER TABLE `gateway_variant` DISABLE KEYS */;
INSERT INTO `gateway_variant` VALUES (1,'IMP','Interface Message Processor','Interface Message Processor'),(2,'TIP','Terminal Interface Message Processor','Terminal IMP');
/*!40000 ALTER TABLE `gateway_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internet_edge`
--

DROP TABLE IF EXISTS `internet_edge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internet_edge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head_id` int(11) DEFAULT NULL,
  `tail_id` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `head_id` (`head_id`),
  KEY `tail_id` (`tail_id`),
  KEY `version_id` (`version_id`),
  CONSTRAINT `internet_edge_ibfk_1` FOREIGN KEY (`head_id`) REFERENCES `gateway` (`id`),
  CONSTRAINT `internet_edge_ibfk_2` FOREIGN KEY (`tail_id`) REFERENCES `gateway` (`id`),
  CONSTRAINT `internet_edge_ibfk_3` FOREIGN KEY (`version_id`) REFERENCES `version` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internet_edge`
--

LOCK TABLES `internet_edge` WRITE;
/*!40000 ALTER TABLE `internet_edge` DISABLE KEYS */;
INSERT INTO `internet_edge` VALUES (1,1,2,1),(2,2,3,1),(3,1,3,1),(4,1,4,1),(5,1,2,2),(6,1,3,2),(7,2,3,2),(8,3,5,2),(9,4,6,2),(10,4,7,2),(11,5,6,2),(12,5,8,2),(13,7,8,2),(14,8,9,2),(15,1,2,3),(16,1,3,3),(17,1,4,3),(18,1,10,3),(19,2,3,3),(20,3,5,3),(21,3,10,3),(22,4,6,3),(23,4,7,3),(24,5,6,3),(25,5,8,3),(26,7,8,3),(27,7,11,3),(28,8,9,3),(29,9,13,3),(30,11,12,3),(31,12,13,3),(32,1,2,4),(33,1,3,4),(34,1,4,4),(35,1,14,4),(36,2,3,4),(37,3,10,4),(38,3,5,4),(39,4,6,4),(40,4,15,4),(41,5,6,4),(42,5,8,4),(43,7,8,4),(44,7,11,4),(45,8,9,4),(46,9,16,4),(47,10,14,4),(48,11,12,4),(49,12,13,4),(50,13,17,4),(51,16,17,4),(52,1,2,5),(53,1,14,5),(54,1,18,5),(55,2,3,5),(56,3,5,5),(57,4,15,5),(58,4,18,5),(59,4,19,5),(60,5,6,5),(61,5,10,5),(62,6,19,5),(63,7,8,5),(64,7,11,5),(65,7,15,5),(66,8,9,5),(67,8,20,5),(68,9,21,5),(69,10,14,5),(70,11,22,5),(71,12,13,5),(72,12,22,5),(73,12,23,5),(74,13,17,5),(75,17,24,5),(76,19,20,5),(77,21,24,5),(78,1,2,6),(79,1,14,6),(80,1,18,6),(81,2,3,6),(82,3,5,6),(83,3,6,6),(84,4,15,6),(85,4,18,6),(86,5,10,6),(87,5,20,6),(88,6,19,6),(89,7,8,6),(90,7,11,6),(91,7,15,6),(92,8,9,6),(93,9,21,6),(94,10,14,6),(95,11,22,6),(96,12,13,6),(97,12,23,6),(98,13,25,6),(99,17,26,6),(100,17,27,6),(101,19,28,6),(102,20,24,6),(103,21,24,6),(104,23,28,6),(105,24,27,6),(106,25,26,6),(107,1,14,7),(108,1,29,7),(109,1,31,7),(110,2,3,7),(111,2,32,7),(112,3,6,7),(113,3,33,7),(114,4,14,7),(115,4,30,7),(116,5,33,7),(117,5,34,7),(118,6,19,7),(119,7,15,7),(120,7,35,7),(121,8,9,7),(122,8,35,7),(123,9,36,7),(124,10,14,7),(125,10,34,7),(126,11,26,7),(127,12,13,7),(128,12,22,7),(129,12,23,7),(130,13,25,7),(131,14,37,7),(132,17,26,7),(133,17,27,7),(134,19,38,7),(135,21,24,7),(136,21,36,7),(137,23,38,7),(138,24,39,7),(139,24,27,7),(140,25,26,7),(141,25,36,7),(142,26,40,7),(143,29,30,7),(144,31,41,7),(145,32,41,7),(146,34,39,7),(147,40,42,7),(148,4,15,7),(149,7,15,4),(150,11,22,7),(205,1,14,8),(206,1,29,8),(207,1,31,8),(208,2,3,8),(209,2,32,8),(210,3,6,8),(211,3,33,8),(212,4,15,8),(213,4,30,8),(214,5,33,8),(215,5,34,8),(216,6,19,8),(217,7,11,8),(218,7,35,8),(219,7,43,8),(220,8,35,8),(221,8,44,8),(222,9,44,8),(223,9,45,8),(224,10,14,8),(225,10,34,8),(226,11,22,8),(227,12,22,8),(228,12,23,8),(229,12,13,8),(230,13,25,8),(231,14,47,8),(232,14,37,8),(233,15,43,8),(234,17,26,8),(235,17,27,8),(236,19,38,8),(237,21,24,8),(238,21,36,8),(239,23,38,8),(240,24,27,8),(241,24,39,8),(242,25,26,8),(243,25,36,8),(244,26,40,8),(245,29,30,8),(246,30,47,8),(247,31,41,8),(248,32,41,8),(249,34,48,8),(250,36,45,8),(251,39,48,8),(252,40,42,8);
/*!40000 ALTER TABLE `internet_edge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `wikidata_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Alex McKenzie','Alex McKenzie',NULL),(2,'Andy Moorer','Andy Moorer',NULL),(3,'Barry Wessler','Barry Wessler',NULL),(4,'Robert T. Braden','Bob Braden','Q4931909'),(5,'Bob Bressler','Bob Bressler',NULL),(6,NULL,'Bob Long',NULL),(7,'Robert L. Sundberg','Bob Sundberg',NULL),(8,NULL,'Charles Rose',NULL),(9,'Daniel L. Murphy','Dan Murphy','Q528318'),(10,NULL,'Eric Harslem',NULL),(11,'Hal Van Zoeren','Hal VanZoeren',NULL),(12,'James M. Pepin','Jim Pepin',NULL),(13,NULL,'Jeff Rubin',NULL),(14,NULL,'Jim White',NULL),(15,NULL,'Joel Winett',NULL),(16,NULL,'John Cravits',NULL),(17,NULL,'John McConnell',NULL),(18,'Jonathan Bruce Postel','Jon Postel','Q92623'),(19,NULL,'Len Chaiten',NULL),(20,'Michael A. Padlipsky','Mike Padlipsky','Q6828087'),(21,NULL,'Robert Rosenthal',NULL),(22,NULL,'Ron Stoughton',NULL),(23,'Thomas J. Barkelow','Tom Barkelow',NULL),(24,'Wayne Hathaway','Wayne Hathaway',NULL),(25,NULL,'Will Kantrowitz',NULL);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_report`
--

DROP TABLE IF EXISTS `status_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` int(11) DEFAULT NULL,
  `gateway` int(11) DEFAULT NULL,
  `computer_model` int(11) DEFAULT NULL,
  `status_or_prediction` varchar(255) DEFAULT NULL,
  `obtained_from` int(11) DEFAULT NULL,
  `rfc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gateway` (`gateway`),
  KEY `computer_model` (`computer_model`),
  KEY `obtained_from` (`obtained_from`),
  CONSTRAINT `status_report_ibfk_1` FOREIGN KEY (`gateway`) REFERENCES `gateway` (`id`),
  CONSTRAINT `status_report_ibfk_2` FOREIGN KEY (`computer_model`) REFERENCES `computer_model` (`id`),
  CONSTRAINT `status_report_ibfk_3` FOREIGN KEY (`obtained_from`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_report`
--

LOCK TABLES `status_report` WRITE;
/*!40000 ALTER TABLE `status_report` DISABLE KEYS */;
INSERT INTO `status_report` VALUES (1,1,3,15,'Server #Limited',18,344),(2,65,3,7,'NETRJS now (Telnet in June)',4,344),(3,2,1,13,'Server',14,344),(4,66,1,13,'Server',19,344),(5,3,2,6,'Server',20,344),(6,4,4,13,'Server',3,344),(7,5,8,1,'Never',1,344),(8,69,8,13,'Server',9,344),(9,133,8,13,'Server(Exper.)',9,344),(10,6,7,2,'Server',20,344),(11,70,7,13,'Server',5,344),(12,134,7,13,'Server',13,344),(13,7,5,4,'User Only',10,344),(14,71,5,13,'Server',10,344),(15,8,6,9,'Server',6,344),(16,9,9,13,'Server',7,344),(17,73,9,12,'User Only',7,344),(18,10,11,5,'Soon',15,344),(19,74,11,18,'Server',20,344),(20,11,10,13,'Server',2,344),(21,12,15,14,'User Only',16,344),(22,13,12,13,'June',8,344),(23,14,13,13,'Server',11,344),(24,15,14,10,'Server',17,344),(25,16,14,5,'Soon',20,344),(26,144,14,16,'User Only',NULL,344),(27,145,17,16,'User Only',NULL,344),(28,19,21,14,'User Only',20,344),(29,147,21,16,'User Only',NULL,344),(30,148,24,16,'User Only',NULL,344),(31,23,19,3,'User Now',12,344),(32,151,19,16,'User Only',NULL,344),(33,152,23,16,'User Only',NULL,344),(34,158,8,16,'User Only',NULL,344),(35,1,3,15,'Server #Limited',18,353),(36,65,3,7,'NETRJS now (Telnet in June)',4,353),(37,2,1,13,'Server',14,353),(38,66,1,13,'Server',19,353),(39,3,2,6,'Server',20,353),(40,4,4,13,'Server',3,353),(41,5,8,1,'Never',1,353),(42,69,8,13,'Server',9,353),(43,133,8,13,'Server (Exper.)',9,353),(44,6,7,2,'Server',20,353),(45,70,7,13,'Server',5,353),(46,134,7,13,'Server',13,353),(47,7,5,4,'User Only',10,353),(48,71,5,13,'Server',10,353),(49,8,6,9,'Server',6,353),(50,9,9,13,'Server',7,353),(51,73,9,12,'User Only',7,353),(52,10,11,5,'Soon',15,353),(53,74,11,18,'Server',20,353),(54,11,10,13,'Server',2,353),(55,12,15,14,'User Only',16,353),(56,13,12,13,'June',8,353),(57,14,13,13,'Server',11,353),(58,15,14,10,'Server',17,353),(59,16,14,5,'Soon',20,353),(60,144,14,16,'User Only',NULL,353),(61,145,17,16,'User Only',NULL,353),(62,19,21,14,'User Only',20,353),(63,147,21,16,'User Only',NULL,353),(64,148,24,16,'User Only',NULL,353),(65,23,19,3,'User Now',12,353),(66,151,19,16,'User Only',NULL,353),(67,152,23,16,'User Only',NULL,353),(68,153,28,16,'User Only',NULL,353),(69,154,NULL,16,'User Only',NULL,353),(70,155,25,16,'User Only',NULL,353),(71,158,8,16,'User Only',NULL,353),(72,1,3,15,'Server #Limited',18,362),(73,65,3,7,'NETRJS now (Telnet in June)',4,362),(74,2,1,13,'Server',14,362),(75,66,1,13,'Server',19,362),(76,3,2,6,'Server',20,362),(77,4,4,13,'Server',3,362),(78,5,8,1,'Never',1,362),(79,69,8,13,'Server',9,362),(80,133,8,13,'Server(Exper.)',9,362),(81,6,7,2,'Server',20,362),(82,70,7,13,'Server',5,362),(83,134,7,13,'Server',13,362),(84,198,7,13,'Server',13,362),(85,7,5,4,'User Only',10,362),(86,71,5,13,'Server',10,362),(87,8,6,9,'Server',6,362),(88,9,9,13,'Server',7,362),(89,73,9,12,'User Only',7,362),(90,10,11,5,'Soon',15,362),(91,74,11,18,'Server',20,362),(92,11,10,13,'Server',2,362),(93,12,15,14,'User Only',16,362),(94,13,12,13,'June',8,362),(95,14,13,13,'Server',11,362),(96,15,14,11,'Server',17,362),(97,16,14,5,'Soon',20,362),(98,144,14,16,'User Only',NULL,362),(99,145,17,16,'User Only',NULL,362),(100,146,22,16,'User Only',NULL,362),(101,19,21,14,'User Only',20,362),(102,147,21,16,'User Only',NULL,362),(103,148,24,16,'User Only',NULL,362),(104,23,19,3,'User Now',12,362),(105,151,19,16,'User Only',NULL,362),(106,152,23,16,'User Only',NULL,362),(107,153,28,16,'User Only',NULL,362),(108,154,NULL,16,'User Only',NULL,362),(109,156,27,16,'User Only',NULL,362),(110,158,8,16,'User Only',NULL,362),(111,1,3,15,'Server #Limited',18,366),(112,65,3,7,'NETRJS now (Telnet in June)',4,366),(113,2,1,13,'Server',14,366),(114,66,1,13,'Server',19,366),(115,3,2,6,'Server',20,366),(116,4,4,13,'Server',3,366),(117,5,8,1,'Server',1,366),(118,69,8,13,'Server',9,366),(119,133,8,13,'Server (Exper.)',9,366),(120,6,7,2,'Server',20,366),(121,70,7,13,'Server',5,366),(122,134,7,13,'Server',13,366),(123,198,7,13,'Server',13,366),(124,7,5,4,'User Only',10,366),(125,71,5,13,'Server',10,366),(126,8,6,9,'Server',6,366),(127,9,9,13,'Server',7,366),(128,73,9,12,'User Only',7,366),(129,10,11,5,'Soon',15,366),(130,74,11,18,'Server',20,366),(131,138,11,17,'User Only',20,366),(132,11,10,13,'Server',2,366),(133,12,15,14,'User Only',16,366),(134,13,12,13,'July',8,366),(135,14,13,13,'Server',11,366),(136,15,14,11,'Server',17,366),(137,16,14,5,'Soon',20,366),(138,144,14,16,'User Only',NULL,366),(139,145,17,16,'User Only',NULL,366),(140,146,22,16,'User Only',NULL,366),(141,19,21,14,'User Only',20,366),(142,147,21,16,'User Only',NULL,366),(143,148,24,16,'User Only',NULL,366),(144,23,19,3,'User Now',12,366),(145,151,19,16,'User Only',NULL,366),(146,152,23,16,'User Only',NULL,366),(147,153,28,16,'User Only',NULL,366),(148,154,NULL,16,'User Only',NULL,366),(149,156,27,16,'User Only',NULL,366),(150,158,8,16,'User Only',NULL,366),(151,1,3,15,'Server #Limited',18,367),(152,65,3,7,'NETRJS now (Telnet in June)',4,367),(153,2,1,13,'Server',14,367),(154,66,1,13,'Server',19,367),(155,3,2,6,'Server',20,367),(156,4,4,13,'Server',3,367),(157,5,8,1,'Never',1,367),(158,69,8,13,'Server',9,367),(159,133,8,13,'Server (Exper.)',9,367),(160,6,7,2,'Server',20,367),(161,70,7,13,'Server',5,367),(162,134,7,13,'Server',13,367),(163,198,7,13,'Server',13,367),(164,7,5,4,'User Only',10,367),(165,71,5,13,'Server',10,367),(166,8,6,8,'Server',6,367),(167,9,9,13,'Server',7,367),(168,73,9,12,'User Only',7,367),(169,10,11,5,'Soon',15,367),(170,74,11,18,'Server',20,367),(171,138,11,17,'User Only',20,367),(172,11,10,13,'Server',2,367),(173,12,15,14,'User Only',16,367),(174,13,12,13,'July',8,367),(175,14,13,13,'Server',11,367),(176,15,14,11,'Server',17,367),(177,16,14,5,'Soon',20,367),(178,144,14,16,'User Only',NULL,367),(179,145,17,16,'User Only',NULL,367),(180,146,22,16,'User Only',NULL,367),(181,19,21,14,'User Only',20,367),(182,147,21,16,'User Only',NULL,367),(183,148,24,16,'User Only',NULL,367),(184,23,19,3,'User Now',12,367),(185,151,19,16,'User Only',NULL,367),(186,152,23,16,'User Only',NULL,367),(187,153,28,16,'User Only',NULL,367),(188,154,NULL,16,'User Only',NULL,367),(189,156,27,16,'User Only',NULL,367),(190,158,8,16,'User Only',NULL,367),(191,1,3,15,'SERVER #Limited',18,370),(192,65,3,7,'NETRJS now (Telnet in June)',4,370),(193,2,1,13,'Server',14,370),(194,66,1,NULL,'Server',19,370),(195,3,2,6,'Server',20,370),(196,4,4,13,'Server',3,370),(197,5,8,1,'Never',1,370),(198,69,8,13,'Server',9,370),(199,133,8,13,'Server (Exper.)',9,370),(200,6,7,2,'Server',20,370),(201,70,7,13,'Server',5,370),(202,134,7,13,'Server',13,370),(203,198,7,13,'Server',13,370),(204,7,5,4,'User Only',10,370),(205,71,5,13,'Server',10,370),(206,8,6,9,'Server',6,370),(207,9,9,13,'Server',7,370),(208,73,9,12,'User Only',7,370),(209,10,11,5,'Soon',15,370),(210,74,11,18,'Server',20,370),(211,138,11,17,'User Only',20,370),(212,11,10,13,'Server',2,370),(213,12,15,14,'User Only',16,370),(214,13,12,13,'July',8,370),(215,14,13,13,'Server',11,370),(216,15,14,11,'Server',17,370),(217,16,14,5,'Soon',20,370),(218,144,14,16,'User Only',NULL,370),(219,145,17,16,'User Only',NULL,370),(220,146,22,16,'User Only',NULL,370),(221,19,21,14,'User Only',20,370),(222,147,21,16,'User Only',NULL,370),(223,148,24,16,'User Only',NULL,370),(224,23,19,3,'User Now',12,370),(225,151,19,16,'User Only',NULL,370),(226,152,23,16,'User Only',NULL,370),(227,153,28,16,'User Only',NULL,370),(228,154,NULL,16,'User Only',NULL,370),(229,156,27,16,'User Only',NULL,370),(230,158,8,16,'User Only',NULL,370),(231,1,3,15,'Sever #Limited',18,376),(232,65,3,7,'NETRJS now (Telnet in June)',4,376),(233,2,1,13,'Server',14,376),(234,66,1,13,'Server',19,376),(235,3,2,6,'Server',20,376),(236,4,4,13,'Server',3,376),(237,5,8,1,'Never',1,376),(238,69,8,13,'Server',9,376),(239,133,8,13,'Server(Exper.)',9,376),(240,6,7,2,'Server',20,376),(241,70,7,13,'Server',5,376),(242,134,7,13,'Server',13,376),(243,198,7,13,'Server',13,376),(244,7,5,4,'User Only',10,376),(245,71,5,13,'Server',10,376),(246,8,6,9,'Server',6,376),(247,9,9,13,'Server',7,376),(248,73,9,12,'User Only',7,376),(249,10,11,5,'Soon',15,376),(250,74,11,18,'Server',20,376),(251,138,11,17,'User Only',20,376),(252,11,10,13,'Server',2,376),(253,12,15,14,'User Only',16,376),(254,13,12,13,'July',8,376),(255,14,13,13,'Server',11,376),(256,15,14,11,'Server',17,376),(257,16,14,5,'Soon',20,376),(258,144,14,16,'User Only',NULL,376),(259,145,17,16,'User Only',NULL,376),(260,146,22,16,'User Only',NULL,376),(261,19,21,14,'User Only',20,376),(262,147,21,16,'User Only',NULL,376),(263,148,24,16,'User Only',NULL,376),(264,23,19,3,'User Now',12,376),(265,151,19,16,'User Only',NULL,376),(266,152,23,16,'User Only',NULL,376),(267,153,28,16,'User Only',NULL,376),(268,154,NULL,16,'User Only',NULL,376),(269,156,27,16,'User Only',NULL,376),(270,158,8,16,'User Only',NULL,376);
/*!40000 ALTER TABLE `status_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version`
--

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;
INSERT INTO `version` VALUES (1,'1969-12-01 00:00:00'),(2,'1970-06-01 00:00:00'),(3,'1970-12-01 00:00:00'),(4,'1971-09-01 00:00:00'),(5,'1972-03-01 00:00:00'),(6,'1972-08-01 00:00:00'),(7,'1973-09-01 00:00:00'),(8,'1974-06-01 00:00:00');
/*!40000 ALTER TABLE `version` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-05  0:41:27
