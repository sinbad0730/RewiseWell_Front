/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100428
 Source Host           : localhost:3306
 Source Schema         : dan_education_1

 Target Server Type    : MySQL
 Target Server Version : 100428
 File Encoding         : 65001

 Date: 21/08/2024 18:57:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for device_token_entity
-- ----------------------------
DROP TABLE IF EXISTS `device_token_entity`;
CREATE TABLE `device_token_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `device_uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `device_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `device_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device_token_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_answer_detail_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_answer_detail_entity`;
CREATE TABLE `exam_answer_detail_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `question_detail_id` int NOT NULL,
  `answer_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_answer_detail_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_answer_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_answer_entity`;
CREATE TABLE `exam_answer_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `student_id` int NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_answer_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_answer_score_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_answer_score_entity`;
CREATE TABLE `exam_answer_score_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `score` int NOT NULL,
  `feedback` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `answer_detail_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_answer_score_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_board_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_board_entity`;
CREATE TABLE `exam_board_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_board_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_category_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_category_entity`;
CREATE TABLE `exam_category_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `board_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_category_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_question_detail_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_question_detail_entity`;
CREATE TABLE `exam_question_detail_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mark_schemes` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `max_mark` int NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `exam_question_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_question_detail_entity
-- ----------------------------

-- ----------------------------
-- Table structure for exam_question_entity
-- ----------------------------
DROP TABLE IF EXISTS `exam_question_entity`;
CREATE TABLE `exam_question_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_by_id` int NOT NULL,
  `updated_by_id` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `category_id` int NOT NULL,
  `teacher_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_question_entity
-- ----------------------------

-- ----------------------------
-- Table structure for notification_entity
-- ----------------------------
DROP TABLE IF EXISTS `notification_entity`;
CREATE TABLE `notification_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deep_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NULL DEFAULT NULL,
  `read_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification_entity
-- ----------------------------

-- ----------------------------
-- Table structure for permission_entity
-- ----------------------------
DROP TABLE IF EXISTS `permission_entity`;
CREATE TABLE `permission_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `action` enum('manage','create','read','update','delete') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'read',
  `object` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission_entity
-- ----------------------------

-- ----------------------------
-- Table structure for role_entity
-- ----------------------------
DROP TABLE IF EXISTS `role_entity`;
CREATE TABLE `role_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_entity
-- ----------------------------

