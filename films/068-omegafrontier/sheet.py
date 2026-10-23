import sys
from PIL import Image
out = sys.argv[1]; ts = sys.argv[2:]
ims = [Image.open(f'shots/t_{t}.jpg').resize((960, 540)) for t in ts]
S = Image.new('RGB', (1920, 540 * ((len(ims) + 1) // 2)))
for i, im in enumerate(ims): S.paste(im, ((i % 2) * 960, (i // 2) * 540))
S.save(out, quality=85)
