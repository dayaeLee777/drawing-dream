-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: drawingdream_db
-- ------------------------------------------------------
-- Server version	5.7.35-log


--
-- Dumping data for table `school`
--

INSERT IGNORE INTO `school` (`id`, `school_code`,  `school_name`, `school_serial_no`,  `del_yn`) VALUES (_binary 'm®rL®§u,bÚ¶', 'D02', '역삼중학교', '7091444', false);

--
-- Dumping data for table `user`
--

INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `phone`, `del_yn`) VALUES 
(_binary "]H\'H_k:^Ì¯Q}",'박선생','teacherpark@korea.kr', '서울 강남구 가로수길 9 (신사동) 싸피빌딩 207호', '01070077777',false),
(_binary 'þvGP*G\âcjò','김선생', 'teacherkim@korea.kr', '서울 강남구 강남대로 302-2 (역삼동) 드로잉드림 1004호','01012345678',false);
INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `address_detail`, `phone`, `del_yn`) VALUES 
(_binary "]H\'H_k:^Ì¯Q}",'박선생','teacherpark@korea.kr', '서울 강남구 가로수길 9 (신사동) 싸피빌딩', '207호', '01070077777',false),
(_binary 'þvGP*G\âcjò','김선생', 'teacherkim@korea.kr', '서울 강남구 강남대로 302-2 (역삼동) 드로잉드림', '1004호','01012345678',false);

INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `parent_phone`, `phone`, `del_yn`) VALUES 
(_binary 'p·\ØR ¥L3k{t\r\Þ4K','이학생','student@naver.com', '서울 강남구 역삼로2길 5 (역삼동) 드드아파트 1동 304호', '01099990000','01082828282', false);
INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `address_detail`, `parent_phone`, `phone`, `del_yn`) VALUES 
(_binary 'p·\ØR ¥L3k{t\r\Þ4K','이학생','student@naver.com', '서울 강남구 역삼로2길 5 (역삼동) 드드아파트', '1동 304호', '01099990000','01082828282', false);

--
-- Dumping data for table `user_department`
--

INSERT IGNORE INTO `user_department` (`id`, `grade_code`, `class_code`, `user_code`, `approval_code`, `del_yn`, `user_id`, `school_id`) VALUES 
(_binary 'IbVEIº¯\ëo6\ä\rz','E01','F02','A03','N01',false,_binary 'þvGP*G\âcjò',_binary 'm®rL®§u,bÚ¶'),
(_binary 'ô\äõYJz\ÄÐZG¨','E03','F07','A03','N01',false,_binary ']H\'H_k:^Ì¯Q}',_binary 'm®rL®§u,bÚ¶');

INSERT IGNORE INTO `user_department` (`id`, `grade_code`, `class_code`, `student_no`, `user_code`, `approval_code`, `del_yn`, `user_id`, `school_id`) VALUES 
(_binary '\'\ÑJ7MF°\êHXµ','E03','F07',20,'A04','N01',false,_binary 'p·\ØR ¥L3k{t\r\Þ4K',_binary 'm®rL®§u,bÚ¶');

--
-- Dumping data for table `auth`
--