-- ----------------------------
-- Table structure for role_entity_permissions_permission_entity
-- ----------------------------
DROP TABLE IF EXISTS `role_entity_permissions_permission_entity`;
CREATE TABLE `role_entity_permissions_permission_entity`  (
  `role_entity_id` int NOT NULL,
  `permission_entity_id` int NOT NULL,
  PRIMARY KEY (`role_entity_id`, `permission_entity_id`) USING BTREE,
  INDEX `IDX_98bfad28276e5fcb9ebb583de6`(`role_entity_id`) USING BTREE,
  INDEX `IDX_93bdf3fe7af260b8d9bf6e89d6`(`permission_entity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_entity_permissions_permission_entity
-- ----------------------------

-- ----------------------------
-- Table structure for student_entity
-- ----------------------------
DROP TABLE IF EXISTS `student_entity`;
CREATE TABLE `student_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_5f42e2722c0df38a5e10ea3954`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_entity
-- ----------------------------
INSERT INTO `student_entity` VALUES (1, '2024-08-18 10:56:13.520601', '2024-08-18 10:56:13.520601', NULL, 1);

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects`  (
  `subject_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subject_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `grade_retrieval_grade_retrieval_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES ('10', 'History', NULL);
INSERT INTO `subjects` VALUES ('11', 'Geography', NULL);
INSERT INTO `subjects` VALUES ('12', 'English Literature', NULL);
INSERT INTO `subjects` VALUES ('13', 'Economics', NULL);
INSERT INTO `subjects` VALUES ('5', 'Mathematics', NULL);
INSERT INTO `subjects` VALUES ('6', 'English Language', NULL);
INSERT INTO `subjects` VALUES ('7', 'Double Science', NULL);
INSERT INTO `subjects` VALUES ('8', 'Chemistry', NULL);
INSERT INTO `subjects` VALUES ('9', 'Physics', NULL);

-- ----------------------------
-- Table structure for teacher_entity
-- ----------------------------
DROP TABLE IF EXISTS `teacher_entity`;
CREATE TABLE `teacher_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_a1f98b17e20b1ddfd1e67a69af`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_entity
-- ----------------------------

-- ----------------------------
-- Table structure for think_entity
-- ----------------------------
DROP TABLE IF EXISTS `think_entity`;
CREATE TABLE `think_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `point` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `linestring` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of think_entity
-- ----------------------------

-- ----------------------------
-- Table structure for units
-- ----------------------------
DROP TABLE IF EXISTS `units`;
CREATE TABLE `units`  (
  `unit_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `unit_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `scores` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subject_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of units
-- ----------------------------
INSERT INTO `units` VALUES ('1', 'Data Representation', '1', '87, 85, 29', '1', 1);
INSERT INTO `units` VALUES ('2', 'Communication and Internet Technologies', '1', '87, 85, 29', '1', 2);
INSERT INTO `units` VALUES ('3', 'Hardware and Software', '1', '87, 85, 29', '1', 3);
INSERT INTO `units` VALUES ('4', 'Security', '1', '87, 85, 29', '1', 4);
INSERT INTO `units` VALUES ('5', 'Ethics', '1', '87, 85, 29', '1', 5);
INSERT INTO `units` VALUES ('6', 'Algorithm Design and Problem-Solving', '1', '87, 85, 29', '1', 6);
INSERT INTO `units` VALUES ('7', 'Programming', '1', '87, 85, 29', '1', 7);
INSERT INTO `units` VALUES ('8', 'Databases', '1', '87, 85, 29', '1', 8);
INSERT INTO `units` VALUES ('9', 'Boolean Logic', '1', '87, 85, 29', '1', 9);
INSERT INTO `units` VALUES ('10', 'The Internet of Everything', '1', '87, 85, 29', '1', 10);
INSERT INTO `units` VALUES ('1', 'Anatomy and Physiology', '1', '87, 85, 29', '2', 11);
INSERT INTO `units` VALUES ('2', 'Movement Analysis', '1', '87, 85, 29', '2', 12);
INSERT INTO `units` VALUES ('3', 'Physical Training', '1', '87, 85, 29', '2', 13);
INSERT INTO `units` VALUES ('4', 'Sport Psychology', '1', '87, 85, 29', '2', 14);
INSERT INTO `units` VALUES ('5', 'Socio-Cultural Influences', '1', '87, 85, 29', '2', 15);
INSERT INTO `units` VALUES ('6', 'Health, Fitness, and Wellbeing', '1', '87, 85, 29', '2', 16);
INSERT INTO `units` VALUES ('7', 'Applied Anatomy and Physiology', '1', '87, 85, 29', '2', 17);
INSERT INTO `units` VALUES ('8', 'Movement Skills', '1', '87, 85, 29', '2', 18);
INSERT INTO `units` VALUES ('9', 'Performance Analysis', '1', '87, 85, 29', '2', 19);
INSERT INTO `units` VALUES ('10', 'Practical Performance', '1', '87, 85, 29', '2', 20);
INSERT INTO `units` VALUES ('1', 'Cell Biology', '1', '87, 85, 29', '3', 21);
INSERT INTO `units` VALUES ('2', 'Genetics', '1', '87, 85, 29', '3', 22);
INSERT INTO `units` VALUES ('3', 'Ecology', '1', '87, 85, 29', '3', 23);
INSERT INTO `units` VALUES ('4', 'Evolution', '1', '87, 85, 29', '3', 24);
INSERT INTO `units` VALUES ('5', 'Human Biology', '1', '87, 85, 29', '3', 25);
INSERT INTO `units` VALUES ('6', 'Plant Biology', '1', '87, 85, 29', '3', 26);
INSERT INTO `units` VALUES ('7', 'Microorganisms', '1', '87, 85, 29', '3', 27);
INSERT INTO `units` VALUES ('8', 'Homeostasis', '1', '87, 85, 29', '3', 28);
INSERT INTO `units` VALUES ('9', 'Biochemistry', '1', '87, 85, 29', '3', 29);
INSERT INTO `units` VALUES ('10', 'Reproduction', '1', '87, 85, 29', '3', 30);
INSERT INTO `units` VALUES ('1', 'Business Activity', '1', '87, 85, 29', '4', 31);
INSERT INTO `units` VALUES ('2', 'Human Resources', '1', '87, 85, 29', '4', 32);
INSERT INTO `units` VALUES ('3', 'Marketing', '1', '87, 85, 29', '4', 33);
INSERT INTO `units` VALUES ('4', 'Finance', '1', '87, 85, 29', '4', 34);
INSERT INTO `units` VALUES ('5', 'Operations Management', '1', '87, 85, 29', '4', 35);
INSERT INTO `units` VALUES ('6', 'Business Strategy', '1', '87, 85, 29', '4', 36);
INSERT INTO `units` VALUES ('7', 'External Environment', '1', '87, 85, 29', '4', 37);
INSERT INTO `units` VALUES ('8', 'Business Ethics', '1', '87, 85, 29', '4', 38);
INSERT INTO `units` VALUES ('9', 'Enterprise', '1', '87, 85, 29', '4', 39);
INSERT INTO `units` VALUES ('10', 'Globalization', '1', '87, 85, 29', '4', 40);
INSERT INTO `units` VALUES ('1', 'Number', '1', '87, 85, 29', '5', 41);
INSERT INTO `units` VALUES ('2', 'Algebra', '1', '87, 85, 29', '5', 42);
INSERT INTO `units` VALUES ('3', 'Geometry', '1', '87, 85, 29', '5', 43);
INSERT INTO `units` VALUES ('4', 'Trigonometry', '1', '87, 85, 29', '5', 44);
INSERT INTO `units` VALUES ('5', 'Statistics', '1', '87, 85, 29', '5', 45);
INSERT INTO `units` VALUES ('6', 'Probability', '1', '87, 85, 29', '5', 46);
INSERT INTO `units` VALUES ('7', 'Calculus', '1', '87, 85, 29', '5', 47);
INSERT INTO `units` VALUES ('8', 'Vectors', '1', '87, 85, 29', '5', 48);
INSERT INTO `units` VALUES ('9', 'Matrices', '1', '87, 85, 29', '5', 49);
INSERT INTO `units` VALUES ('10', 'Number Theory', '1', '87, 85, 29', '5', 50);

-- ----------------------------
-- Table structure for user_entity
-- ----------------------------
DROP TABLE IF EXISTS `user_entity`;
CREATE TABLE `user_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `credit` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `role_id` int NULL DEFAULT NULL,
  `refresh_token` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_entity
-- ----------------------------
INSERT INTO `user_entity` VALUES (1, '2024-08-18 10:56:13.453402', '2024-08-18 10:58:12.000000', NULL, 'admin', '$2a$10$DhIpre9UOzxSKA5qQdd4Rurwt.YlfVvzge.2Z2/wydrhmi6AN0Vuy', 'admin@admin.com', NULL, 'test', 'test', 0, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcyMzk0NjI5MiwiZXhwIjoxNzI2NTM4MjkyfQ.nECyzSM34bVyOl3h9sxUjwEdkTXN5mjBdqnXnpEEW9w');

SET FOREIGN_KEY_CHECKS = 1;
