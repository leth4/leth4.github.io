def head(page):
    return ('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        f'<title>{page.title}</title><link rel="stylesheet" href="/css/main.css">'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter">'
        '<link rel="icon" href="/media/favicon.png"></head>')

def header(from_link): 
    return (f'<header><nav><a href="{from_link}" class="homelink">←</a>'
            '<a href="/site/games">Games</a><a href="/site/projects">Projects</a>'
            '<a href="/site/about">About</a></nav></header>')

def create(page, contents, from_link):
    return f'{head(page)}<body>{header(from_link)}<main>\n\n<h1>{page.title}</h1>{contents}\n\n</main></body></html>'