INSERT IGNORE INTO `auth` (`id`, `password`, `login_id`, `del_yn`, `user_id`) VALUES 
(_binary 's6^úsO¸\0%\éõN_', '$2a$10$CccrWrI8rzJjoAwmmd6vDOQi0k8oQyvGKZV.f3aXGaiw2ceGlsQKC','teacherkim',false, _binary 'þvGP*G\âcjò'),
(_binary 'sô\Ðr\×+Il^¿\æ°','$2a$10$TX.qRwBQxT8L8rmNsjeKTeeGim5quJ.1WILLGlejzGGE5UYA8F4Ly','student01',false,_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¦e_\\\êPB±ö\ëN','$2a$10$d06erPTym15gQKLvPn.LBeujXcLIhYhKtdbs9xTIYOhfSoo6Wopg.','teacherpark',false,_binary "]H\'H_k:^Ì¯Q}");

--
-- Dumping data for table `course`
--

INSERT IGNORE INTO `course` (`id`, `subject_code`, `del_yn`, `user_id`) VALUES 
(_binary 'YCdñ¾\ÚMmõ& \Ï\Ï','G0700',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'k¢eZMHx\â\î®l\Þ','G0100',false,_binary 'þvGP*G\âcjò'),
(_binary 'K\Ñ5¤\ÊAt	\íK!#','G0200',false,_binary 'þvGP*G\âcjò'),
(_binary "BFµ\ÓOÚ²OGCõ6\'_",'G0600',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\ÄÆ Î\0L§¼SÁ\Ïñ','G0500',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'òeRLrK­\ìV\Éd','G0300',false,_binary 'þvGP*G\âcjò'),
(_binary 'ö\ë:}~B£\Ê5_¹\Ù]','G0802',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'ýdõ\èAº¯\ãk¶Jô]','G0801',false,_binary 'þvGP*G\âcjò');

--
-- Dumping data for table `period`
--

INSERT IGNORE INTO `period` VALUES 
(_binary 'ß\ÕnbI¹<|',0,'10:40:00','I02','09:55:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '5\á\àIc©YÊ\à\ß\Ô',0,'11:35:00','I03','10:50:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '@öºkðOiúµ¥R',0,'16:05:00','I07','15:20:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '@*c\ÃO´½\ï% Tg',0,'15:10:00','I06','14:25:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '®böCG¥v\×\èz³!1',0,'12:30:00','I04','11:45:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '´w¿zD³»¼§¢mÁ\Û',0,'09:45:00','I01','09:00:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '¾y´\ß*\îL¶Mo$\åÌ',0,'14:15:00','I05','13:30:00',_binary 'm®rL®§u,bÚ¶'),
(_binary 'ýo	J@\0þYõ\Ã3',0,'09:00:00','I00','08:30:00',_binary 'm®rL®§u,bÚ¶');

--
-- Dumping data for table `calendar`
--
INSERT IGNORE INTO `calendar`  VALUES 
(_binary '\0ñ\ï¸gBV©°+\×e\\\á£','J10',0,'2022-12-08','E03','O02','2022-12-07','J1002',_binary 'm®rL®§u,bÚ¶'),
(_binary '·e\ìLHð>\í[¨\ïN','J03',0,'2022-07-15','E00','O01','2022-07-15',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary ':/(\ÊNî¼@,Ù¿\Ã','J07',0,'2022-10-25','E02','O02','2022-10-23',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary 'K\Ì\ìGº@u\Ë\Ó\Ñ','J10',0,'2022-07-05','E02','O01','2022-07-04','J1002',_binary 'm®rL®§u,bÚ¶'),
(_binary 'F\Ò\nEN¿6Á*\\','J08',0,'2022-10-25','E01','O02','2022-10-23',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary '3v\ZG~±÷7Ç','J09',0,'2022-12-28','E02','O02','2022-12-28',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary ':õD~G@ý*\Ìz','J05',0,'2022-05-04','E00','O01','2022-05-04',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary ';¹Ò¹\ÍG¬®ö§4L1ú','J01',0,'2022-03-02','E00','O01','2022-03-02',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary '>\0¿\ÆbzEÜAT\â`','J10',0,'2022-10-05','E03','O02','2022-10-04','J1001',_binary 'm®rL®§u,bÚ¶'),
(_binary 'P_a´¼\'@¦´\Þ\çªU\Þ','J09',0,'2022-12-28','E01','O02','2022-12-28',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary "Zæ®¨K\ÅZ1\" ",'J02',0,'2022-12-28','E03','O02','2022-12-28',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary 'a3D-_GÁ²6\ëüü£','J10',0,'2022-04-28','E02','O01','2022-04-27','J1001',_binary 'm®rL®§u,bÚ¶'),
(_binary 'x\ËúõBBp,\ï\ÂOt','J10',0,'2022-12-08','E02','O02','2022-12-07','J1002',_binary 'm®rL®§u,bÚ¶'),
(_binary 'f	$WDÀ¾÷Æ\'¡%,','J10',0,'2022-04-28','E03','O01','2022-04-27','J1001',_binary 'm®rL®§u,bÚ¶'),
(_binary '£]£Ó­N[²m,B\ÐK','J10',0,'2022-07-05','E03','O01','2022-07-04','J1002',_binary 'm®rL®§u,bÚ¶'),
(_binary '»0¥®¬G\nFcN\îs\Ñ\Ã','J06',0,'2022-05-13','E00','O01','2022-05-13',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary '\ç®úZüN\ê)FD!º','J10',0,'2022-10-05','E02','O02','2022-10-04','J1001',_binary 'm®rL®§u,bÚ¶'),
(_binary '\íUó.d\ÎKH©\'üÛ','J04',0,'2022-08-08','E00','O02','2022-08-08',NULL,_binary 'm®rL®§u,bÚ¶'),
(_binary 'õ¢\ä$Iµ9\ÂÿSWõ','J07',0,'2022-10-25','E03','O02','2022-10-23',NULL,_binary 'm®rL®§u,bÚ¶');


--
-- Dumping data for table `score`
--

INSERT IGNORE INTO `score` VALUES 
(_binary '\0D9¦wK\ë\ØZ\á=«Ô',0,'E01',96,'O02','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\0µù!Jr°§\×?\Ñ\n',0,'E01',92,'O02','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'sqF\n¢\Äö$\Ý',0,'E01',98,'O01','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\"¢0ñQ@Ç¥Á\ïF\ì\"\Ó',0,'E02',78,'O01','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '&¡\Å[5I¶»\íSÓ½¦',0,'E01',100,'O01','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary ',û-a/:E,\Íy÷u',0,'E01',93,'O01','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '2\Ü|\nYD9¢4/Iø\Ô',0,'E02',88,'O01','G0100','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'AY}*E)B¥¿\'\Ô\'X\È',0,'E02',100,'O01','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'A²øµD­j2\Ðû',0,'E01',80,'O02','G0100','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'CsÆ¿¨IM¢»+hJÛ',0,'E02',100,'O01','G0500','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'F!§QòIA¼°\Í\å¨a4\Ç',0,'E01',100,'O01','G0500','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Rq¢\Ó\ÇDÌ¤\Ï#\ì\á',0,'E01',89,'O01','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'S}P7öGiª<^\\û',0,'E02',85,'O02','G0500','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'SRGLº>\ãôa\í\Î',0,'E01',95,'O02','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'V26QB9¬7b¤\Ã^\'',0,'E01',88,'O01','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'WRs\Î@ýa\Í-\Øõð',0,'E01',78,'O01','G0100','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '^ZH$/IN\Ýu¢cH<',0,'E02',96,'O02','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '^b9MFL£Àe¤:¼»',0,'E02',92,'O01','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '`5/Â þDWA=©\Û',0,'E01',90,'O01','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ia-¹Ø¯O5´ú9\åS8',0,'E01',100,'O02','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'j4iq¬K2\å\æø4Y/',0,'E02',85,'O01','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 't¤\ÇyeHý±yYi3O	',0,'E01',94,'O02','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'x{µqËJ&x¿\Òð\ê',0,'E02',84,'O02','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'z-G\×8Kyü]}\Ö]',0,'E02',98,'O02','G0100','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '}\ÑkUõ\ÇA­_ÿM\Z\Ã',0,'E01',80,'O01','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary ' N\ëN×¿NE\å\'\Ï',0,'E02',85,'O02','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'µf\êH¸¸®ñú\n',0,'E02',86,'O02','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Þþ\Îu\ïC-v5\ÛFõñ\Ø',0,'E01',100,'O02','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'AÇ³\ÊGöªz\Ý\ÐXutX',0,'E01',100,'O02','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¯YÀ9H\0»\'@\ÔÛ°',0,'E01',76,'O01','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '½\ã\Ýô1N\ìôG5\ÈF\É',0,'E02',80,'O01','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Åj\îÛ¯\nE\çDµ\\Ø¯ =',0,'E01',75,'O02','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Ñ+Q\Ë\çJn¶\Íöü@\Û',0,'E02',80,'O01','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\ÔÁ¢<yqC&¥t\0\à7\0',0,'E02',82,'O02','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Õ®o\Ób:@i\ÛCl¥\Ü',0,'E02',88,'O02','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Ö·.NØ³O8³!L÷',0,'E02',72,'O01','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Ùô¥\ÕJtD6£2\àK6\Ë$',0,'E02',92,'O02','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\á\èT\Ð\'þGÁ­v\ß\Z\"\ß4U',0,'E01',95,'O02','G0500','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ú@®¹O\áoSP\0~',0,'E02',97,'O02','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ýÓ\Ð\êG¹¾}ðbð0a',0,'E02',74,'O01','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K');


-- Dump completed on 2022-01-29 17:08:5