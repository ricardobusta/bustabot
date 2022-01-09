import random
lines = open('./database_ptbr.txt', 'r').readlines()
random.shuffle(lines)
open('./database_ptbr_rand.txt', 'w').writelines(lines)