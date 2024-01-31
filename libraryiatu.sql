-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.4.17-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных libraryiatu
CREATE DATABASE IF NOT EXISTS `libraryiatu` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `libraryiatu`;

-- Дамп структуры для таблица libraryiatu.action_events
CREATE TABLE IF NOT EXISTS `action_events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `batch_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionable_id` bigint(20) unsigned NOT NULL,
  `target_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned DEFAULT NULL,
  `fields` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'running',
  `exception` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `original` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changes` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `action_events_actionable_type_actionable_id_index` (`actionable_type`,`actionable_id`),
  KEY `action_events_batch_id_model_type_model_id_index` (`batch_id`,`model_type`,`model_id`),
  KEY `action_events_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.action_events: ~48 rows (приблизительно)
/*!40000 ALTER TABLE `action_events` DISABLE KEYS */;
INSERT INTO `action_events` (`id`, `batch_id`, `user_id`, `name`, `actionable_type`, `actionable_id`, `target_type`, `target_id`, `model_type`, `model_id`, `fields`, `status`, `exception`, `created_at`, `updated_at`, `original`, `changes`) VALUES
	(40, '932f04fc-b605-4f23-a7b5-1f2d9f4623ac', 5, 'Create', 'App\\User', 6, 'App\\User', 6, 'App\\User', 6, '', 'finished', '', '2021-04-13 08:12:44', '2021-04-13 08:12:44', NULL, '{"name":"\\u0421\\u0435\\u0440\\u0433\\u0435\\u0439 \\u041b\\u0438\\u0441\\u043a\\u043e\\u0432","email":"faraday073@gmail.com","updated_at":"2021-04-13T08:12:44.000000Z","created_at":"2021-04-13T08:12:44.000000Z","id":6}'),
	(41, '932f052e-c0da-49ae-90dc-36670c9dcddb', 5, 'Create', 'App\\Group', 6, 'App\\Group', 6, 'App\\Group', 6, '', 'finished', '', '2021-04-13 08:13:16', '2021-04-13 08:13:16', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422 \\u0431\\u0434-21","user_id":6,"updated_at":"2021-04-13T08:13:16.000000Z","created_at":"2021-04-13T08:13:16.000000Z","id":6}'),
	(42, '932f0559-2117-4458-9b9c-e78dd95ea9bd', 5, 'Create', 'App\\Book', 10, 'App\\Book', 10, 'App\\Book', 10, '', 'finished', '', '2021-04-13 08:13:44', '2021-04-13 08:13:44', NULL, '{"bookname":"\\u043a\\u043d\\u0438\\u0433\\u0430 \\u0411\\u0430\\u0437\\u044b \\u0434\\u0430\\u043d\\u043d\\u044b\\u0445","link":"https:\\/\\/mipt.ru\\/dnbic\\/content\\/db.pdf","group_id":6,"updated_at":"2021-04-13T08:13:44.000000Z","created_at":"2021-04-13T08:13:44.000000Z","id":10}'),
	(43, '9334eb89-5319-4dbd-93dc-93d72941d2e9', 5, 'Create', 'App\\Direction', 5, 'App\\Direction', 5, 'App\\Direction', 5, '', 'finished', '', '2021-04-16 06:36:32', '2021-04-16 06:36:32', NULL, '{"directionname":"\\u0418\\u0422","updated_at":"2021-04-16T06:36:31.000000Z","created_at":"2021-04-16T06:36:31.000000Z","id":5}'),
	(44, '9334eb8f-18c7-4cd4-a815-bca8d28f271d', 5, 'Create', 'App\\Direction', 6, 'App\\Direction', 6, 'App\\Direction', 6, '', 'finished', '', '2021-04-16 06:36:36', '2021-04-16 06:36:36', NULL, '{"directionname":"\\u0421\\u0410\\u041c","updated_at":"2021-04-16T06:36:36.000000Z","created_at":"2021-04-16T06:36:36.000000Z","id":6}'),
	(54, '93353f6a-00a0-4eb7-a087-b0cefa62efe8', 5, 'Delete', 'App\\GroupName', 9, 'App\\GroupName', 9, 'App\\GroupName', 9, '', 'finished', '', '2021-04-16 10:31:04', '2021-04-16 10:31:04', NULL, NULL),
	(55, '93354070-2129-4e8d-a5eb-c6c84bc4a55d', 5, 'Delete', 'App\\Group', 2, 'App\\Group', 2, 'App\\Group', 2, '', 'finished', '', '2021-04-16 10:33:56', '2021-04-16 10:33:56', NULL, NULL),
	(56, '93354091-7ae1-45a2-b03d-93819ca7856c', 5, 'Delete', 'App\\GroupName', 8, 'App\\GroupName', 8, 'App\\GroupName', 8, '', 'finished', '', '2021-04-16 10:34:18', '2021-04-16 10:34:18', NULL, NULL),
	(57, '933540b8-63fa-4aa2-ad1d-009ddedfb674', 5, 'Create', 'App\\GroupName', 10, 'App\\GroupName', 10, 'App\\GroupName', 10, '', 'finished', '', '2021-04-16 10:34:43', '2021-04-16 10:34:43', NULL, '{"groupname":"\\u0410\\u0410\\u0421\\u043c\\u0432-11","updated_at":"2021-04-16T10:34:43.000000Z","created_at":"2021-04-16T10:34:43.000000Z","id":10}'),
	(58, '933540bf-0436-4209-afae-4af8e90ee1a6', 5, 'Create', 'App\\GroupName', 11, 'App\\GroupName', 11, 'App\\GroupName', 11, '', 'finished', '', '2021-04-16 10:34:48', '2021-04-16 10:34:48', NULL, '{"groupname":"\\u0410\\u0410\\u0421\\u043c\\u0432-21","updated_at":"2021-04-16T10:34:48.000000Z","created_at":"2021-04-16T10:34:48.000000Z","id":11}'),
	(59, '933540c5-ddc2-44b6-8b9c-c37331fc47a8', 5, 'Create', 'App\\GroupName', 12, 'App\\GroupName', 12, 'App\\GroupName', 12, '', 'finished', '', '2021-04-16 10:34:52', '2021-04-16 10:34:52', NULL, '{"groupname":"\\u0410\\u0410\\u0421\\u043c\\u0434-11","updated_at":"2021-04-16T10:34:52.000000Z","created_at":"2021-04-16T10:34:52.000000Z","id":12}'),
	(60, '933540cd-ccf9-4271-ab43-5e72492e7637', 5, 'Create', 'App\\GroupName', 13, 'App\\GroupName', 13, 'App\\GroupName', 13, '', 'finished', '', '2021-04-16 10:34:57', '2021-04-16 10:34:57', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0432\\u0443-31","updated_at":"2021-04-16T10:34:57.000000Z","created_at":"2021-04-16T10:34:57.000000Z","id":13}'),
	(61, '933540d3-1667-4cea-94ae-4108f7eafb4f', 5, 'Create', 'App\\GroupName', 14, 'App\\GroupName', 14, 'App\\GroupName', 14, '', 'finished', '', '2021-04-16 10:35:01', '2021-04-16 10:35:01', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0434-11","updated_at":"2021-04-16T10:35:01.000000Z","created_at":"2021-04-16T10:35:01.000000Z","id":14}'),
	(62, '933540d9-9056-4e48-a2bf-78e52ae8c90f', 5, 'Create', 'App\\GroupName', 15, 'App\\GroupName', 15, 'App\\GroupName', 15, '', 'finished', '', '2021-04-16 10:35:05', '2021-04-16 10:35:05', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0434-21","updated_at":"2021-04-16T10:35:05.000000Z","created_at":"2021-04-16T10:35:05.000000Z","id":15}'),
	(63, '933540e0-adc6-40f0-a2ab-875c700b1cd1', 5, 'Create', 'App\\GroupName', 16, 'App\\GroupName', 16, 'App\\GroupName', 16, '', 'finished', '', '2021-04-16 10:35:10', '2021-04-16 10:35:10', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0434-22","updated_at":"2021-04-16T10:35:10.000000Z","created_at":"2021-04-16T10:35:10.000000Z","id":16}'),
	(64, '933540e6-6716-4562-bd76-4d981cc38685', 5, 'Create', 'App\\GroupName', 17, 'App\\GroupName', 17, 'App\\GroupName', 17, '', 'finished', '', '2021-04-16 10:35:13', '2021-04-16 10:35:13', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0434-31","updated_at":"2021-04-16T10:35:13.000000Z","created_at":"2021-04-16T10:35:13.000000Z","id":17}'),
	(65, '933540eb-808c-4e36-ac6c-ad1df97d3084', 5, 'Create', 'App\\GroupName', 18, 'App\\GroupName', 18, 'App\\GroupName', 18, '', 'finished', '', '2021-04-16 10:35:17', '2021-04-16 10:35:17', NULL, '{"groupname":"\\u0410\\u0418\\u0421\\u0422\\u0431\\u0434-41","updated_at":"2021-04-16T10:35:17.000000Z","created_at":"2021-04-16T10:35:17.000000Z","id":18}'),
	(66, '933540f0-f974-46cb-942b-2bf3286f66cd', 5, 'Create', 'App\\GroupName', 19, 'App\\GroupName', 19, 'App\\GroupName', 19, '', 'finished', '', '2021-04-16 10:35:20', '2021-04-16 10:35:20', NULL, '{"groupname":"\\u0410\\u0421\\u0431\\u0434-11","updated_at":"2021-04-16T10:35:20.000000Z","created_at":"2021-04-16T10:35:20.000000Z","id":19}'),
	(67, '933540f7-39ba-4c07-9ede-55277dbba673', 5, 'Create', 'App\\GroupName', 20, 'App\\GroupName', 20, 'App\\GroupName', 20, '', 'finished', '', '2021-04-16 10:35:24', '2021-04-16 10:35:24', NULL, '{"groupname":"\\u0410\\u0421\\u0431\\u0434-11","updated_at":"2021-04-16T10:35:24.000000Z","created_at":"2021-04-16T10:35:24.000000Z","id":20}'),
	(68, '933540ff-ae72-47dd-a13b-c117df529b5c', 5, 'Create', 'App\\GroupName', 21, 'App\\GroupName', 21, 'App\\GroupName', 21, '', 'finished', '', '2021-04-16 10:35:30', '2021-04-16 10:35:30', NULL, '{"groupname":"\\u0410\\u0421\\u0431\\u0434-31","updated_at":"2021-04-16T10:35:30.000000Z","created_at":"2021-04-16T10:35:30.000000Z","id":21}'),
	(69, '93354105-dd12-421b-8517-a322a74a48a5', 5, 'Create', 'App\\GroupName', 22, 'App\\GroupName', 22, 'App\\GroupName', 22, '', 'finished', '', '2021-04-16 10:35:34', '2021-04-16 10:35:34', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0432-51","updated_at":"2021-04-16T10:35:34.000000Z","created_at":"2021-04-16T10:35:34.000000Z","id":22}'),
	(70, '93354111-6c9c-4aa9-bd99-02a1957bd9e2', 5, 'Create', 'App\\GroupName', 23, 'App\\GroupName', 23, 'App\\GroupName', 23, '', 'finished', '', '2021-04-16 10:35:42', '2021-04-16 10:35:42', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0432\\u0443-11","updated_at":"2021-04-16T10:35:42.000000Z","created_at":"2021-04-16T10:35:42.000000Z","id":23}'),
	(71, '93354114-e7e9-458a-9166-685f3678a889', 5, 'Create', 'App\\GroupName', 24, 'App\\GroupName', 24, 'App\\GroupName', 24, '', 'finished', '', '2021-04-16 10:35:44', '2021-04-16 10:35:44', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-11","updated_at":"2021-04-16T10:35:44.000000Z","created_at":"2021-04-16T10:35:44.000000Z","id":24}'),
	(72, '9335411a-a0e0-4afc-8d78-a9901c50ca39', 5, 'Create', 'App\\GroupName', 25, 'App\\GroupName', 25, 'App\\GroupName', 25, '', 'finished', '', '2021-04-16 10:35:48', '2021-04-16 10:35:48', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-12","updated_at":"2021-04-16T10:35:48.000000Z","created_at":"2021-04-16T10:35:48.000000Z","id":25}'),
	(73, '9335411f-ab14-4cb9-baf0-1ce9f6bf4528', 5, 'Create', 'App\\GroupName', 26, 'App\\GroupName', 26, 'App\\GroupName', 26, '', 'finished', '', '2021-04-16 10:35:51', '2021-04-16 10:35:51', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-21","updated_at":"2021-04-16T10:35:51.000000Z","created_at":"2021-04-16T10:35:51.000000Z","id":26}'),
	(74, '93354125-0d5c-4fa5-a1f2-54294f253a07', 5, 'Create', 'App\\GroupName', 27, 'App\\GroupName', 27, 'App\\GroupName', 27, '', 'finished', '', '2021-04-16 10:35:54', '2021-04-16 10:35:54', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-22","updated_at":"2021-04-16T10:35:54.000000Z","created_at":"2021-04-16T10:35:54.000000Z","id":27}'),
	(75, '9335412a-f03a-4402-8d54-41b11f911788', 5, 'Create', 'App\\GroupName', 28, 'App\\GroupName', 28, 'App\\GroupName', 28, '', 'finished', '', '2021-04-16 10:35:58', '2021-04-16 10:35:58', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-31","updated_at":"2021-04-16T10:35:58.000000Z","created_at":"2021-04-16T10:35:58.000000Z","id":28}'),
	(76, '93354133-0d9a-48c5-a04f-40318f777120', 5, 'Create', 'App\\GroupName', 29, 'App\\GroupName', 29, 'App\\GroupName', 29, '', 'finished', '', '2021-04-16 10:36:04', '2021-04-16 10:36:04', NULL, '{"groupname":"\\u0410\\u0421\\u0412\\u0441\\u0434-32","updated_at":"2021-04-16T10:36:04.000000Z","created_at":"2021-04-16T10:36:04.000000Z","id":29}'),
	(77, '933541d9-49a3-4480-ada1-905a1381ffdd', 5, 'Create', 'App\\User', 7, 'App\\User', 7, 'App\\User', 7, '', 'finished', '', '2021-04-16 10:37:53', '2021-04-16 10:37:53', NULL, '{"name":"\\u0412\\u043b\\u0430\\u0434 \\u0421\\u043e\\u043a\\u043e\\u043b\\u043e\\u0432","email":"sokolov@mail.ru","updated_at":"2021-04-16T10:37:53.000000Z","created_at":"2021-04-16T10:37:53.000000Z","id":7}'),
	(78, '93354204-7e56-4d8e-ad0a-39212ad91d4b', 5, 'Create', 'App\\Group', 3, 'App\\Group', 3, 'App\\Group', 3, '', 'finished', '', '2021-04-16 10:38:21', '2021-04-16 10:38:21', NULL, '{"direction_id":5,"user_id":6,"groupname_id":15,"updated_at":"2021-04-16T10:38:21.000000Z","created_at":"2021-04-16T10:38:21.000000Z","id":3}'),
	(79, '93354fc1-a495-4ca5-bfca-fd5c53baa0d4', 5, 'Create', 'App\\Discipline', 6, 'App\\Discipline', 6, 'App\\Discipline', 6, '', 'finished', '', '2021-04-16 11:16:46', '2021-04-16 11:16:46', NULL, '{"disciplinename":"\\u0422\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0438 \\u043f\\u0440\\u043e\\u0433\\u0440\\u0430\\u043c\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f","updated_at":"2021-04-16T11:16:45.000000Z","created_at":"2021-04-16T11:16:45.000000Z","id":6}'),
	(80, '9335cd31-18bb-4206-b51d-2e5043c23da2', 5, 'Create', 'App\\Group', 4, 'App\\Group', 4, 'App\\Group', 4, '', 'finished', '', '2021-04-16 17:07:30', '2021-04-16 17:07:30', NULL, '{"groupname_id":15,"direction_id":5,"user_id":7,"updated_at":"2021-04-16T17:07:30.000000Z","created_at":"2021-04-16T17:07:30.000000Z","id":4}'),
	(81, '93374aea-3cbf-4839-8556-86566442048c', 5, 'Create', 'App\\Type', 1, 'App\\Type', 1, 'App\\Type', 1, '', 'finished', '', '2021-04-17 10:54:53', '2021-04-17 10:54:53', NULL, '{"typenames":"\\u0423\\u0447\\u0435\\u0431\\u043d\\u043e \\u043f\\u043e\\u043c\\u043e\\u0431\\u0438\\u0435","updated_at":"2021-04-17T10:54:53.000000Z","created_at":"2021-04-17T10:54:53.000000Z","id":1}'),
	(82, '93374e2f-907f-4824-89b6-6a7e4510aff6', 5, 'Update', 'App\\Type', 1, 'App\\Type', 1, 'App\\Type', 1, '', 'finished', '', '2021-04-17 11:04:02', '2021-04-17 11:04:02', '{"typenames":"\\u0423\\u0447\\u0435\\u0431\\u043d\\u043e \\u043f\\u043e\\u043c\\u043e\\u0431\\u0438\\u0435"}', '{"typenames":"\\u0423\\u0447\\u0435\\u0431\\u043d\\u043e\\u0435 \\u043f\\u043e\\u0441\\u043e\\u0431\\u0438\\u0435"}'),
	(83, '93374edb-07c8-49c7-957c-b71ce0c7be23', 5, 'Create', 'App\\Group', 5, 'App\\Group', 5, 'App\\Group', 5, '', 'finished', '', '2021-04-17 11:05:54', '2021-04-17 11:05:54', NULL, '{"groupname_id":10,"direction_id":6,"user_id":5,"updated_at":"2021-04-17T11:05:54.000000Z","created_at":"2021-04-17T11:05:54.000000Z","id":5}'),
	(84, '93374ffd-71b1-43da-a94a-f5f991bee756', 5, 'Create', 'App\\Book', 1, 'App\\Book', 1, 'App\\Book', 1, '', 'finished', '', '2021-04-17 11:09:04', '2021-04-17 11:09:04', NULL, '{"bookname":"db","link":": BelongsTo","type_id":1,"updated_at":"2021-04-17T11:09:04.000000Z","created_at":"2021-04-17T11:09:04.000000Z","id":1}'),
	(85, '9337502c-fea3-488d-8213-c72768a3a8ce', 5, 'Update', 'App\\Book', 1, 'App\\Book', 1, 'App\\Book', 1, '', 'finished', '', '2021-04-17 11:09:36', '2021-04-17 11:09:36', '{"bookname":"db","link":": BelongsTo"}', '{"bookname":"\\u041e\\u0421\\u041d\\u041e\\u0412\\u042b \\u0411\\u0410\\u0417 \\u0414\\u0410\\u041d\\u041d\\u042b\\u0425","link":"https:\\/\\/mipt.ru\\/dnbic\\/content\\/db.pdf"}'),
	(86, '933750a3-cbfd-46ea-9c4f-56ab74573207', 5, 'Create', 'App\\Type', 2, 'App\\Type', 2, 'App\\Type', 2, '', 'finished', '', '2021-04-17 11:10:53', '2021-04-17 11:10:53', NULL, '{"typenames":"\\u043d\\u0430\\u0443\\u0447\\u043d\\u043e\\u0435 \\u0438\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435","updated_at":"2021-04-17T11:10:53.000000Z","created_at":"2021-04-17T11:10:53.000000Z","id":2}'),
	(87, '933750bc-a38b-473e-96eb-9f669554882c', 5, 'Create', 'App\\Type', 3, 'App\\Type', 3, 'App\\Type', 3, '', 'finished', '', '2021-04-17 11:11:10', '2021-04-17 11:11:10', NULL, '{"typenames":"\\u043c\\u0435\\u0442\\u043e\\u0434\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u0435 \\u0443\\u043a\\u0430\\u0437\\u0430\\u043d\\u0438\\u044f","updated_at":"2021-04-17T11:11:10.000000Z","created_at":"2021-04-17T11:11:10.000000Z","id":3}'),
	(88, '933750cd-9c01-4d5b-8aae-e16ba3f8e574', 5, 'Create', 'App\\Type', 4, 'App\\Type', 4, 'App\\Type', 4, '', 'finished', '', '2021-04-17 11:11:21', '2021-04-17 11:11:21', NULL, '{"typenames":"\\u0441\\u0431\\u043e\\u0440\\u043d\\u0438\\u043a \\u043d\\u0430\\u0443\\u0447\\u043d\\u044b\\u0445 \\u0442\\u0440\\u0443\\u0434\\u043e\\u0432","updated_at":"2021-04-17T11:11:21.000000Z","created_at":"2021-04-17T11:11:21.000000Z","id":4}'),
	(89, '933750e5-f43e-465c-897e-f2ec3fec4aff', 5, 'Create', 'App\\Type', 5, 'App\\Type', 5, 'App\\Type', 5, '', 'finished', '', '2021-04-17 11:11:37', '2021-04-17 11:11:37', NULL, '{"typenames":"\\u0441\\u0431\\u043e\\u0440\\u043d\\u0438\\u043a \\u043b\\u0430\\u0431\\u043e\\u0440\\u0430\\u0442\\u043e\\u0440\\u043d\\u044b\\u0445 \\u0440\\u0430\\u0431\\u043e\\u0442","updated_at":"2021-04-17T11:11:37.000000Z","created_at":"2021-04-17T11:11:37.000000Z","id":5}'),
	(93, '933773fd-1456-4673-87f4-7cc1ddb7c55c', 5, 'Update', 'App\\GroupBook', 4, 'App\\GroupBook', 4, 'App\\GroupBook', 4, '', 'finished', '', '2021-04-17 12:49:44', '2021-04-17 12:49:44', '[]', '[]'),
	(94, '93377452-eeab-425e-9369-ac5c98f02e06', 5, 'Delete', 'App\\Group', 5, 'App\\Group', 5, 'App\\Group', 5, '', 'finished', '', '2021-04-17 12:50:40', '2021-04-17 12:50:40', NULL, NULL),
	(95, '93377456-cb11-460d-a287-cbb53892a067', 5, 'Delete', 'App\\Group', 4, 'App\\Group', 4, 'App\\Group', 4, '', 'finished', '', '2021-04-17 12:50:43', '2021-04-17 12:50:43', NULL, NULL),
	(96, '93377497-6ebe-4856-83ce-619531cc45f3', 5, 'Create', 'App\\Group', 6, 'App\\Group', 6, 'App\\Group', 6, '', 'finished', '', '2021-04-17 12:51:25', '2021-04-17 12:51:25', NULL, '{"groupname_id":15,"direction_id":5,"user_id":7,"updated_at":"2021-04-17T12:51:25.000000Z","created_at":"2021-04-17T12:51:25.000000Z","id":6}'),
	(97, '9337752f-7d1b-43e4-8891-5e9682c7612f', 5, 'Update', 'App\\Type', 1, 'App\\Type', 1, 'App\\Type', 1, '', 'finished', '', '2021-04-17 12:53:05', '2021-04-17 12:53:05', '{"typenames":"\\u0423\\u0447\\u0435\\u0431\\u043d\\u043e\\u0435 \\u043f\\u043e\\u0441\\u043e\\u0431\\u0438\\u0435"}', '{"typenames":"\\u0443\\u0447\\u0435\\u0431\\u043d\\u043e\\u0435 \\u043f\\u043e\\u0441\\u043e\\u0431\\u0438\\u0435"}'),
	(98, '93377745-6f0b-4a8d-ac73-a7d593fec9a9', 5, 'Create', 'App\\Book', 2, 'App\\Book', 2, 'App\\Book', 2, '', 'finished', '', '2021-04-17 12:58:55', '2021-04-17 12:58:55', NULL, '{"bookname":"\\u041e\\u041e\\u041f \\u0438 \\u043d\\u0430\\u0441\\u043b\\u0435\\u0434\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435","link":"http:\\/\\/venec.ulstu.ru\\/lib\\/go.php?id=8146","type_id":1,"updated_at":"2021-04-17T12:58:55.000000Z","created_at":"2021-04-17T12:58:55.000000Z","id":2}'),
	(99, '933777b9-a094-439e-90c6-56542c84de20', 5, 'Create', 'App\\Book', 3, 'App\\Book', 3, 'App\\Book', 3, '', 'finished', '', '2021-04-17 13:00:11', '2021-04-17 13:00:11', NULL, '{"bookname":"\\u041f\\u0440\\u043e\\u0438\\u0437\\u0432\\u043e\\u0434\\u0441\\u0442\\u0432\\u0435\\u043d\\u043d\\u0430\\u044f \\u043f\\u0440\\u0430\\u043a\\u0442\\u0438\\u043a\\u0430","link":"http:\\/\\/venec.ulstu.ru\\/lib\\/go.php?id=8220","type_id":1,"updated_at":"2021-04-17T13:00:11.000000Z","created_at":"2021-04-17T13:00:11.000000Z","id":3}'),
	(100, '93377acf-b414-49af-8098-579e271fa5a2', 5, 'Create', 'App\\GroupBook', 5, 'App\\GroupBook', 5, 'App\\GroupBook', 5, '', 'finished', '', '2021-04-17 13:08:49', '2021-04-17 13:08:49', NULL, '{"groupname_id":15,"book_id":2,"updated_at":"2021-04-17T13:08:49.000000Z","created_at":"2021-04-17T13:08:49.000000Z","id":5}'),
	(101, '93377ae5-43cf-44b9-909e-13207a76a4c2', 5, 'Create', 'App\\GroupBook', 6, 'App\\GroupBook', 6, 'App\\GroupBook', 6, '', 'finished', '', '2021-04-17 13:09:03', '2021-04-17 13:09:03', NULL, '{"groupname_id":15,"book_id":3,"updated_at":"2021-04-17T13:09:03.000000Z","created_at":"2021-04-17T13:09:03.000000Z","id":6}'),
	(102, '93393492-871b-4dc2-bf35-844a4d6c05cb', 5, 'Create', 'App\\Book', 4, 'App\\Book', 4, 'App\\Book', 4, '', 'finished', '', '2021-04-18 09:44:04', '2021-04-18 09:44:04', NULL, '{"bookname":"\\u041e\\u0441\\u043d\\u043e\\u0432\\u044b JS","link":"http:\\/\\/kharchuk.ru\\/JavaScript.pdf","type_id":1,"updated_at":"2021-04-18T09:44:03.000000Z","created_at":"2021-04-18T09:44:03.000000Z","id":4}'),
	(103, '933b1b3d-d587-41cc-9460-240fd9a8a603', 5, 'Create', 'App\\Group', 7, 'App\\Group', 7, 'App\\Group', 7, '', 'finished', '', '2021-04-19 08:24:53', '2021-04-19 08:24:53', NULL, '{"user_id":5,"groupname_id":15,"direction_id":5,"updated_at":"2021-04-19T08:24:53.000000Z","created_at":"2021-04-19T08:24:53.000000Z","id":7}'),
	(104, '933d05f1-c4c2-4485-a13d-d184f0d98f83', 5, 'Create', 'App\\Book', 5, 'App\\Book', 5, 'App\\Book', 5, '', 'finished', '', '2021-04-20 07:17:00', '2021-04-20 07:17:00', NULL, '{"bookname":"\\u0423\\u043f\\u0440\\u0430\\u0432\\u043b\\u0435\\u043d\\u0438\\u0435 \\u0434\\u0430\\u043d\\u043d\\u044b\\u043c\\u0438","link":"http:\\/\\/venec.ulstu.ru\\/lib\\/go.php?id=7921","type_id":1,"updated_at":"2021-04-20T07:16:59.000000Z","created_at":"2021-04-20T07:16:59.000000Z","id":5}'),
	(105, '933d0645-79c9-4736-8d35-ef6a9e41f238', 5, 'Create', 'App\\Book', 6, 'App\\Book', 6, 'App\\Book', 6, '', 'finished', '', '2021-04-20 07:17:55', '2021-04-20 07:17:55', NULL, '{"bookname":"\\u0422\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0438 \\u043f\\u0440\\u043e\\u0433\\u0440\\u0430\\u043c\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f","link":"http:\\/\\/venec.ulstu.ru\\/lib\\/go.php?id=8446","type_id":1,"updated_at":"2021-04-20T07:17:54.000000Z","created_at":"2021-04-20T07:17:54.000000Z","id":6}'),
	(106, '933d0741-aede-41f4-abd9-715944e1da1d', 5, 'Create', 'App\\GroupBook', 8, 'App\\GroupBook', 8, 'App\\GroupBook', 8, '', 'finished', '', '2021-04-20 07:20:40', '2021-04-20 07:20:40', NULL, '{"groupname_id":15,"book_id":5,"updated_at":"2021-04-20T07:20:40.000000Z","created_at":"2021-04-20T07:20:40.000000Z","id":8}'),
	(107, '93494eee-c7b2-4793-8eff-4b7a013d04e7', 5, 'Delete', 'App\\Question', 42, 'App\\Question', 42, 'App\\Question', 42, '', 'finished', '', '2021-04-26 09:51:02', '2021-04-26 09:51:02', NULL, NULL),
	(108, '93494ef4-f8f0-4694-8059-d4c29d2b03c7', 5, 'Delete', 'App\\Question', 35, 'App\\Question', 35, 'App\\Question', 35, '', 'finished', '', '2021-04-26 09:51:05', '2021-04-26 09:51:05', NULL, NULL);
/*!40000 ALTER TABLE `action_events` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bookname` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_types_id_foreign` (`type_id`) USING BTREE,
  CONSTRAINT `books_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.books: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`id`, `bookname`, `link`, `type_id`, `created_at`, `updated_at`) VALUES
	(1, 'ОСНОВЫ БАЗ ДАННЫХ', 'https://mipt.ru/dnbic/content/db.pdf', 1, '2021-04-17 11:09:04', '2021-04-17 11:09:36'),
	(2, 'ООП и наследование', 'http://venec.ulstu.ru/lib/go.php?id=8146', 1, '2021-04-17 12:58:55', '2021-04-17 12:58:55'),
	(3, 'Производственная практика', 'http://venec.ulstu.ru/lib/go.php?id=8220', 1, '2021-04-17 13:00:11', '2021-04-17 13:00:11'),
	(4, 'Основы JS', 'http://kharchuk.ru/JavaScript.pdf', 1, '2021-04-18 09:44:03', '2021-04-18 09:44:03'),
	(5, 'Управление данными', 'http://venec.ulstu.ru/lib/go.php?id=7921', 1, '2021-04-20 07:16:59', '2021-04-20 07:16:59'),
	(6, 'Технологии программирования', 'http://venec.ulstu.ru/lib/go.php?id=8446', 1, '2021-04-20 07:17:54', '2021-04-20 07:17:54'),
	(8, 'b2jhRQU6WO', 'tz26w1fnMv@gmail.com', 5, NULL, NULL),
	(9, 'IxKHoMN5zP', 'UKJHBXugzl@gmail.com', 5, NULL, NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.directions
CREATE TABLE IF NOT EXISTS `directions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `directionname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.directions: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` (`id`, `directionname`, `created_at`, `updated_at`) VALUES
	(5, 'ИТ', '2021-04-16 06:36:31', '2021-04-16 06:36:31'),
	(6, 'САМ', '2021-04-16 06:36:36', '2021-04-16 06:36:36');
/*!40000 ALTER TABLE `directions` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.disciplines
CREATE TABLE IF NOT EXISTS `disciplines` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `disciplinename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.disciplines: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `disciplines` DISABLE KEYS */;
INSERT INTO `disciplines` (`id`, `disciplinename`, `created_at`, `updated_at`) VALUES
	(5, 'Базы данных', '2021-04-13 18:38:47', '2021-04-13 18:38:49'),
	(6, 'Технологии программирования', '2021-04-16 11:16:45', '2021-04-16 11:16:45');
/*!40000 ALTER TABLE `disciplines` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.failed_jobs: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `groupname_id` bigint(20) unsigned DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `direction_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_directions_id_foreign` (`direction_id`) USING BTREE,
  KEY `groups_users_id_foreign` (`user_id`) USING BTREE,
  KEY `groups_group_names_id_foreign` (`groupname_id`) USING BTREE,
  CONSTRAINT `groups_directions_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  CONSTRAINT `groups_group_names_id_foreign` FOREIGN KEY (`groupname_id`) REFERENCES `group_names` (`id`),
  CONSTRAINT `groups_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.groups: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`id`, `groupname_id`, `user_id`, `direction_id`, `created_at`, `updated_at`) VALUES
	(3, 15, 6, 5, '2021-04-16 10:38:21', '2021-04-16 10:38:21'),
	(6, 15, 7, 5, '2021-04-17 12:51:25', '2021-04-17 12:51:25'),
	(7, 15, 5, 5, '2021-04-19 08:24:53', '2021-04-19 08:24:53');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.group_books
CREATE TABLE IF NOT EXISTS `group_books` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `groupname_id` bigint(20) unsigned NOT NULL,
  `book_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_books_group_names_id_foreign` (`groupname_id`) USING BTREE,
  KEY `group_books_books_id_foreign` (`book_id`) USING BTREE,
  CONSTRAINT `group_books_books_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `group_books_group_names_id_foreign` FOREIGN KEY (`groupname_id`) REFERENCES `group_names` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.group_books: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `group_books` DISABLE KEYS */;
INSERT INTO `group_books` (`id`, `groupname_id`, `book_id`, `created_at`, `updated_at`) VALUES
	(4, 15, 1, NULL, NULL),
	(5, 15, 2, '2021-04-17 13:08:49', '2021-04-17 13:08:49'),
	(6, 15, 3, '2021-04-17 13:09:03', '2021-04-17 13:09:03'),
	(7, 15, 4, NULL, NULL),
	(8, 15, 5, '2021-04-20 07:20:40', '2021-04-20 07:20:40');
/*!40000 ALTER TABLE `group_books` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.group_disciplines
CREATE TABLE IF NOT EXISTS `group_disciplines` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) unsigned DEFAULT NULL,
  `discipline_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_disciplines_group_id_foreign` (`group_id`),
  KEY `FK_group_disciplines_disciplines` (`discipline_id`),
  CONSTRAINT `FK_group_disciplines_disciplines` FOREIGN KEY (`discipline_id`) REFERENCES `disciplines` (`id`),
  CONSTRAINT `FK_group_disciplines_groups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.group_disciplines: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `group_disciplines` DISABLE KEYS */;
INSERT INTO `group_disciplines` (`id`, `group_id`, `discipline_id`, `created_at`, `updated_at`) VALUES
	(9, 3, 5, NULL, NULL),
	(10, 3, 6, NULL, NULL);
/*!40000 ALTER TABLE `group_disciplines` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.group_names
CREATE TABLE IF NOT EXISTS `group_names` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.group_names: ~18 rows (приблизительно)
/*!40000 ALTER TABLE `group_names` DISABLE KEYS */;
INSERT INTO `group_names` (`id`, `groupname`, `created_at`, `updated_at`) VALUES
	(10, 'ААСмв-11', '2021-04-16 10:34:43', '2021-04-16 10:34:43'),
	(11, 'ААСмв-21', '2021-04-16 10:34:48', '2021-04-16 10:34:48'),
	(12, 'ААСмд-11', '2021-04-16 10:34:52', '2021-04-16 10:34:52'),
	(13, 'АИСТбву-31', '2021-04-16 10:34:57', '2021-04-16 10:34:57'),
	(14, 'АИСТбд-11', '2021-04-16 10:35:01', '2021-04-16 10:35:01'),
	(15, 'АИСТбд-21', '2021-04-16 10:35:05', '2021-04-16 10:35:05'),
	(16, 'АИСТбд-22', '2021-04-16 10:35:10', '2021-04-16 10:35:10'),
	(17, 'АИСТбд-31', '2021-04-16 10:35:13', '2021-04-16 10:35:13'),
	(18, 'АИСТбд-41', '2021-04-16 10:35:17', '2021-04-16 10:35:17'),
	(19, 'АСбд-11', '2021-04-16 10:35:20', '2021-04-16 10:35:20'),
	(20, 'АСбд-11', '2021-04-16 10:35:24', '2021-04-16 10:35:24'),
	(21, 'АСбд-31', '2021-04-16 10:35:30', '2021-04-16 10:35:30'),
	(22, 'АСВсв-51', '2021-04-16 10:35:34', '2021-04-16 10:35:34'),
	(23, 'АСВсву-11', '2021-04-16 10:35:42', '2021-04-16 10:35:42'),
	(24, 'АСВсд-11', '2021-04-16 10:35:44', '2021-04-16 10:35:44'),
	(25, 'АСВсд-12', '2021-04-16 10:35:48', '2021-04-16 10:35:48'),
	(26, 'АСВсд-21', '2021-04-16 10:35:51', '2021-04-16 10:35:51'),
	(27, 'АСВсд-22', '2021-04-16 10:35:54', '2021-04-16 10:35:54'),
	(28, 'АСВсд-31', '2021-04-16 10:35:58', '2021-04-16 10:35:58'),
	(29, 'АСВсд-32', '2021-04-16 10:36:04', '2021-04-16 10:36:04');
/*!40000 ALTER TABLE `group_names` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.migrations: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(20, '2021_04_07_105155_create_groups_table', 1),
	(21, '2021_04_07_105156_create_groups_table', 2),
	(22, '2021_04_17_101805_create_types_table', 3),
	(23, '2021_04_17_101806_create_types_table', 4),
	(24, '2021_04_08_153112_create_books_table', 5),
	(25, '2021_04_17_103917_create_group_books_table', 6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.password_resets: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.personal_access_tokens: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_user_id_foreign` (`user_id`),
  CONSTRAINT `questions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.questions: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`id`, `title`, `content`, `user_id`, `created_at`, `updated_at`) VALUES
	(45, '- Новый вопрос', '-', 5, '2021-05-13 10:49:14', '2021-05-13 10:49:14'),
	(46, 'Добавьте книгу группе АИСТ бд21', 'Паттерны проектирования', 6, '2021-05-18 07:55:06', '2021-05-20 11:02:09'),
	(47, '- Новый вопрос', '-', 6, '2021-05-20 11:04:03', '2021-05-20 11:04:03');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `typenames` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.types: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` (`id`, `typenames`, `created_at`, `updated_at`) VALUES
	(1, 'учебное пособие', '2021-04-17 10:54:53', '2021-04-17 12:53:05'),
	(2, 'научное издание', '2021-04-17 11:10:53', '2021-04-17 11:10:53'),
	(3, 'методические указания', '2021-04-17 11:11:10', '2021-04-17 11:11:10'),
	(4, 'сборник научных трудов', '2021-04-17 11:11:21', '2021-04-17 11:11:21'),
	(5, 'сборник лабораторных работ', '2021-04-17 11:11:37', '2021-04-17 11:11:37');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;

-- Дамп структуры для таблица libraryiatu.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы libraryiatu.users: ~12 rows (приблизительно)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(5, 'admin', 'admin@admin.ru', '2021-04-13 12:09:37', '$2y$10$S7NmaVfLgAcjbT3x/04TDuMJVVKekbxfYwdPgqshqJSDM.2fxxZ.W', NULL, NULL, NULL),
	(6, 'Сергей Лисков', 'faraday073@gmail.com', NULL, '$2y$10$EAbc0GupbdzpC3zQap5j3eIj8Ss20VW8DCIVVPjKl8lzYXUm1jmQK', NULL, '2021-04-13 08:12:44', '2021-04-13 08:12:44'),
	(7, 'Влад Соколов', 'sokolov@mail.ru', NULL, '$2y$10$R0tcLuV0zTuHjqq6.W3P4u5gqXFP.TJzt01ovGJzpPsRollPoI/QS', NULL, '2021-04-16 10:37:53', '2021-04-16 10:37:53'),
	(8, 'PecJ22GAmt', 'jc9Lc0wFYK@gmail.com', NULL, '$2y$10$uruNZdhk6sDemxQn2MRnf.fz7vm16AytYjpknAAf.zMJCinzAmhe.', NULL, NULL, NULL),
	(9, '7XUYkifFAj', '7WOFeea9kd@gmail.com', NULL, '$2y$10$enNTvIcBtsFZUML7cfmwA.js0NPfDmdglU4KqI9mmGWC6TFbHztva', NULL, NULL, NULL),
	(10, 'nQNgIIu1Sw', 'lFuupBbo9N@gmail.com', NULL, '$2y$10$y3RQ54h.DDV3ziiQP254eOit5nlujC8SgPNy/SJJs6POMV83i3192', NULL, NULL, NULL),
	(11, 'Ec9cvKeNI2', 'iKZIhkqbvx@gmail.com', NULL, '$2y$10$dC3JBzRXHdy/kqICOYZ2SOogG8Fsda27.A8l5PYvgmOPjTjJREMBG', NULL, NULL, NULL),
	(12, 'LnXRH5qtEc', 'a7ipRAwQRC@gmail.com', NULL, '$2y$10$oRCMJRtJ1c8aaqD2rj2lmOKEzdwRMpqINNi2tJfCRpJdZ4kzlKLF2', NULL, NULL, NULL),
	(13, 'MQegWNLMNy', 'lwGBUpPsLe@gmail.com', NULL, '$2y$10$9aatQ8EMmL0qKFLTzGd06up2QfvYawwUcVj5E7N/uhQdHxdSNFG9u', NULL, NULL, NULL),
	(14, 'qVy29E0o12', 's1oXpHSqT6@gmail.com', NULL, '$2y$10$zlXyvWnuEooZIBKEzijkGOUaYDySpZ/rvbvlwvOi.y0bMZdxKUny.', NULL, NULL, NULL),
	(15, 'T2VkBFcObF', 'Jkd3BlPYFw@gmail.com', NULL, '$2y$10$eLo.fT5j0OgKLAhRslTclOu1zx/DHCUrPvk5cR46aMoEWW//TvBKa', NULL, NULL, NULL),
	(16, 'JFRfRqcREe', 'KxmbEVyCqR@gmail.com', NULL, '$2y$10$AgsMAE72iLzXidYhBLV/M.Wu.Z1H.ypalAxLSvkDXFFOdl29VMJ/W', NULL, NULL, NULL),
	(17, 'uJ0huVVfAH', 'fPpvRJt8C8@gmail.com', NULL, '$2y$10$.i9/RAZ8apIsKby0W5hMluFdq/8wSin/XSWEZliuCSdDFAyAXs1em', NULL, NULL, NULL),
	(18, 'CgsPRgJ26g', 'ztF6bSYC6y@gmail.com', NULL, '$2y$10$erN13y6sgkDEJS48xGAk/OLFgtR7IZriXfXYS.FfRfkI1V8pGZi4y', NULL, NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
