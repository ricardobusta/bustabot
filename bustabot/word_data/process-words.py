import hashlib
import unicodedata
import random
import itertools

added_lines = set()

src_lines = open('./bustabot/word_data/all_ptbr.txt',
                 'r', encoding='utf8').readlines()
src_lines_extra = open('./bustabot/word_data/all_ptbr_extra.txt',
                       'r', encoding='utf8').readlines()
vocabulary_file = open('./bustabot/word_data/vocabulary_ptbr.txt',
                       'w', encoding='utf8')
word_of_day_file = open('./bustabot/word_data/word_of_day_ptbr.txt',
                        'w', encoding='utf8')


def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
                   if unicodedata.category(c) != 'Mn')


def add_5_char_uppercase_line(s, file):
    s = s.rstrip()
    if len(s) != 5:
        return
    hash_value = hashlib.md5(s.encode('utf-8')).hexdigest()
    if hash_value not in added_lines:
        file.write(s.upper() + '\n')
        added_lines.add(hash_value)


def shuffle(array):
    random.shuffle(array)
    return array


for line in shuffle(src_lines.copy()):
    add_5_char_uppercase_line(line, word_of_day_file)
word_of_day_file.close()

for line in itertools.chain(src_lines.copy(), src_lines_extra):
    add_5_char_uppercase_line(line, vocabulary_file)
    add_5_char_uppercase_line(strip_accents(line), vocabulary_file)
vocabulary_file.close()
