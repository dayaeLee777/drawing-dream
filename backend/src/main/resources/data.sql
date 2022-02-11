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


INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `address_detail`, `phone`, `del_yn`) VALUES 
(_binary "]H\'H_k:^Ì¯Q}",'이승윤','teacherpark@korea.kr', '서울 강남구 가로수길 9 (신사동) 싸피빌딩', '207호', '01070077777',false),
(_binary 'þvGP*G\âcjò','안희경', 'teacherkim@korea.kr', '서울 강남구 강남대로 302-2 (역삼동) 드로잉드림', '1004호','01012345678',false),
(_binary 'b¢Q>³KF£´dNxÎ','당현아','dang@naver.com','서울 강남구 가로수길 5 (신사동)', '201동 706호', '01089512235',false);

INSERT IGNORE INTO `user` (`id`, `user_name`, `user_email`, `address`, `address_detail`, `parent_phone`, `phone`, `del_yn`) VALUES 
(_binary 'p·\ØR ¥L3k{t\r\Þ4K','박기범','student@naver.com', '서울 강남구 역삼로2길 5 (역삼동) 드드아파트', '1동 304호', '01099990000','01082828282', false),
(_binary '|û<aO\â®¸Ù½\Õü','손창현','sonchanghyun@naver.com','서울 마포구 가양대로 1 (상암동)','101동 1006호','01089651852','01034561985', false),
(_binary '\\A\×2\Ä@Í¼FóHu*\n','이다예','leedaye@naver.com','서울 마포구 마포대로 108 (공덕동)','308동 805호','01085497852','01045782398', false);

--
-- Dumping data for table `user_department`
--

INSERT IGNORE INTO `user_department` (`id`, `grade_code`, `class_code`, `user_code`, `approval_code`, `del_yn`, `user_id`, `school_id`) VALUES 
(_binary 'IbVEIº¯\ëo6\ä\rz','E01','F02','A03','N01',false,_binary 'þvGP*G\âcjò',_binary 'm®rL®§u,bÚ¶'),
(_binary 'ô\äõYJz\ÄÐZG¨','E03','F07','A03','N01',false,_binary ']H\'H_k:^Ì¯Q}',_binary 'm®rL®§u,bÚ¶'),
(_binary '/»½\ÜH±¬=\Æ9','E02','F05','A03','N01',false,_binary 'b¢Q>³KF£´dNxÎ',_binary 'm®rL®§u,bÚ¶');

INSERT IGNORE INTO `user_department` (`id`, `grade_code`, `class_code`, `student_no`, `user_code`, `approval_code`, `del_yn`, `user_id`, `school_id`) VALUES 
(_binary '\'\ÑJ7MF°\êHXµ','E03','F07',20,'A04','N01',false,_binary 'p·\ØR ¥L3k{t\r\Þ4K',_binary 'm®rL®§u,bÚ¶'),
(_binary '; 1©rA©¾F\ã\nFÿ','E03','F07',2,'A04','N01',false,_binary '|û<aO\â®¸Ù½\Õü',_binary 'm®rL®§u,bÚ¶'),
(_binary '\Õmè®!D7|ý]£','E03','F07',1,'A04','N01',false,_binary '\\A\×2\Ä@Í¼FóHu*\n',_binary 'm®rL®§u,bÚ¶');


--
-- Dumping data for table `auth`
--

