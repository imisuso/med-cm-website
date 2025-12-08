/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `abilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abilities` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `abilities_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ability_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ability_role` (
  `ability_id` smallint(5) unsigned NOT NULL,
  `role_id` smallint(5) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ability_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `agreement_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agreement_user` (
  `agreement_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`agreement_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `agreements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agreements` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date_effected` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `title` varchar(255) NOT NULL,
  `detail_delta` longtext NOT NULL,
  `detail_html` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `agreements_date_effected_index` (`date_effected`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `announces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announces` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `topic` varchar(1000) NOT NULL,
  `detail_delta` longtext NOT NULL,
  `detail_html` longtext NOT NULL,
  `attach_files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `expire_date` datetime NOT NULL,
  `type` tinyint(4) NOT NULL,
  `user_sap_id` varchar(255) NOT NULL,
  `division_id` tinyint(4) NOT NULL,
  `publish_status` tinyint(1) NOT NULL DEFAULT 0,
  `publish_date` datetime DEFAULT NULL,
  `pinned` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `branch_main_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch_main_menus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `main_header_id` tinyint(4) NOT NULL,
  `main_header_name_th` varchar(255) NOT NULL,
  `main_header_name_en` varchar(255) DEFAULT NULL,
  `division_id` tinyint(4) NOT NULL,
  `menu_order_id` tinyint(4) NOT NULL DEFAULT 99,
  `component_name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `branch_sub_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch_sub_menus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `main_header_id` tinyint(4) NOT NULL,
  `sub_header_id` tinyint(4) NOT NULL,
  `sub_header_name_th` varchar(255) NOT NULL,
  `sub_header_name_en` varchar(255) DEFAULT NULL,
  `division_id` tinyint(4) NOT NULL,
  `menu_order_id` tinyint(4) NOT NULL DEFAULT 99,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `detail_delta` longtext NOT NULL,
  `detail_html` longtext NOT NULL,
  `attach_files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `divisions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `display_order` smallint(6) DEFAULT 999,
  `division_id` tinyint(4) NOT NULL,
  `type` varchar(5) NOT NULL,
  `name_th` varchar(256) NOT NULL,
  `name_en` varchar(256) DEFAULT NULL,
  `image` varchar(500) DEFAULT '',
  `user_previous_act` varchar(256) DEFAULT NULL,
  `user_last_act` varchar(256) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galleries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `cover` varchar(1000) NOT NULL,
  `desc` varchar(2000) NOT NULL DEFAULT 'รายละเอียดเกี่ยวกับรูปกิจกรรมของงาน',
  `event_date` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`other`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `page_downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_downloads` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `link` varchar(2000) NOT NULL,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`other`)),
  `order_number` smallint(6) NOT NULL DEFAULT 999,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `person_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_versions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `person_id` bigint(20) unsigned NOT NULL,
  `trace_log_id` bigint(20) unsigned NOT NULL,
  `slug` char(36) DEFAULT NULL,
  `division_id` tinyint(4) DEFAULT NULL,
  `sap_id` varchar(20) DEFAULT NULL,
  `title_th` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `fname_th` varchar(255) DEFAULT NULL,
  `fname_en` varchar(255) DEFAULT NULL,
  `lname_th` varchar(255) DEFAULT NULL,
  `lname_en` varchar(255) DEFAULT NULL,
  `rname_full_th` varchar(255) DEFAULT NULL,
  `rname_full_en` varchar(255) DEFAULT NULL,
  `rname_short_th` varchar(255) DEFAULT NULL,
  `rname_short_en` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `group` tinyint(4) DEFAULT NULL,
  `position_mgnt` varchar(255) DEFAULT NULL,
  `position_division` varchar(255) DEFAULT NULL,
  `position_academic` tinyint(4) DEFAULT NULL,
  `reward` varchar(255) DEFAULT NULL,
  `cert` longtext DEFAULT NULL,
  `profiles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`profiles`)),
  `status` tinyint(1) DEFAULT NULL,
  `display_order` tinyint(4) DEFAULT NULL,
  `user_previous_act` varchar(255) DEFAULT NULL,
  `user_last_act` varchar(255) DEFAULT NULL,
  `record_updated` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_versions_person_id_foreign` (`person_id`),
  KEY `person_versions_trace_log_id_foreign` (`trace_log_id`),
  CONSTRAINT `person_versions_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`),
  CONSTRAINT `person_versions_trace_log_id_foreign` FOREIGN KEY (`trace_log_id`) REFERENCES `trace_logs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `division_id` tinyint(4) NOT NULL,
  `sap_id` varchar(20) DEFAULT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `fname_th` varchar(255) NOT NULL,
  `fname_en` varchar(255) DEFAULT NULL,
  `lname_th` varchar(255) NOT NULL,
  `lname_en` varchar(255) DEFAULT NULL,
  `rname_full_th` varchar(255) DEFAULT NULL,
  `rname_full_en` varchar(255) DEFAULT NULL,
  `rname_short_th` varchar(255) DEFAULT NULL,
  `rname_short_en` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `group` tinyint(4) DEFAULT 0,
  `position_mgnt` varchar(255) DEFAULT NULL,
  `position_division` varchar(255) DEFAULT NULL,
  `position_academic` tinyint(4) DEFAULT 0,
  `reward` varchar(255) DEFAULT NULL,
  `cert` longtext DEFAULT NULL,
  `profiles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`profiles`)),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `display_order` tinyint(4) NOT NULL DEFAULT 99,
  `user_previous_act` varchar(255) NOT NULL,
  `user_last_act` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `posters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posters` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `cover` varchar(1000) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`other`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` smallint(5) unsigned NOT NULL,
  `role_id` smallint(5) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `trace_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trace_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `user` varchar(20) NOT NULL,
  `section` varchar(256) NOT NULL,
  `action` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL,
  `details` varchar(2000) NOT NULL,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sap_id` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`other`)),
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitors` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `route_name` varchar(255) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2014_10_12_100000_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2019_08_19_000000_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2022_03_21_044413_create_posters_table',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2021_12_01_085938_create_divisions_table',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2021_12_01_082351_create_persons_table',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2014_10_12_000000_create_users_table',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2022_04_04_025041_create_galleries_table',10);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2022_05_25_024905_add_group_column_to_persons_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2022_06_08_022602_create_page_downloads_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2022_06_09_073323_add_status_other_to_users_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2022_05_30_031636_create_trace_logs_table',12);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2022_01_19_021435_create_branch_sub_menus_table',13);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2022_01_19_021404_create_branch_main_menus_table',14);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2021_12_28_040114_create_announces_table',15);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2022_07_22_015424_create_agreements_table',16);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2022_08_25_080437_create_visitors_table',17);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2022_09_19_034506_create_person_versions_table',18);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2024_01_24_030954_add_display_order_column_to_divisions_table',19);
