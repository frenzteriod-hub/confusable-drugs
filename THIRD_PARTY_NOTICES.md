# Third-party notices

This project uses third-party software for contextual English grapheme-to-phoneme conversion. The licenses below apply to the named components; this notice does not replace their full license texts or change the license of project-authored code.

## Browser pronunciation engine

The browser uses **Phonemizer.js (`phonemizer` 1.2.1)** through the vendored file `viewer/vendor/phonemizer.js`.

- The Phonemizer.js package declares **Apache License 2.0** for its JavaScript package code. The copied license text is at `viewer/vendor/phonemizer.LICENSE.txt`; upstream source and license are at [xenova/phonemizer.js](https://github.com/xenova/phonemizer.js) and its [Apache-2.0 license](https://github.com/xenova/phonemizer.js/blob/main/LICENSE).
- The generated browser bundle contains an eSpeak NG-derived runtime and pronunciation data. **eSpeak NG is licensed under GPL version 3 or later**. Its source and full license are at [espeak-ng/espeak-ng](https://github.com/espeak-ng/espeak-ng) and [COPYING](https://github.com/espeak-ng/espeak-ng/blob/master/COPYING).
- The Apache-2.0 file covers the Phonemizer.js package code; it does not override the license that applies to the bundled eSpeak NG portions.

Anyone redistributing the browser bundle should preserve the applicable notices and satisfy the eSpeak NG GPL requirements, including the corresponding-source requirements for covered object code. This notice is informational and is not legal advice.

## Python batch pronunciation engine

The batch pipeline declares these optional pronunciation dependencies in `requirements-data.txt`. The versions inspected for this notice were `phonemizer-fork` 3.3.2 and `espeakng-loader` 0.2.4.

- **phonemizer-fork 3.3.2** declares **GNU General Public License version 3 (GPL-3.0)** in its installed package metadata and license file. Its package metadata points to the upstream [bootphon/phonemizer](https://github.com/bootphon/phonemizer) repository and [license](https://github.com/bootphon/phonemizer/blob/master/LICENSE).
- **espeakng-loader 0.2.4** provides the platform eSpeak NG shared library and data used by the Python wrapper. Its wheel metadata does not declare a license or include a license file. The matching upstream loader source publishes its glue code under the **MIT License** at [thewh1teagle/espeakng-loader](https://github.com/thewh1teagle/espeakng-loader) and [LICENSE](https://github.com/thewh1teagle/espeakng-loader/blob/main/LICENSE).
- The shared eSpeak NG library and pronunciation data supplied by the loader remain covered by eSpeak NG's **GPL version 3 or later**; the loader's MIT license does not relicense those embedded components.

The pipeline records eSpeak NG output as a fallible English source-pronunciation hypothesis. Neither dependency supplies a reviewed Cebuano pronunciation, and their licenses do not imply linguistic endorsement.
