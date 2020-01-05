-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
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
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `gateway_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `gateway_variant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway`
--

LOCK TABLES `gateway` WRITE;
/*!40000 ALTER TABLE `gateway` DISABLE KEYS */;
INSERT INTO `gateway` VALUES (1,'SRI','Stanford Research Institute',1,-122.169,37.4282),(2,'UCSB','University of California, Santa Barbara',1,-119.849,34.414),(3,'UCLA','University of California, Los Angelos',1,-118.445,34.0689),(4,'UTAH','University of Utah',1,-111.842,40.7649),(5,'RAND','RAND Corporation',1,-118.491,34.0096),(6,'SDC','System Development Corporation',1,-118.491,34.0195),(7,'MIT','Massachussetts Institute of Technology',1,-71.0942,42.3601),(8,'BBN','Bolt Beranek and Newman Inc.',1,-71.1461,42.3919),(9,'HARVARD','Harvard University',1,-71.1167,42.377),(10,'STANFORD','Stanford University',1,-122.17,37.4275),(11,'LINCOLN','MIT Lincoln Laboratory',1,-71.2268,42.4405),(12,'CASE','Case Western Reserve University',1,-81.6084,41.5043),(13,'CARNEGIE','Carnegie Mellon University',1,-79.9431,40.4429);
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internet_edge`
--

LOCK TABLES `internet_edge` WRITE;
/*!40000 ALTER TABLE `internet_edge` DISABLE KEYS */;
INSERT INTO `internet_edge` VALUES (1,1,2,1),(2,2,3,1),(3,1,3,1),(4,1,4,1),(5,1,2,2),(6,1,3,2),(7,2,3,2),(8,3,5,2),(9,4,6,2),(10,4,7,2),(11,5,6,2),(12,5,8,2),(13,7,8,2),(14,8,9,2),(15,1,2,3),(16,1,3,3),(17,1,4,3),(18,1,10,3),(19,2,3,3),(20,3,5,3),(21,3,10,3),(22,4,6,3),(23,4,7,3),(24,5,6,3),(25,5,8,3),(26,7,8,3),(27,7,11,3),(28,8,9,3),(29,9,13,3),(30,11,12,3),(31,12,13,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version`
--

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;
INSERT INTO `version` VALUES (1,'1969-12-01 00:00:00'),(2,'1970-06-01 00:00:00'),(3,'1970-12-01 00:00:00');
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

-- Dump completed on 2020-01-05 17:34:04