INSERT IGNORE INTO `auth` (`id`, `password`, `login_id`, `del_yn`, `user_id`) VALUES 
(_binary 's6^úsO¸\0%\éõN_', '$2a$10$CccrWrI8rzJjoAwmmd6vDOQi0k8oQyvGKZV.f3aXGaiw2ceGlsQKC','teacherkim',false, _binary 'þvGP*G\âcjò'),
(_binary 'sô\Ðr\×+Il^¿\æ°','$2a$10$TX.qRwBQxT8L8rmNsjeKTeeGim5quJ.1WILLGlejzGGE5UYA8F4Ly','student01',false,_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¦e_\\\êPB±ö\ëN','$2a$10$d06erPTym15gQKLvPn.LBeujXcLIhYhKtdbs9xTIYOhfSoo6Wopg.','teacherpark',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary '3\Ò\Ñg\ëKý­-Joÿ÷','$2a$10$qh1KBbPQrPkfhxOe8kTACOou9X9LvoI5bB0GK8zfbxwVdS3brh4zS','student03',false,_binary '\\A\×2\Ä@Í¼FóHu*\n'),
(_binary '\à7lW7A,±_z[I\ë_','$2a$10$F7eNu1uz9kOCOC2ZKIBl8OTdueuEIg7wcQHBQOodrJAeLMkq/ZMn.','teacherdang',false,_binary 'b¢Q>³KF£´dNxÎ');

--
-- Dumping data for table `course`
--

INSERT IGNORE INTO `course` (`id`, `subject_code`, `del_yn`, `user_id`) VALUES 
(_binary 'k¢eZMHx\â\î®l\Þ','G0100',false,_binary 'þvGP*G\âcjò'),
(_binary 'K\Ñ5¤\ÊAt	\íK!#','G0200',false,_binary 'þvGP*G\âcjò'),
(_binary 'òeRLrK­\ìV\Éd','G0300',false,_binary 'þvGP*G\âcjò'),
(_binary 'ðÕ1w)F j0V×','G0400',false,_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '\ÄÆ Î\0L§¼SÁ\Ïñ','G0500',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary '/;U\âD\ãBÒ {C3Ý','G0503',false,_binary 'b¢Q>³KF£´dNxÎ'),
(_binary "BFµ\ÓOÚ²OGCõ6\'_",'G0600',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'YCdñ¾\ÚMmõ& \Ï\Ï','G0700',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'ýdõ\èAº¯\ãk¶Jô]','G0801',false,_binary 'þvGP*G\âcjò'),
(_binary 'ö\ë:}~B£\Ê5_¹\Ù]','G0802',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'B\â¿Pw^JfÍ]6·\Ü+','G0900',false,_binary ']ÂHÂ\'H_Âk:^\Ã'),
(_binary '¨­KJ¿ª/PJ£\é','G1006',false,_binary 'b¢Q>³KF£´dNxÎ'),
(_binary 'µ)Wy\0HºûTN','G1001',false,_binary 'b¢Q>³KF£´dNxÎ'),
(_binary 'B\â¿Pw^JfÍ]6·\Ü+','G0900',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\íaò%Er¤  \Ö÷\âÁ.','G1100',false,_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\íaò%Er¤  \Ö÷\âÁ.','G1100',false,_binary 'Ã¾vGÂP*GÃ¢Âc\Â');

--
-- Dumping data for table `period`
--

INSERT IGNORE INTO `period` VALUES 
(_binary 'ß\ÕnbI¹<|',0,'10:40:00','I02','09:55:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '5\á\àIc©YÊ\à\ß\Ô',0,'11:35:00','I03','10:50:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '@öºkðOiúµ¥R',0,'16:05:00','I07','15:20:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '@*c\ÃO´½\ï% Tg',0,'15:10:00','I06','14:25:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '®böCG¥v\×\èz³!1',0,'12:30:00','I04','11:45:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '´w¿zD³»¼§¢mÁ\Û',0,'09:45:00','I01','09:00:00',_binary 'm®rL®§u,bÚ¶'),
(_binary '¾y´\ß*\îL¶Mo$\åÌ',0,'14:15:00','I05','13:30:00',_binary 'm®rL®§u,bÚ¶'),
(_binary 'ýo	J@\0þYõ\Ã3',0,'09:00:00','I00','08:30:00',_binary 'm®rL®§u,bÚ¶');

--
-- Dumping data for table `time_table`
--

INSERT IGNORE INTO `time_table` (`id`, `day_code`, `del_yn`, `period_code`, `semester_code`,`course_id`, `user_id`) VALUES 

(_binary 'ºc7.EÛ¡\Ñr©z\É','H01',_binary '\0','I01','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '8\Ö}XðDu½»ò#ÿ\ß+\n','H01',_binary '\0','I02','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\'|[Ó»Jh§­3\ì¾\Êo ','H01',_binary '\0','I03','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\ê{t$M» F,ùiý\Ì','H01',_binary '\0','I04','O01',_binary 'YCdñ¾\ÚMmõ& \Ï\Ï',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¬q\îb\×F¦¡;ª\Â\ä7','H01',_binary '\0','I05','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\î\ÐF§wN®\És/X]','H01',_binary '\0','I06','O01',_binary 'µ)Wy\0HºûTN',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '÷\äGWLQJ¼\ÖnV\Ã4\î','H01',_binary '\0','I07','O01',_binary 'ðÕ1w)F j0V×',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),

(_binary '^\ÒDÊº\ßB2¼¿º\r<õ±','H02',_binary '\0','I01','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'T\Å\r#Ol|ù\æ´\Õ','H02',_binary '\0','I02','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\ÜÁ9ÑD~ªP-\ë@k\Û','H02',_binary '\0','I03','O01',_binary 'B\â¿Pw^JfÍ]6·\Ü+',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'K³N5~Cï5i8','H02',_binary '\0','I04','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '»ü`@@\à³Ý\æ5Ò','H02',_binary '\0','I05','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\ì\ï\ë{\Ï\\Jaû$','H02',_binary '\0','I06','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ú\éae@S¼)h\ÕD\ÏV','H02',_binary '\0','I07','O01',_binary '/;U\âD\ãBÒ {C3Ý',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),

(_binary 's\ìuöAÁ¹v^¹m	','H03',_binary '\0','I01','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¸;=N÷ù¥`^õ\Ê|','H03',_binary '\0','I02','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Ï\î\ÔzªB£­\ÂBÀ\rP','H03',_binary '\0','I03','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'þ	\Â-Gaªª~Kb\Ô[','H03',_binary '\0','I04','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Á		©seO9£R','H03',_binary '\0','I05','O01',_binary 'ðÕ1w)F j0V×',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'uS($@éWQ?uû','H03',_binary '\0','I06','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Ü ©µ«E¡´\ïW¼s','H03',_binary '\0','I07','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),

(_binary '¶`8i­H¶¤\Ö\0\ë1¦','H04',_binary '\0','I01','O01',_binary 'YCdñ¾\ÚMmõ& \Ï\Ï',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '-\0\ãMC`NÃ¥\\p\"T/ª¾','H04',_binary '\0','I02','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'X@XN·K\ë\ãVø\Ó','H04',_binary '\0','I03','O01',_binary 'ðÕ1w)F j0V×',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'cðQ½I3u\ÅDR','H04',_binary '\0','I04','O01',_binary 'ýdõ\èAº¯\ãk¶Jô]',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Ý`ºI!¸fw`4','H04',_binary '\0','I05','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'º\ÆÖªS»Cºör:F ','H04',_binary '\0','I06','O01',_binary '/;U\âD\ãBÒ {C3Ý',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '0LñO\ÌB\ç·\Ó³j ','H04',_binary '\0','I07','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary 'p·\ØR ¥L3k{t\r\Þ4K'),

(_binary '¿\ßÁ÷@:2À®\åvZ6','H05',_binary '\0','I01','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Í\ÆÜ;\èLD»c\àH¯\Ä)','H05',_binary '\0','I02','O01',_binary 'ýdõ\èAº¯\ãk¶Jô]',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ø¾´\íO£¯Q\Ûa÷À\ä','H05',_binary '\0','I03','O01',_binary '¨­KJ¿ª/PJ£\é',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'bo´­DA§M®\Ï','H05',_binary '\0','I04','O01',_binary 'ðÕ1w)F j0V×',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '^\è\ÖÃLö¡k´e\Üb','H05',_binary '\0','I05','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '§9{PªD\â¸û0\r«','H05',_binary '\0','I06','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'd}£ûFï´º\n\ãÊ¦>','H05',_binary '\0','I07','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '´fV²ZCe­Ft\ß*ó','H05',_binary '\0','I08','O01',_binary 'B\â¿Pw^JfÍ]6·\Ü+',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '/\0^ú6\ÙD½\r\Ëyóp_\É','H05',_binary '\0','I09','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),


(_binary 'E.ðHw&´­[o^','H01',_binary '\0','I01','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'þvGP*G\âcjò'),
(_binary '%	6E¬¯\noY*\È','H01',_binary '\0','I02','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'þvGP*G\âcjò'),
(_binary '\àý.\nNÖ¢\ë_²\'×¹|','H01',_binary '\0','I03','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'þvGP*G\âcjò'),
(_binary '\r\ìN©O©¤\ÙÿH®','H01',_binary '\0','I04','O01',_binary 'YCdñ¾\ÚMmõ& \Ï\Ï',_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\Æ`Á[E´¶\ÉQCY3§8','H01',_binary '\0','I05','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary "]H\'H_k:^Ì¯Q}"),
(_binary '$\Ü\ë<\Ö6J\æ¶S]|\Äeoÿ','H01',_binary '\0','I06','O01',_binary 'µ)Wy\0HºûTN',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '0?/¯Ö·G;­Y\Z=\îF¯','H01',_binary '\0','I07','O01',_binary 'ðÕ1w)F j0V×',_binary 'b¢Q>³KF£´dNxÎ'),

(_binary '7ED<Kr\ï\Ö4³','H02',_binary '\0','I01','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'þvGP*G\âcjò'),
(_binary '8Jg×¶sL¢\×\ã\Ëw¶P','H02',_binary '\0','I02','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary "]H\'H_k:^Ì¯Q}"),
(_binary '8\î\ËR\ZKM(Y~b\èJ','H02',_binary '\0','I03','O01',_binary 'B\â¿Pw^JfÍ]6·\Ü+',_binary "]H\'H_k:^Ì¯Q}"),
(_binary '=\r\È\Ç<JEÿô»\Ñún','H02',_binary '\0','I04','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'þvGP*G\âcjò'),
(_binary 'R¦¹@\ã«WtV*','H02',_binary '\0','I05','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'U´M\äúJc4\ì\Æð°[0','H02',_binary '\0','I06','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'þvGP*G\âcjò'),
(_binary 'W¹öµLpJZ\ÃA\Ü','H02',_binary '\0','I07','O01',_binary '/;U\âD\ãBÒ {C3Ý',_binary 'b¢Q>³KF£´dNxÎ'),

(_binary 'h²D;@Å°N\â+E','H03',_binary '\0','I01','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'n~1÷Mk]P$ü\Ñ','H03',_binary '\0','I02','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'sÓ\ßOF\ìudYÑ','H03',_binary '\0','I03','O01',_binary 'òeRLrK­\ìV\Éd',_binary 'þvGP*G\âcjò'),
(_binary 'w©HDÛªN©4\ßÐ¿','H03',_binary '\0','I04','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'þvGP*G\âcjò'),
(_binary 'G\ÇüGñ¸\Ú&¥%\ã\ÚG','H03',_binary '\0','I05','O01',_binary 'ðÕ1w)F j0V×',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary 'ôF¹ðq\ÛLÂ\ç\êSÿQ =','H03',_binary '\0','I06','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'õ»Ï¡A/Jz£ý³YtHb','H03',_binary '\0','I07','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary "]H\'H_k:^Ì¯Q}"),

(_binary '¬Í¾XªI¹\Ðÿy\Â','H04',_binary '\0','I01','O01',_binary 'YCdñ¾\ÚMmõ& \Ï\Ï',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'ùDcºmAÕ\r)þ \è','H04',_binary '\0','I02','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'þvGP*G\âcjò'),
(_binary 'öFs6\ÈE÷ª±@BwI\ß','H04',_binary '\0','I03','O01',_binary 'ðÕ1w)F j0V×',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '§z\ç7\Z#H²ñ@lG\äß´','H04',_binary '\0','I04','O01',_binary 'ýdõ\èAº¯\ãk¶Jô]',_binary 'þvGP*G\âcjò'),
(_binary '¯D\ÊIz\áFQ\×\Ï','H04',_binary '\0','I05','O01',_binary 'k¢eZMHx\â\î®l\Þ',_binary 'þvGP*G\âcjò'),
(_binary '¶m<òK=¸Qlv\Ãý','H04',_binary '\0','I06','O01',_binary '/;U\âD\ãBÒ {C3Ý',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '·\rHCAtIÖd¡s-Z\î','H04',_binary '\0','I07','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary "]H\'H_k:^Ì¯Q}"),

(_binary '¿&C\éOª¯=Á$*W','H05',_binary '\0','I01','O01',_binary 'K\Ñ5¤\ÊAt	\íK!#',_binary 'þvGP*G\âcjò'),
(_binary 'Ã®ky\ÐMð\Ñöb\å','H05',_binary '\0','I02','O01',_binary 'ýdõ\èAº¯\ãk¶Jô]',_binary 'þvGP*G\âcjò'),
(_binary '\Ñ&\'ÐFºv¢ô¬ýJ','H05',_binary '\0','I03','O01',_binary '¨­KJ¿ª/PJ£\é',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '\ÛIºo3\ÖFkÖ»{u\Ê','H05',_binary '\0','I04','O01',_binary 'ðÕ1w)F j0V×',_binary 'b¢Q>³KF£´dNxÎ'),
(_binary '\ç\ËøGÀWJÈ­\Õº²(','H05',_binary '\0','I05','O01',_binary 'ö\ë:}~B£\Ê5_¹\Ù]',_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\èHÕ¡Kµ=eNO','H05',_binary '\0','I06','O01',_binary "BFµ\ÓOÚ²OGCõ6\'_",_binary "]H\'H_k:^Ì¯Q}"),
(_binary '\é_OôA)¤8\naQ','H05',_binary '\0','I07','O01',_binary '\ÄÆ Î\0L§¼SÁ\Ïñ',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'ê«5VFñµ¹}oa½_','H05',_binary '\0','I08','O01',_binary 'B\â¿Pw^JfÍ]6·\Ü+',_binary "]H\'H_k:^Ì¯Q}"),
(_binary 'ð-\"öj¥B M:R\Ã@&S','H05',_binary '\0','I09','O01',_binary '\íaò%Er¤  \Ö÷\âÁ.',_binary "]H\'H_k:^Ì¯Q}");

--(_binary 'ôF¹ðq\ÛLÂ\ç\êSÿQ =','H01',_binary '\0','I09','O01',_binary 'YCdÃ±Â¾ÃMmÂÃµ\Â',_binary "]H\'H_k:^Ì¯Q}"),
--(_binary 'õ»Ï¡A/Jz£ý³YtHb','H01',_binary '\0','I09','O01',_binary 'YCdÃ±Â¾ÃMmÂÃµ\Â',_binary "]H\'H_k:^Ì¯Q}"),
--(_binary 'ùô \åJf­8þr\Ã','H01',_binary '\0','I09','O01',_binary 'YCdÃ±Â¾ÃMmÂÃµ\Â',_binary "]H\'H_k:^Ì¯Q}");



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
(_binary "Zæ®¨K\ÅZ1\" ",'J02',0,'2022-12-28','E03','O02','2022-12-28',NULL,_binary 'm®rL®§u,bÚ¶'),
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
(_binary '`5/Â þDWA=©\Û',0,'E01',90,'O01','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ia-¹Ø¯O5´ú9\åS8',0,'E01',100,'O02','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'j4iq¬K2\å\æø4Y/',0,'E02',85,'O01','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 't¤\ÇyeHý±yYi3O	',0,'E01',94,'O02','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'x{µqËJ&x¿\Òð\ê',0,'E02',84,'O02','G0300','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'z-G\×8Kyü]}\Ö]',0,'E02',98,'O02','G0100','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '}\ÑkUõ\ÇA­_ÿM\Z\Ã',0,'E01',80,'O01','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary ' N\ëN×¿NE\å\'\Ï',0,'E02',85,'O02','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'µf\êH¸¸®ñú\n',0,'E02',86,'O02','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Þþ\Îu\ïC-v5\ÛFõñ\Ø',0,'E01',100,'O02','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'AÇ³\ÊGöªz\Ý\ÐXutX',0,'E01',100,'O02','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '¯YÀ9H\0»\'@\ÔÛ°',0,'E01',76,'O01','G0500','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '½\ã\Ýô1N\ìôG5\ÈF\É',0,'E02',80,'O01','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Åj\îÛ¯\nE\çDµ\\Ø¯ =',0,'E01',75,'O02','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Ñ+Q\Ë\çJn¶\Íöü@\Û',0,'E02',80,'O01','G0600','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\ÔÁ¢<yqC&¥t\0\à7\0',0,'E02',82,'O02','G0300','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Õ®o\Ób:@i\ÛCl¥\Ü',0,'E02',88,'O02','G0200','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'Ö·.NØ³O8³!L÷',0,'E02',72,'O01','G0100','J1001',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\Ùô¥\ÕJtD6£2\àK6\Ë$',0,'E02',92,'O02','G0200','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary '\á\èT\Ð\'þGÁ­v\ß\Z\"\ß4U',0,'E01',95,'O02','G0500','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ú@®¹O\áoSP\0~',0,'E02',97,'O02','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K'),
(_binary 'ýÓ\Ð\êG¹¾}ðbð0a',0,'E02',74,'O01','G0600','J1002',_binary 'p·\ØR ¥L3k{t\r\Þ4K');


-- Dump completed on 2022-01-29 17:08:5
