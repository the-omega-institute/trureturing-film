# trureturing-film

Source code for films about [trureturing](https://github.com/the-omega-institute/trureturing).
Every film is generated entirely by code — procedural Canvas animation, local TTS narration,
synthesized score — so this repository holds **source only**. Rendered videos are build
outputs and are never committed.

关于 [trureturing](https://github.com/the-omega-institute/trureturing) 的影片源码。每部影片完全由代码生成（程序化动画、本地 TTS 旁白、合成配乐），本仓库**只存源码**，成片是构建产物，不入库。

## Films · 影片

| # | Film | Length | Narration | Subtitles |
| --- | --- | --- | --- | --- |
| 001 | [TRURETURING — Truth Is Discovered](films/001-truth-is-discovered/) · 真理是被发现的 | 6:54 | EN (AI) / music-only | ZH + EN |

## Layout · 结构

```
films/
  <NNN>-<slug>/        one self-contained film
    film.json          metadata: title, subject commit, duration, voice, outputs
    README.md          scenes, sources of every claim, rebuild steps
    script.json        narration + subtitles (the single source of timing)
    ...                engine, audio and render scripts
```

Each film directory is self-contained and runnable on its own (`./setup.sh`, then its
README's *Rebuild* steps). Dependencies such as fonts and TTS models are fetched by
`setup.sh` and ignored by Git.

## Adding a film · 新增影片

1. Create `films/<next number>-<slug>/` with its own `film.json` and `README.md`.
2. Read figures from a pinned commit of the subject repository and record it in
   `film.json` (`subject_commit`); state the scope of every claim in the README.
3. Add a row to the table above.
4. Commit source only — `.gitignore` excludes videos, images, audio and caches.

## License

Code: Apache-2.0 ([LICENSE](LICENSE)). Text and data: CC-BY-4.0.
Fonts and TTS models keep their upstream licenses.
