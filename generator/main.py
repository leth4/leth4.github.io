import os
import re
from page import Page
from template import create
import shutil

directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '\\pages'
destination = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '\\site'

def main():
    if os.path.exists(destination):
        shutil.rmtree(destination)

    os.makedirs(destination)
    map = fill_titles()

    for root, dirs, files in os.walk(directory):
        for file in files:
            if (file.endswith('.html')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    contents = f.read()

                contents = replace_links(contents.split("\n",1)[1], map)
                
                from_file = ""
                if map[file].from_title == "Home":
                    from_file = "../"
                else:
                    from_file = filename_by_title(map[file].from_title, map)
                
                new_path = os.path.join(destination, file)
                with open(new_path, 'w', encoding='utf-8') as f:
                    f.write(create(map[file], contents, from_file))

def replace_links(content, map):
    return re.sub(r'\[(.*?)\]', lambda match: f'href="/site/{filename_by_title(match.group(1), map)}"', content)

def filename_by_title(title, map):
    for page in map.values():
        if (page.title == title):
            return os.path.splitext(page.file_name)[0]
    raise Exception(f"Can't find title {title}!")

def fill_titles():
    map = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            if (file.endswith('.html')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    meta_line = f.readline()
                title, parent = parse_meta(meta_line, file)
                if (file in map):
                    raise Exception(f"There's multiple files with the name {file}!")
                map[file] = Page(title, parent, file)
    return map;

def parse_meta(line, filename):
    if not line.startswith("[") or not line.endswith("]\n") or " from " not in line:
        raise Exception(f"Wrong meta format in {filename}")

    line = line[1:-2]
    words = line.split("] from [")

    if len(words) != 2:
        raise Exception(f"Wrong meta format in {filename}")

    return words[0], words[1]

if __name__ == "__main__":
    main()