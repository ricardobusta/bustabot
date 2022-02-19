import random
lines = open('./all_ptbr_out.txt', 'r', encoding='utf8').readlines()
lines = list(dict.fromkeys(lines))
for i in range(len(lines)):
    lines[i] = lines[i].upper()
random.shuffle(lines)
open('./database_ptbr_out.txt', 'w', encoding='utf8').writelines(lines)
