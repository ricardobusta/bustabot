import hashlib
# import unicodedata

added_lines = set()


# def strip_accents(s):
#     return ''.join(c for c in unicodedata.normalize('NFD', s)
#                    if unicodedata.category(c) != 'Mn')


def add_line(s):
    s = s.rstrip()
    if len(s) != 5:
        return
    hash_value = hashlib.md5(s.encode('utf-8')).hexdigest()
    if hash_value not in added_lines:
        output_file.write(s.upper() + '\n')
        added_lines.add(hash_value)


output_file = open('./database_ptbr_out.txt', 'w', encoding='utf8')

for line in open('./database_ptbr.txt', 'r', encoding='utf8'):
    add_line(line)
    #stripped_line = strip_accents(line)
    # add_line(stripped_line)
output_file.close()
