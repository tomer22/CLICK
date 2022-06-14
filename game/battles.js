"use strict";
let battles = [`UNDYNE2.mp3
2 a 2 1 500 5 2
20 b 1
40 a 2 2 500 5 1
40 a 2 3 500 5 3
60 b 2
60 b 3
80 a 2 1 500 5 0
80 a 2 2 500 5 2
80 a 2 3 500 5 4
100 b 1
100 b 2
100 b 3
120 a 2 1 500 5 1 1
140 a 2 2 500 5 3 2
140 b 1
160 a 2 3 500 5 1 3
160 a 2 4 500 5 3 3
160 b 2
180 b 3
180 b 4
200 a 2 2 500 5 0 1
200 a 2 3 500 5 4 2
230 b 2
230 b 3
250 a 2 1 500 5 1
250 a 2 2 500 5 3 
270 b 1
270 b 2
270 b 3
290 a 2 1 500 5 0 1
290 a 2 2 500 5 4 1
290 a 2 3 500 5 2 2
310 a 2 4 500 5 0 
310 a 2 5 500 5 4 
310 a 2 6 500 5 2 3
310 b 1
310 b 2
310 b 3
330 b 4
330 b 5
330 b 6
330 a 3 0 200
570 b 0
580 a 2 3 500 5 2 3
600 b 3
620 a 2 1 500 5 0 1
620 a 2 2 500 5 4 2
640 b 1
640 b 2
640 a 2 1 500 5 0 
640 a 2 2 500 5 4 3
660 b 1
660 b 2
660 a 2 1 500 5 2
680 a 4 2 500 1
680 b 1
700 b 2
720 a 4 2 500 1
740 b 2
760 a 4 2 500 1
780 a 4 1 500 1
780 b 2
800 a 4 2 500 1
800 b 1
820 b 2
840 a 4 2 500 1
860 b 2
880 a 4 2 500 1
900 b 2
930 a 4 1 500 2
950 a 4 2 500 2
950 b 1
970 a 4 1 500 2
970 b 2
990 a 4 2 500 2
990 b 1 
1010 a 4 1 500 2
1010 b 2
1030 a 4 2 500 2
1030 b 1
1050 b 2
1050 a 4 1 500 2
1057 a 4 2 500 2
1064 a 4 3 500 2
1070 a 4 4 500 2
1070 b 1
1077 b 2
1084 b 3
1090 b 4
1120 a 1 0 150 1
1340 b 0
1450 a 2 0 500 5 0
1450 a 2 4 500 5 4
1460 a 2 2 500 5 2
1470 a 2 1 500 5 1
1470 a 2 3 500 5 3
1470 b 0
1480 b 4
1480 b 2
1490 b 1
1490 b 3
1530 a 2 0 500 5 0 3
1530 a 2 4 500 5 4 3
1540 a 2 2 500 5 2 3
1550 a 2 1 500 5 1 3 
1550 a 2 3 500 5 3 3
1550 b 0
1560 b 4
1560 b 2
1570 b 1
1570 b 3
1615 a 2 0 500 5 0 1
1615 a 2 4 500 5 4 1
1625 a 2 2 500 5 2 1
1635 a 2 1 500 5 1 1
1635 a 2 3 500 5 3 1
1635 b 0
1645 b 4
1645 b 2
1655 b 1
1655 b 3
1700 a 2 0 500 5 0 2
1700 a 2 4 500 5 4 2
1710 a 2 2 500 5 2 2
1720 a 2 1 500 5 1 2 
1720 a 2 3 500 5 3 2
1720 b 0
1730 b 4
1730 b 2
1740 b 1
1740 b 3
1760 a 5 1 1200 7
2020 b 1
2090 a 4 1 500 1
2100 a 4 2 500 1
2110 a 4 3 500 1
2110 b 1
2120 b 2
2130 b 3
2175 a 4 1 500 1
2185 a 4 2 500 1
2195 a 4 3 500 1
2195 b 1
2205 b 2
2215 b 3
2260 a 4 1 500 1
2270 a 4 2 500 1
2280 a 4 3 500 1
2280 b 1
2290 b 2
2300 b 3
2340 a 4 1 500 1
2350 a 4 2 500 1
2360 a 4 3 500 1
2360 b 1
2370 b 2
2380 b 3
2450 a 3 0 200
2766 b 0
2780 a 4 3 500 2
3060 b 3
3080 a 1 0 250 2
3350 b 0
3440 a 2 1 500 5 3 
3440 a 2 2 500 5 4
3440 a 2 3 500 5 0 3
3440 a 2 4 500 5 1 3
3440 a 2 5 500 5 0 1
3440 a 2 6 500 5 1 1
3440 a 2 7 500 5 3 2
3440 a 2 8 500 5 4 2
3460 b 1
3460 b 2
3460 b 3
3460 b 4
3460 b 5
3460 b 6
3460 b 7
3460 b 8
3600 win`,
    `Henry's thing here`,
    `METTATON.mp3
1 a 3 0 405 2
1 a 3 2 405 3 6885
1 a 3 3 202.5 1 24705
1 a 3 10 202.5 1 92340
390 a 2 1 500 5 2 3 350
410 b 1
750 b 0
751 b 2
780 a 5 1 1200 7
1100 b 1
1200 a 4 2 810 3 10
1920 b 2
1920 b 3
2010 a 2 1 500 5 2
2030 b 1
2060 a 2 1 500 5 1
2060 a 2 2 500 5 3
2080 b 1
2080 b 2
2080 a 2 3 500 5 0
2080 a 2 4 500 5 4
2110 b 3
2110 b 4
2110 a 2 5 500 5 1
2110 a 2 6 500 5 3
2120 a 2 7 500 5 2
2130 b 5
2130 b 6
2130 a 2 8 500 5 0
2130 a 2 9 500 5 4
2140 b 7
2150 b 8
2150 b 9
2205 a 2 1 500 5 2 3
2225 b 1
2255 a 2 1 500 5 1 3
2255 a 2 2 500 5 3 3
2275 b 1
2275 b 2
2275 a 2 3 500 5 0 3 
2275 a 2 4 500 5 4 3
2305 b 3
2305 b 4
2305 a 2 5 500 5 1 3
2305 a 2 6 500 5 3 3
2315 a 2 7 500 5 2 3
2325 b 5
2325 b 6
2325 a 2 8 500 5 0 3
2325 a 2 9 500 5 4 3
2335 b 7
2345 b 8
2345 b 9
2400 a 2 1 500 5 2
2420 b 1
2450 a 2 1 500 5 1
2450 a 2 2 500 5 3
2470 b 1
2470 b 2
2470 a 2 3 500 5 0
2470 a 2 4 500 5 4
2500 b 3
2500 b 4
2500 a 2 5 500 5 1
2500 a 2 6 500 5 3
2510 a 2 7 500 5 2
2520 b 5
2520 b 6
2520 a 2 8 500 5 0
2520 a 2 9 500 5 4
2530 b 7
2540 b 8
2540 b 9
2595 a 2 1 500 5 2 3
2615 b 1
2645 a 2 1 500 5 1 3
2645 a 2 2 500 5 3 3
2665 b 1
2665 b 2
2665 a 2 3 500 5 0 3 
2665 a 2 4 500 5 4 3
2695 b 3
2695 b 4
2695 a 2 5 500 5 1 3
2695 a 2 6 500 5 3 3
2705 a 2 7 500 5 2 3
2715 b 5
2715 b 6
2715 a 2 8 500 5 0 3
2715 a 2 9 500 5 4 3
2725 a 2 1 500 5 1 3
2725 a 2 2 500 5 3 3
2725 b 7
2735 b 8
2735 b 9
2745 a 2 3 500 5 0 3
2745 a 2 4 500 5 4 3
2745 b 1
2745 b 2
2765 b 4
2765 b 3
2765 a 5 1 1200 7
3050 b 1
3150 a 4 2 810 4 
3460 b 10
3460 a 2 11 500 5 0 0 500 
3460 a 2 12 500 5 4 3 500 
3460 a 2 13 500 5 0 1 500 
3460 a 2 14 500 5 4 2 500 
3480 b 11
3480 b 12
3480 b 13
3480 b 14
3500 b 2
3530 a 2 3 500 5 1 1
3545 a 2 1 500 5 3 2
3550 b 3
3555 a 2 2 500 5 1
3565 b 1
3565 a 2 3 500 5 3
3575 b 2
3580 a 2 4 500 5 2 3
3585 b 3
3590 a 2 5 500 5 1 1
3600 b 4
3600 a 2 6 500 5 3 2
3610 b 5
3610 a 2 7 500 5 1
3620 b 6
3625 a 2 8 500 5 3
3630 b 7
3630 a 2 3 500 5 1 1
3645 b 8
3645 a 2 1 500 5 3 2
3650 b 3
3655 a 2 2 500 5 1
3665 b 1
3665 a 2 3 500 5 3
3675 b 2
3680 a 2 4 500 5 2 3
3685 b 3
3690 a 2 5 500 5 1 1
3700 b 4
3700 a 2 6 500 5 3 2
3710 b 5
3710 a 2 7 500 5 1
3720 b 6
3725 a 2 8 500 5 3
3730 b 7
3730 a 2 3 500 5 1 1
3745 b 8
3745 a 2 1 500 5 3 2
3750 b 3
3755 a 2 2 500 5 1
3765 b 1
3765 a 2 3 500 5 3
3775 b 2
3780 a 2 4 500 5 2 3
3785 b 3
3790 a 2 5 500 5 1 1
3800 b 4
3800 a 2 6 500 5 3 2
3810 b 5
3810 a 2 7 500 5 1
3820 b 6
3825 a 2 8 500 5 3
3830 b 7
3830 a 2 3 500 5 1 1
3845 b 8
3845 a 2 1 500 5 3 2
3850 b 3
3855 a 2 2 500 5 1
3865 b 1
3865 a 2 3 500 5 3
3875 b 2
3880 a 2 4 500 5 2 3
3885 b 3
3890 a 2 5 500 5 1 1
3900 b 4
3900 a 2 6 500 5 3 2
3910 b 5
3910 a 2 7 500 5 1
3920 b 6
3925 a 2 8 500 5 3
3930 b 7
3945 b 8
4120 win`];
