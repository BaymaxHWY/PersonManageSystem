-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-06-05 12:29:52
-- 服务器版本： 5.7.21
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keshe`
--

-- --------------------------------------------------------

--
-- 表的结构 `depart`
--

CREATE TABLE `depart` (
  `depart_id` int(11) NOT NULL,
  `depart_name` varchar(50) NOT NULL,
  `depart_master` varchar(50) NOT NULL,
  `depart_desc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `depart`
--

INSERT INTO `depart` (`depart_id`, `depart_name`, `depart_master`, `depart_desc`) VALUES
(1, '市场部', '吴恕', '市场调查、推广'),
(2, '生活部', '郭浩', '做饭'),
(3, '研发部', '眼视力', '2222'),
(4, '人事部', '谢永腾', '112'),
(5, '财政部', '赋权', '1111');

-- --------------------------------------------------------

--
-- 表的结构 `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `user` varchar(120) NOT NULL,
  `ip` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_desc` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `log`
--

INSERT INTO `log` (`id`, `user`, `ip`, `date`, `user_desc`) VALUES
(1, 'admin', '127.0.0.1:3000', '2018-06-05 11:22:07', '添加招聘信息'),
(2, 'admin', '127.0.0.1:3000', '2018-06-05 11:22:48', '修改或添加新部门'),
(3, 'admin', '127.0.0.1:3000', '2018-06-05 11:22:55', '修改或添加公司职员'),
(4, 'admin', '127.0.0.1:3000', '2018-06-05 11:23:02', '修改或添加培训项目'),
(5, 'admin', '127.0.0.1:3000', '2018-06-05 11:23:08', '修改或添加奖惩记录'),
(6, 'admin', '127.0.0.1:3000', '2018-06-05 11:23:14', '删除公司职员'),
(7, 'admin', '127.0.0.1:3000', '2018-06-05 12:14:04', '删除部门'),
(8, 'admin', '127.0.0.1:3000', '2018-06-05 12:14:17', '删除招聘信息'),
(9, 'admin', '127.0.0.1:3000', '2018-06-05 12:14:23', '删除培训项目');

-- --------------------------------------------------------

--
-- 表的结构 `recruit`
--

CREATE TABLE `recruit` (
  `recruit_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `intent_depart` varchar(120) NOT NULL,
  `intent_position` varchar(120) NOT NULL,
  `tel` int(20) NOT NULL,
  `qq` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `recruit`
--

INSERT INTO `recruit` (`recruit_id`, `name`, `intent_depart`, `intent_position`, `tel`, `qq`) VALUES
(8, '张五', '研发部', '组长', 123213, 321321),
(9, '赵四', '研发部', '组长', 12321, 321312),
(10, '妇权', '人事部', '普通员工', 1321, 21321);

-- --------------------------------------------------------

--
-- 表的结构 `reward_punish`
--

CREATE TABLE `reward_punish` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `money` int(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `reward_punish`
--

INSERT INTO `reward_punish` (`id`, `name`, `type`, `money`) VALUES
(2, '福泉', '惩罚', 2222),
(3, '谢泳腾', '奖励', 200),
(6, '吴恕', '奖励', 2),
(7, '郭好', '惩罚', 222),
(9, '谢泳腾', '奖励', 11);

-- --------------------------------------------------------

--
-- 表的结构 `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `position` varchar(120) NOT NULL,
  `depart` varchar(120) NOT NULL,
  `money` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `staff`
--

INSERT INTO `staff` (`staff_id`, `name`, `position`, `depart`, `money`) VALUES
(6, '吴恕', '副经理', '生活部', 8000),
(7, '谢泳腾', '主管', '财政部', 5000),
(10, '福泉', '普通员工', '生活部', 2000),
(13, '赋权', '组长', '财政部', 3000);

-- --------------------------------------------------------

--
-- 表的结构 `system`
--

CREATE TABLE `system` (
  `system_id` int(11) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `system`
--

INSERT INTO `system` (`system_id`, `username`, `password`) VALUES
(1, 'admin', 'admin123'),
(2, 'admin2', 'admin');

-- --------------------------------------------------------

--
-- 表的结构 `train`
--

CREATE TABLE `train` (
  `id` int(11) NOT NULL,
  `train_name` varchar(120) NOT NULL,
  `train_place` varchar(120) NOT NULL,
  `train_num` int(20) NOT NULL,
  `train_dates` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `train`
--

INSERT INTO `train` (`id`, `train_name`, `train_place`, `train_num`, `train_dates`) VALUES
(11, 'javascript', '逸夫楼108', 100, '2018-06-05'),
(12, 'ps', '草坪', 23, '2018-06-12'),
(13, 'word', '教室101', 44, '2018-06-07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `depart`
--
ALTER TABLE `depart`
  ADD PRIMARY KEY (`depart_id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recruit`
--
ALTER TABLE `recruit`
  ADD PRIMARY KEY (`recruit_id`);

--
-- Indexes for table `reward_punish`
--
ALTER TABLE `reward_punish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`system_id`);

--
-- Indexes for table `train`
--
ALTER TABLE `train`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `depart`
--
ALTER TABLE `depart`
  MODIFY `depart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `recruit`
--
ALTER TABLE `recruit`
  MODIFY `recruit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `reward_punish`
--
ALTER TABLE `reward_punish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `system`
--
ALTER TABLE `system`
  MODIFY `system_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `train`
--
ALTER TABLE `train`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
