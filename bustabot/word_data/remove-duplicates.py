import hashlib

output_file = open('./database_ptbr_out.txt', 'w', encoding='utf8')

added_lines = set()
for line in open('./database_ptbr_src.txt', 'r', encoding='utf8'):
    hashValue = hashlib.md5(line.rstrip().encode('utf-8')).hexdigest()
    if hashValue not in added_lines:
        output_file.write(line.lower())
        added_lines.add(hashValue)
output_file.close()
