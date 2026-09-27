# trureturing-film

Source code for films about [trureturing](https://github.com/the-omega-institute/trureturing).
Every film is generated entirely by code — procedural Canvas animation, local TTS narration,
synthesized score — so this repository holds **source only**. Rendered videos are build
outputs, published only as [Releases](../../releases). Release asset names carry the film
number, e.g. `TRURETURING_010_720p_narrated.mp4`, `TRURETURING_010_cover.jpg`.

关于 [trureturing](https://github.com/the-omega-institute/trureturing) 的影片源码。每部影片完全由代码生成（程序化动画、本地 TTS 旁白、合成配乐），本仓库**只存源码**，成片由 CI 构建后发布到 Releases，不入库；Release 文件名带影片编号（如 `TRURETURING_010_720p_narrated.mp4`）。

## Films · 影片

| # | Film | Length | Narration | Subtitles |
| --- | --- | --- | --- | --- |
| 001 | [TRURETURING — Truth Is Discovered](films/001-truth-is-discovered/) · 真理是被发现的 | 6:54 | EN (AI) / music-only | ZH + EN |
| 002 | [HOLOGRAM OF TRUTH](films/002-hologram-of-truth/) · 真理全息 | 6:03 | EN (AI) / music-only | ZH + EN |
| 003 | [INFORMATION ESCAPE](films/003-information-escape/) · 信息逃逸 | 4:38 | EN (AI) / music-only | ZH + EN |
| 004 | [FIXED POINT](films/004-fixed-point/) · 不动点 | 5:13 | EN (AI) / music-only | ZH + EN |
| 005 | [INDRA'S NET](films/005-indra-net/) · 因陀罗网 | 5:12 | EN (AI) / music-only | ZH + EN |
| 006 | [MATH · MYTH · MATCH](films/006-math-myth-match/) · 真理有形而无法穷尽 | 5:55 | EN (AI) / music-only | ZH + EN |
| 007 | [WHITE BOX](films/007-white-box/) · 白盒 | 6:09 | EN (AI) / music-only | ZH + EN |
| 008 | [QUANTUM LEDGER](films/008-quantum/) · 量子账本 | 5:36 | EN (AI) / music-only | ZH + EN |
| 009 | [BOUNDARY / BULK](films/009-boundary/) · 边界与体 | 5:08 | EN (AI) / music-only | ZH + EN |
| 010 | [CRITICAL LINE](films/010-riemann/) · 临界线 | 5:07 | EN (AI) / music-only | ZH + EN |
| 011 | [FIXED FRAME](films/011-gict/) · 黄金不动坐标 | 5:19 | EN (AI) / music-only | ZH + EN |
| 012 | [OBSERVATION QUOTIENT](films/012-rro/) · 递归关系观察 | 5:07 | EN (AI) / music-only | ZH + EN |
| 013 | [HIDDEN ARROW](films/013-parity-arrow/) · 奇偶隐藏时间箭头 | 4:44 | EN (AI) / music-only | ZH + EN |
| 014 | [WAVE · PARTICLE · EVENT](films/014-wave-particle/) · 波粒整体 | 4:57 | EN (AI) / music-only | ZH + EN |
| 015 | [BOUNDARY DYNAMICS](films/015-boundary/) · 动态充分边界 | 5:26 | EN (AI) / music-only | ZH + EN |

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
5. Publish: push a tag `film-<NNN>-<version>`; `release-film.yml` builds the film on CI
   and attaches the videos to a GitHub Release.

## License

Code: Apache-2.0 ([LICENSE](LICENSE)). Text and data: CC-BY-4.0.
Fonts and TTS models keep their upstream licenses.
