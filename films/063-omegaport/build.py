"""Assemble index.html: fonts (relative urls) + inlined data + engine."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
FD = 'fonts'
def ff(fam, path, w):
    return f"@font-face{{font-family:'{fam}';src:url('{FD}/{path}') format('woff2');font-weight:{w};font-style:normal;font-display:block}}"
faces = []
for w in (400, 700, 900):
    faces.append(ff('Orbitron', f'fontsource-orbitron-5.3.0/files/orbitron-latin-{w}-normal.woff2', w))
for w in (400, 700):
    for sub in ('latin', 'greek', 'latin-ext'):
        faces.append(ff('JetBrains Mono', f'fontsource-jetbrains-mono-5.3.0/files/jetbrains-mono-{sub}-{w}-normal.woff2', w))
for w in (500, 600, 700):
    faces.append(ff('Rajdhani', f'fontsource-rajdhani-5.3.0/files/rajdhani-latin-{w}-normal.woff2', w))
for w in (400, 700, 900):
    faces.append(ff('Noto Sans SC', f'fontsource-noto-sans-sc-5.3.0/files/noto-sans-sc-chinese-simplified-{w}-normal.woff2', w))
data = {
    'timeline': json.load(open(os.path.join(HERE, 'timeline.json'))),
    'corpus': json.load(open(os.path.join(HERE, 'corpus.json'))),
    'deficit': json.load(open(os.path.join(HERE, 'deficit.json'))),
}
engine = open(os.path.join(HERE, 'engine.js'), encoding='utf-8').read()
if os.path.exists(os.path.join(HERE, 'scenes.js')):
    # film-specific scenes are injected before the final exports of the shared engine
    scenes = open(os.path.join(HERE, 'scenes.js'), encoding='utf-8').read()
    engine = engine.replace('window.renderAt = renderAt;', scenes + '\nwindow.renderAt = renderAt;')
html = f"""<!doctype html><html><head><meta charset="utf-8"><title>Trureturing Film</title>
<style>{''.join(faces)}html,body{{margin:0;background:#000;overflow:hidden}}canvas{{display:block}}</style></head>
<body><canvas id="c" width="1920" height="1080"></canvas>
<script>window.DATA={json.dumps(data, ensure_ascii=False)};</script>
<script>{engine}</script></body></html>"""
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(html)
print('ok', len(html))
