-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (arm64)
--
-- Host: localhost    Database: mental_health_app
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `mood_id` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `mood_id_idx` (`mood_id`),
  CONSTRAINT `mood_id` FOREIGN KEY (`mood_id`) REFERENCES `moodpack` (`mood_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'So good!','2024-04-04 14:30:00',0),(3,1,'Keep happy!','2024-06-20 18:43:23',0),(4,9,'Cheer up!!','2024-06-29 00:33:24',0),(5,3,'Calm down. You can handle it.','2024-06-29 00:39:02',0),(6,6,'Wow that\'s awesome','2024-06-29 13:02:14',0),(9,2,'good','2024-08-23 15:14:51',0),(10,1,'Thanks for that message! I am also planning to go there','2024-08-29 01:25:04',0),(11,6,'lovely~','2024-08-29 02:19:36',1),(12,1,'I love Taiwan too~ The braised rice with pork is very impressive!','2024-08-29 14:59:56',2),(13,3,'Fixed though it\'s really tough!','2024-08-29 15:01:16',2),(14,1,'Braised rice with pork and soy sauce😄👍','2024-08-29 15:21:03',1),(15,3,'Congratulations!','2024-08-29 15:47:01',1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moodpack`
--

DROP TABLE IF EXISTS `moodpack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moodpack` (
  `mood_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tag` varchar(45) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `date` datetime NOT NULL,
  `public` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`mood_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moodpack`
--

LOCK TABLES `moodpack` WRITE;
/*!40000 ALTER TABLE `moodpack` DISABLE KEYS */;
INSERT INTO `moodpack` VALUES (1,1,'happiness','great food','The Taiwanese food I had today was amazing！I love Taiwan. Definitely will come back again!!','2024-04-01 14:30:00',1),(2,1,'peace','weather','Spring is here, the sun is shining today😊','2024-04-17 11:30:00',1),(3,2,'anxiety','huge bug','How to solve this problem... have no idea','2024-04-25 15:00:00',1),(4,1,'peace','it\'s ok','not bad','2024-06-15 17:23:20',1),(5,1,'anxiety','anxiety','why am I so anxious...','2024-06-17 21:25:31',1),(6,1,'happiness','nice weather','The real summer just like childhood','2024-06-17 21:36:06',1),(7,2,'peace','peaceful.','normal life','2024-05-25 15:00:00',0),(8,2,'happiness','happy happy happy','Today is really a big day. I got the best exam result.','2024-05-31 17:20:00',0),(9,1,'depression','depression','upset..upset','2024-06-18 15:36:58',1),(10,2,'happiness','happy daily life','I would be very happy if I can live like this everyday~','2024-06-28 23:36:01',0),(46,1,'happiness','Great Pasta',' I had delicious Pasta today!','2024-08-12 16:21:10',1),(48,1,'anxiety','Thesis','Anxious for my thesis...','2024-08-12 22:16:24',0),(52,1,'happiness','Praise','Got praise from my friend','2024-08-14 22:16:24',0),(53,1,'happiness','Certificate','it\'s quite good that I received the certificate','2024-08-18 10:15:09',0),(54,1,'happiness','happy','happy','2024-09-09 17:04:26',0),(55,1,'happiness','happy','happy','2024-09-11 12:23:11',0),(56,1,'happiness','happy','happy','2024-09-12 12:43:30',0);
/*!40000 ALTER TABLE `moodpack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Yuan','111','873452344'),(2,'Joey','joey9603','874407869'),(3,'Paco','98765','15261774356'),(14,'mei','123456','1111111111'),(15,'yu','666','1234567'),(16,'newuser','newpassword','1234567890'),(17,'newuser','newpassword','1234567890');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 13:45:29
