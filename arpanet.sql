-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: arpanet
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

-- Dump completed on 2020-12-23  2:07:29
