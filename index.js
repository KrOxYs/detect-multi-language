import { franc } from "franc"; // Language detection
import langs from "langs"; // Map language codes to names
import express from "express";

const app = express();

app.use(express.json());

const customLanguages = [
  "eng",
  "fra",
  "spa",
  "deu",
  "ita",
  "nld",
  "por",
  "rus",
  "zho",
  "jpn", // Top 10
  "kor",
  "hin",
  "arb",
  "tur",
  "tha",
  "pol",
  "ukr",
  "vie",
  "swe",
  "fin",
  "dan",
  "nor",
  "ell",
  "ron",
  "ces",
  "hun",
  "bul",
  "heb",
  "ind",
  "mal",
  "tam",
  "tel",
  "mar",
  "urd",
  "aze",
  "fil",
  "sqi",
  "slk",
  "hrv",
  "srp",
  "lit",
  "lat",
  "lav",
  "est",
  "slv",
  "cat",
  "eus",
  "glg",
  "isl",
  "msa",
  "kan",
  "pan",
  "nep",
  "sin",
  "tha",
  "kaz",
  "uzb",
  "kir",
  "kur",
  "amh",
  "yor",
  "ibo",
  "hau",
  "swa",
  "zul",
  "xho",
  "afr",
  "som",
  "tgk",
  "prs",
  "pas",
  "mlt",
  "mon",
  "tah",
  "tgl",
  "hat",
  "bos",
  "mlg",
  "guj",
  "ori",
  "asm",
  "ben",
  "bod",
  "mya",
  "khm",
  "lao",
  "snd",
  "kas",
  "ory",
  "sco",
  "bre",
  "wel",
  "gle",
  "mlt",
  "fao",
  "nds",
  "war",
  "nan",
];

app.post("/detect-language", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("language supported languages:", customLanguages.length);
    const langCode3 = franc(text, { only: customLanguages });
    if (langCode3 === "und") {
      return res.status(400).json({ error: "Unable to detect language." });
    }
    const language = langs.where("3", langCode3); // Map to human-readable language name
    const iso639_1 = language ? language["1"] : "N/A"; // ISO 639-1 code
    return res.json({
      detectedLanguage: iso639_1,
      languageName: language.name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// List of 100 languages (ISO 639-3 codes)

// console.log(`Number of languages: ${customLanguages.length}`);

// // Sample text for language detection
// const text =
//   "halo apa kabar? saya baik-baik saja kok. terima kasih sudah bertanya.";

// // Detect the language using the custom list
// const langCode3 = franc(text, { only: customLanguages });

// if (langCode3 === "und") {
//   console.log("Unable to detect language.");
// } else {
//   const language = langs.where("3", langCode3); // Map to human-readable language name
//   const iso639_1 = language ? language["1"] : "N/A"; // ISO 639-1 code
//   console.log(`Detected language: ${iso639_1} (${language.name})`);
// }
