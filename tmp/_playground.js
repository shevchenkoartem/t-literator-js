// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = `https://cdn.jsdelivr.net/gh/shevchenkoartem/t-literator-js/deploy/result/t-literator-js.js`;
// script.addEventListener('load', function() {
//     var t = new Transliterator();
//     t.useConfig("temivka");
//     document.body.innerHTML = t.transliterate(document.body.innerHTML);
// });
// document.head.appendChild(script);


const fs = require('fs');

console.log('Current folder: ' + __dirname);

const Transliterator = require('../src/3-transliterator');
const FileDataReader = require('../tst/file-data-reader');

const reader = new FileDataReader('..');
const t = new Transliterator(reader);

const createTestChecksResults = function(config) {
    t.useConfig(config);
    const alphab = t.getTransliteratedAlphabet();
    const info = t.getConfigTransliterationInfo();

    const inputRawData = reader.readTestCheck('_actual_input', 'trans');
    eval("var input = `" + inputRawData + "`");

    const trans = t.transliterate(input);

    fs.writeFile(`exp_alphabet_${config}.txt`, JSON.stringify(alphab), err => console.log(err));
    fs.writeFile(`exp_info_${config}.txt`, JSON.stringify(info), err => console.log(err));
    fs.writeFile(`exp_output_${config}.txt`, trans, err => console.log(err));
};

let configs = [
    'abecadlo',
    'jireckivka',
    'heohraf',
    'pasport',
    'lucukivka',
    'pingvinivka',
    'naukova-trad',
    "ipa",
    'bgn-pcgn-65',
    'nice-cyr',
    'temivka',
    'volapuk-unicode',
    'volapuk-askii',
    //''
];

//configs = Object.keys(reader.getConfigPaths());


// save start datetime:
const start = new Date();

for (const conf of configs) {
    t.useConfig(conf);
    console.log(t.getConfigTransliterationInfo());
    //console.log(t.getTransliteratedAlphabet(false, true));

    //console.log(conf);
    //console.log(t.getSourceConsonants(false));
    //console.log(t.getSourceVowels(false));
    //console.log(t.getSourceSpecialSigns(false));
    //console.log(t.getSourceAlphabet(false, true));

    let testStr = `ЦІЄЇ СІМ'Ї cьогодні преміально`;
    console.log(t.transliterate(testStr));


    for(i = 0; i < 11; i++) { // спробуй поставити 100 і зрозуміти, чому зависає
        testStr += testStr;
        t.useConfig(conf);
        console.log(t.transliterate(testStr));
    }


    //createTestChecksResults(conf);
}
