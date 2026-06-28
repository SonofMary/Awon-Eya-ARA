/**
 * ============================================================
 * AFRICAN LANGUAGES BODY PARTS GAME - HYBRID TTS SYSTEM
 * Uses YarnGPT for Nigerian languages, Voicemaker for Swahili/Zulu
 * ============================================================
 */

/**
 * BODY PARTS DATA
 * Defines all body parts with their English names
 */
const bodyParts = [
  { key: "head", english: "Head" },
  { key: "eye", english: "Eye" },
  { key: "mouth", english: "Mouth" },
  { key: "neck", english: "Neck" },
  { key: "shoulder", english: "Shoulder" },
  { key: "chest", english: "Chest" },
  { key: "stomach", english: "Stomach" },
  { key: "hand", english: "Hand" },
  { key: "finger", english: "Finger" },
  { key: "thigh", english: "Thigh" },
  { key: "knee", english: "Knee" },
  { key: "foot", english: "Foot" },
];

console.log("📦 [DEBUG] Body parts loaded:", bodyParts.length, "parts");

/**
 * ============================================================
 * LANGUAGE DICTIONARY
 * Contains translations for 5 African languages
 * ============================================================
 */
const languages = {
  yoruba: {
    name: "Yoruba",
    speechLang: "yo-NG",
    voiceName: "Femi",
    useYarnGPT: true,
    parts: {
      head: "Orí",
      eye: "Ojú",
      mouth: "Ẹnu",
      neck: "Ọrùn",
      shoulder: "Èjìká",
      chest: "Àyà",
      stomach: "Ikùn",
      hand: "Ọwọ́",
      finger: "Ìka ọwọ́",
      thigh: "Itan",
      knee: "Orókún",
      foot: "Ẹsẹ̀",
    },
  },
  igbo: {
    name: "Igbo",
    speechLang: "ig-NG",
    voiceName: "Idera",
    useYarnGPT: true,
    parts: {
      head: "Isi",
      eye: "Anya",
      mouth: "Ọnụ",
      neck: "Olu",
      shoulder: "Ubu",
      chest: "Obi",
      stomach: "Afọ",
      hand: "Aka",
      finger: "Mkpịsị aka",
      thigh: "Apata ụkwụ",
      knee: "Ikpere",
      foot: "Ụkwụ",
    },
  },
  hausa: {
    name: "Hausa",
    speechLang: "ha-NG",
    voiceName: "Zainab",
    useYarnGPT: true,
    parts: {
      head: "Kai",
      eye: "Ido",
      mouth: "Baki",
      neck: "Wuya",
      shoulder: "Kafaɗa",
      chest: "Kirji",
      stomach: "Ciki",
      hand: "Hannu",
      finger: "Yatsa",
      thigh: "Cinya",
      knee: "Gwiwa",
      foot: "Ƙafa",
    },
  },
  swahili: {
    name: "Swahili",
    speechLang: "sw",
    voiceId: "ai3-Jony", // Use a neutral voice that supports multiple languages
    useVoicemaker: true,
    parts: {
      head: "Kichwa",
      eye: "Jicho",
      mouth: "Mdomo",
      neck: "Shingo",
      shoulder: "Bega",
      chest: "Kifua",
      stomach: "Tumbo",
      hand: "Mkono",
      finger: "Kidole",
      thigh: "Paja",
      knee: "Goti",
      foot: "Mguu",
    },
  },
  zulu: {
    name: "Zulu",
    speechLang: "zu",
    voiceId: "ai3-Jony", // Use a neutral voice that supports multiple languages
    useVoicemaker: true,
    parts: {
      head: "Ikhanda",
      eye: "Iso",
      mouth: "Umlomo",
      neck: "Intamo",
      shoulder: "Ihlombe",
      chest: "Isifuba",
      stomach: "Isisu",
      hand: "Isandla",
      finger: "Umunwe",
      thigh: "Ithanga",
      knee: "Idolo",
      foot: "Unyawo",
    },
  },
};

console.log(
  "🌍 [DEBUG] Languages loaded:",
  Object.keys(languages).length,
  "languages",
);
console.log(
  "📚 [DEBUG] Available languages:",
  Object.keys(languages).join(", "),
);

/**
 * ============================================================
 * YARNGPT API CONFIGURATION (For Nigerian Languages)
 * ============================================================
 */
const YARNGPT_API_KEY = "sk_live_BgWTxSvYy2BBUsA6WSOE32e7TjuvKhHkziZxXXQxQhk";
const YARNGPT_API_URL = "https://yarngpt.ai/api/v1/tts";

console.log(
  "🔑 [DEBUG] YarnGPT API Key configured:",
  YARNGPT_API_KEY ? "✅ Yes" : "❌ No",
);

/**
 * ============================================================
 * VOICEMAKER API CONFIGURATION (For Swahili & Zulu)
 * ============================================================
 */
const VOICEMAKER_API_KEY = "fc213630-7293-11f1-b991-1705769b5f34";
const VOICEMAKER_API_URL =
  "https://developer.voicemaker.in/api/v1/voice/convert";

console.log(
  "🔑 [DEBUG] Voicemaker API Key configured:",
  VOICEMAKER_API_KEY ? "✅ Yes" : "❌ No",
);
console.log("🌐 [DEBUG] Voicemaker API URL:", VOICEMAKER_API_URL);

/**
 * ============================================================
 * DOM REFERENCES
 * ============================================================
 */
const languageSelect = document.getElementById("languageSelect");
const figureSelect = document.getElementById("figureSelect");
const dropList = document.getElementById("dropList");
const wordBank = document.getElementById("wordBank");
const scoreCard = document.getElementById("scoreCard");
const correctAnswerCard = document.getElementById("correctAnswerCard");
const feedback = document.getElementById("feedback");
const femaleFigure = document.getElementById("femaleFigure");
const maleFigure = document.getElementById("maleFigure");

console.log("🏗️ [DEBUG] DOM elements loaded:");
console.log("  - languageSelect:", languageSelect ? "✅" : "❌");
console.log("  - figureSelect:", figureSelect ? "✅" : "❌");
console.log("  - dropList:", dropList ? "✅" : "❌");
console.log("  - wordBank:", wordBank ? "✅" : "❌");
console.log("  - scoreCard:", scoreCard ? "✅" : "❌");
console.log("  - correctAnswerCard:", correctAnswerCard ? "✅" : "❌");
console.log("  - feedback:", feedback ? "✅" : "❌");
console.log("  - femaleFigure:", femaleFigure ? "✅" : "❌");
console.log("  - maleFigure:", maleFigure ? "✅" : "❌");

/**
 * ============================================================
 * POPULATE LANGUAGE SELECTOR
 * ============================================================
 */
console.log("🔄 [DEBUG] Populating language selector...");
Object.entries(languages).forEach(([id, lang]) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = lang.name;
  languageSelect.appendChild(option);
  console.log(`  - Added ${lang.name} (${id})`);
});
console.log("✅ [DEBUG] Language selector populated successfully");

/**
 * ============================================================
 * UTILITY FUNCTIONS
 * ============================================================
 */

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
function shuffle(array) {
  console.log("🔀 [DEBUG] Shuffling array of length:", array.length);
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  console.log("✅ [DEBUG] Array shuffled successfully");
  return shuffled;
}

/**
 * ============================================================
 * LIST VOICEMAKER VOICES (For Debugging)
 * ============================================================
 */

/**
 * Lists all available Voicemaker voices to find Swahili/Zulu support
 */
async function listVoicemakerVoices() {
  console.log("🔍 [DEBUG] Fetching Voicemaker voices...");

  try {
    const response = await fetch(
      "https://developer.voicemaker.in/api/v1/voices",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VOICEMAKER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ [DEBUG] Available voices:", data);

    // Look for voices that support Swahili and Zulu
    if (data.voices) {
      const swahiliVoices = data.voices.filter(
        (v) =>
          v.language_codes?.some((code) => code.startsWith("sw")) ||
          v.name?.toLowerCase().includes("swahili"),
      );
      const zuluVoices = data.voices.filter(
        (v) =>
          v.language_codes?.some((code) => code.startsWith("zu")) ||
          v.name?.toLowerCase().includes("zulu"),
      );

      console.log("🎤 [DEBUG] Swahili voices:", swahiliVoices);
      console.log("🎤 [DEBUG] Zulu voices:", zuluVoices);
    }

    return data;
  } catch (error) {
    console.error("❌ [DEBUG] Error fetching voices:", error);
    return null;
  }
}

/**
 * ============================================================
 * YARNGPT SPEECH FUNCTION (For Nigerian Languages)
 * ============================================================
 */

/**
 * Generates speech using YarnGPT API for Nigerian languages
 * @param {string} text - The text to speak
 * @param {string} language - The language code (yoruba, igbo, hausa)
 */
async function speakWithYarnGPT(text, language) {
  console.log(
    `🔊 [DEBUG] speakWithYarnGPT called with text: "${text}", language: "${language}"`,
  );

  const langData = languages[language];
  const voiceToUse = langData.voiceName;

  console.log(`📖 [DEBUG] Language data for ${language}:`, {
    name: langData.name,
    speechLang: langData.speechLang,
    voiceName: voiceToUse,
    useYarnGPT: langData.useYarnGPT,
  });

  if (!YARNGPT_API_KEY || YARNGPT_API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("⚠️ [DEBUG] No YarnGPT API key found. Using browser TTS.");
    speakWithBrowserTTS(text, langData.speechLang);
    return;
  }

  console.log("📤 [DEBUG] Sending request to YarnGPT API...");
  console.log("  - URL:", YARNGPT_API_URL);
  console.log("  - Text:", text);
  console.log("  - Voice:", voiceToUse);
  console.log("  - Format: mp3");

  try {
    const startTime = Date.now();
    const response = await fetch(YARNGPT_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YARNGPT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        voice: voiceToUse,
        response_format: "mp3",
      }),
    });

    const elapsedTime = Date.now() - startTime;
    console.log(`⏱️ [DEBUG] API request took ${elapsedTime}ms`);

    if (!response.ok) {
      console.error(
        `❌ [DEBUG] API error: ${response.status} ${response.statusText}`,
      );
      console.log("🔄 [DEBUG] API failed, falling back to browser TTS");
      speakWithBrowserTTS(text, langData.speechLang);
      return;
    }

    console.log("✅ [DEBUG] API request successful");
    const audioBlob = await response.blob();
    console.log(
      `🎵 [DEBUG] Audio blob size: ${(audioBlob.size / 1024).toFixed(2)} KB`,
    );

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      console.log("🔚 [DEBUG] Audio playback finished, cleaning up URL");
      URL.revokeObjectURL(audioUrl);
    };

    audio.onerror = (error) => {
      console.error("❌ [DEBUG] Audio playback error:", error);
      speakWithBrowserTTS(text, langData.speechLang);
    };

    console.log("▶️ [DEBUG] Starting audio playback...");
    await audio.play();
    console.log("✅ [DEBUG] Audio playback initiated successfully");
  } catch (error) {
    console.error("❌ [DEBUG] YarnGPT API error:", error);
    speakWithBrowserTTS(text, langData.speechLang);
  }
}

/**
 * ============================================================
 * VOICEMAKER SPEECH FUNCTION (For Swahili & Zulu)
 * ============================================================
 */

/**
 * Generates speech using Voicemaker API for Swahili & Zulu
 * @param {string} text - The text to speak
 * @param {string} language - The language code (swahili, zulu)
 */
async function speakWithVoicemaker(text, language) {
  console.log(
    `🔊 [DEBUG] speakWithVoicemaker called with text: "${text}", language: "${language}"`,
  );

  const langData = languages[language];

  // Use the correct voice ID and language code
  const voiceId = langData.voiceId || "ai3-Jony";
  const languageCode = langData.speechLang || "sw"; // sw for Swahili, zu for Zulu

  console.log(`📖 [DEBUG] Language data for ${language}:`, {
    name: langData.name,
    speechLang: languageCode,
    voiceId: voiceId,
    useVoicemaker: langData.useVoicemaker,
  });

  if (!VOICEMAKER_API_KEY || VOICEMAKER_API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("⚠️ [DEBUG] No Voicemaker API key found. Using browser TTS.");
    speakWithBrowserTTS(text, languageCode);
    return;
  }

  // Prepare the request body according to Voicemaker API spec
  const requestBody = {
    VoiceId: voiceId,
    LanguageCode: languageCode,
    Text: text,
    OutputFormat: "mp3",
    SampleRate: "48000",
    ResponseType: "stream", // Returns audio buffer directly
    MasterVolume: "0",
    MasterSpeed: "0",
    MasterPitch: "0",
  };

  console.log("📤 [DEBUG] Sending request to Voicemaker API...");
  console.log("  - URL:", VOICEMAKER_API_URL);
  console.log("  - Request Body:", JSON.stringify(requestBody, null, 2));

  try {
    const startTime = Date.now();
    const response = await fetch(VOICEMAKER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VOICEMAKER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const elapsedTime = Date.now() - startTime;
    console.log(`⏱️ [DEBUG] API request took ${elapsedTime}ms`);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        console.error("❌ [DEBUG] API error details:", errorData);
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch (e) {
        // If response isn't JSON, just use status text
        errorMessage += ` - ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    // Check if response is audio (success) or JSON (error)
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      // This is likely an error response
      const errorData = await response.json();
      console.error("❌ [DEBUG] API returned error:", errorData);
      throw new Error(`API error: ${JSON.stringify(errorData)}`);
    }

    console.log("✅ [DEBUG] Voicemaker API request successful");

    // Get audio data
    const audioBlob = await response.blob();
    console.log(
      `🎵 [DEBUG] Audio blob size: ${(audioBlob.size / 1024).toFixed(2)} KB`,
    );

    if (audioBlob.size === 0) {
      throw new Error("Received empty audio file");
    }

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      console.log("🔚 [DEBUG] Audio playback finished, cleaning up URL");
      URL.revokeObjectURL(audioUrl);
    };

    audio.onerror = (error) => {
      console.error("❌ [DEBUG] Audio playback error:", error);
      console.log("🔄 [DEBUG] Falling back to browser TTS");
      speakWithBrowserTTS(text, languageCode);
    };

    console.log("▶️ [DEBUG] Starting audio playback...");
    await audio.play();
    console.log("✅ [DEBUG] Audio playback initiated successfully");
  } catch (error) {
    console.error("❌ [DEBUG] Voicemaker API error:", error.message);
    console.log("🔄 [DEBUG] Falling back to browser TTS");
    speakWithBrowserTTS(text, languageCode);
  }
}

/**
 * ============================================================
 * BROWSER TTS FALLBACK
 * ============================================================
 */

/**
 * Browser-based Text-to-Speech fallback
 * @param {string} text - The text to speak
 * @param {string} langCode - Language code (e.g., "yo-NG")
 */
function speakWithBrowserTTS(text, langCode) {
  console.log(
    `🔊 [DEBUG] speakWithBrowserTTS called with text: "${text}", langCode: "${langCode}"`,
  );

  if (!window.speechSynthesis) {
    console.error("❌ [DEBUG] Speech synthesis not supported in this browser");
    alert("Speech is not supported in this browser.");
    return;
  }

  console.log("🔄 [DEBUG] Using browser TTS");

  const voices = window.speechSynthesis.getVoices();
  console.log("  - Available voices:", voices.length);

  let selectedVoice = null;
  if (langCode) {
    const langPrefix = langCode.split("-")[0];
    selectedVoice = voices.find((voice) => voice.lang.startsWith(langPrefix));
    if (selectedVoice) {
      console.log(
        `  - Found matching voice: ${selectedVoice.name} (${selectedVoice.lang})`,
      );
    } else {
      console.log(`  - No matching voice found for ${langCode}, using default`);
    }
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode || "en-US";

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 0.85;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    console.log(`▶️ [DEBUG] Browser TTS started for: "${text}"`);
  };

  utterance.onend = () => {
    console.log("🔚 [DEBUG] Browser TTS finished");
  };

  utterance.onerror = (error) => {
    console.error("❌ [DEBUG] Browser TTS error:", error);
  };

  console.log(
    `🎤 [DEBUG] Speaking with lang: ${utterance.lang}, rate: ${utterance.rate}, pitch: ${utterance.pitch}`,
  );
  if (utterance.voice) {
    console.log(`  - Voice: ${utterance.voice.name}`);
  }
  window.speechSynthesis.speak(utterance);
}

/**
 * ============================================================
 * MAIN SPEECH FUNCTION - Routes to appropriate TTS
 * ============================================================
 */

/**
 * Main speech function that routes to the appropriate TTS system
 * @param {string} text - The text to speak
 * @param {string} langCode - Language code (for fallback)
 */
async function speak(text, langCode) {
  console.log(
    `🔊 [DEBUG] speak() called with text: "${text}", langCode: "${langCode}"`,
  );

  const selectedLang = languageSelect.value;
  const langData = languages[selectedLang];
  console.log(`📌 [DEBUG] Selected language: ${selectedLang}`);

  if (langData.useYarnGPT) {
    console.log(`🎯 [DEBUG] Using YarnGPT for ${selectedLang}`);
    await speakWithYarnGPT(text, selectedLang);
  } else if (langData.useVoicemaker) {
    console.log(`🎯 [DEBUG] Using Voicemaker for ${selectedLang}`);
    await speakWithVoicemaker(text, selectedLang);
  } else {
    console.log(`🎯 [DEBUG] Using browser TTS for ${selectedLang}`);
    speakWithBrowserTTS(text, langData.speechLang);
  }
}

/**
 * ============================================================
 * RENDER GAME
 * ============================================================
 */

/**
 * Renders the main game interface with drop zones and word cards
 */
function renderGame() {
  console.log("🎮 [DEBUG] renderGame() called");

  const selectedLanguage = languages[languageSelect.value];
  console.log(
    `📌 [DEBUG] Selected language: ${selectedLanguage.name} (${languageSelect.value})`,
  );

  dropList.innerHTML = "";
  wordBank.innerHTML = "";
  feedback.textContent = "Start dragging the words from the right.";
  scoreCard.textContent = `Score: 0 / ${bodyParts.length}`;

  correctAnswerCard.innerHTML = `
    <strong>Correct Answer</strong>
    <span>Check your result to see missed answers.</span>
  `;

  console.log("🔄 [DEBUG] Creating drop zones...");
  bodyParts.forEach((part, index) => {
    const row = document.createElement("div");
    row.className = "drop-row";

    const emptyBox = document.createElement("div");
    emptyBox.className = "empty-box";
    emptyBox.dataset.answer = part.key;
    emptyBox.textContent = "Drop here";

    emptyBox.addEventListener("dragover", (event) => {
      event.preventDefault();
      emptyBox.classList.add("over");
    });

    emptyBox.addEventListener("dragleave", () => {
      emptyBox.classList.remove("over");
    });

    emptyBox.addEventListener("drop", (event) => {
      event.preventDefault();
      emptyBox.classList.remove("over", "correct", "wrong");

      const draggedKey = event.dataTransfer.getData("text/plain");
      const word = selectedLanguage.parts[draggedKey];

      console.log(`📦 [DEBUG] Dropped "${draggedKey}" into "${part.key}"`);
      console.log(`  - Dropped word: "${word}"`);

      emptyBox.textContent = word;
      emptyBox.dataset.dropped = draggedKey;

      const draggedCard = document.querySelector(
        `[data-card-key="${draggedKey}"]`,
      );
      if (draggedCard) {
        draggedCard.classList.add("used");
        console.log(`  - Marked card "${draggedKey}" as used`);
      }
    });

    const english = document.createElement("div");
    english.className = "english-label";
    english.textContent = part.english;

    row.appendChild(emptyBox);
    row.appendChild(english);
    dropList.appendChild(row);
  });
  console.log(`✅ [DEBUG] Created ${bodyParts.length} drop zones`);

  console.log("🔄 [DEBUG] Creating word cards...");
  const shuffledParts = shuffle(bodyParts);
  shuffledParts.forEach((part) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.draggable = true;
    card.dataset.cardKey = part.key;

    const word = document.createElement("span");
    const translation = selectedLanguage.parts[part.key];
    word.textContent = translation;

    const soundButton = document.createElement("button");
    soundButton.className = "sound-btn";
    soundButton.type = "button";
    soundButton.textContent = "🔊";

    let ttsMethod = "Browser TTS";
    if (selectedLanguage.useYarnGPT) {
      ttsMethod = "YarnGPT";
    } else if (selectedLanguage.useVoicemaker) {
      ttsMethod = "Voicemaker";
    }
    soundButton.title = `Hear ${translation} (${ttsMethod})`;

    soundButton.addEventListener("click", async (event) => {
      event.stopPropagation();
      console.log(
        `🔊 [DEBUG] Sound button clicked for "${part.key}" (${translation}) using ${ttsMethod}`,
      );
      const textToSpeak = selectedLanguage.parts[part.key];
      await speak(textToSpeak, selectedLanguage.speechLang);
    });

    card.appendChild(word);
    card.appendChild(soundButton);

    card.addEventListener("dragstart", (event) => {
      console.log(`🔄 [DEBUG] Drag started for "${part.key}"`);
      event.dataTransfer.setData("text/plain", part.key);
    });

    wordBank.appendChild(card);
  });
  console.log(`✅ [DEBUG] Created ${bodyParts.length} word cards`);
  console.log("✅ [DEBUG] Game rendered successfully");
}

/**
 * ============================================================
 * CHECK ANSWERS
 * ============================================================
 */

function checkAnswers() {
  console.log("📝 [DEBUG] checkAnswers() called");

  const selectedLanguage = languages[languageSelect.value];
  const boxes = document.querySelectorAll(".empty-box");
  let score = 0;
  let missingOrWrongAnswers = [];

  console.log(
    `📊 [DEBUG] Checking ${boxes.length} boxes for language: ${selectedLanguage.name}`,
  );

  boxes.forEach((box, index) => {
    box.classList.remove("correct", "wrong");

    const correctKey = box.dataset.answer;
    const correctWord = selectedLanguage.parts[correctKey];
    const englishName = bodyParts.find(
      (part) => part.key === correctKey,
    ).english;

    const isCorrect = box.dataset.dropped === correctKey;
    console.log(
      `  - Box ${index + 1}: "${englishName}" - ${isCorrect ? "✅ Correct" : "❌ Wrong"}`,
    );
    console.log(
      `      Expected: "${correctWord}", Got: "${box.dataset.dropped ? selectedLanguage.parts[box.dataset.dropped] : "No answer"}"`,
    );

    if (isCorrect) {
      box.classList.add("correct");
      box.textContent = correctWord;
      score++;
    } else {
      box.classList.add("wrong");
      const currentAnswer = box.dataset.dropped
        ? selectedLanguage.parts[box.dataset.dropped]
        : "No answer";

      box.innerHTML = `
        <span>${currentAnswer}</span>
        <span class="answer-hint">Correct: ${correctWord}</span>
      `;
      missingOrWrongAnswers.push(`${englishName}: ${correctWord}`);
    }
  });

  scoreCard.textContent = `Score: ${score} / ${bodyParts.length}`;
  console.log(`📊 [DEBUG] Final score: ${score}/${bodyParts.length}`);

  if (score === bodyParts.length) {
    console.log("🎉 [DEBUG] Perfect score!");
    correctAnswerCard.innerHTML = `
      <strong>🎉 Perfect!</strong>
      <span>All answers are correct. Great job!</span>
    `;
    feedback.textContent = "Excellent! You matched every body part correctly.";
  } else {
    console.log(`📝 [DEBUG] Missed ${bodyParts.length - score} answers`);
    console.log("❌ [DEBUG] Wrong/missing answers:", missingOrWrongAnswers);
    correctAnswerCard.innerHTML = `
      <strong>📝 Correct Answers</strong>
      <span>${missingOrWrongAnswers.join("<br>")}</span>
    `;
    feedback.textContent = `You got ${score} out of ${bodyParts.length}. See the correct answers above.`;
  }
}

/**
 * ============================================================
 * FIGURE TOGGLE
 * ============================================================
 */

figureSelect.addEventListener("change", () => {
  const showFemale = figureSelect.value === "female";
  console.log(`🔄 [DEBUG] Figure toggle: ${showFemale ? "Female" : "Male"}`);
  femaleFigure.style.display = showFemale ? "block" : "none";
  maleFigure.style.display = showFemale ? "none" : "block";
});

/**
 * ============================================================
 * EVENT LISTENERS
 * ============================================================
 */
languageSelect.addEventListener("change", () => {
  console.log(`🔄 [DEBUG] Language changed to: ${languageSelect.value}`);
  renderGame();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  console.log("🔄 [DEBUG] Reset button clicked");
  renderGame();
});

document.getElementById("checkBtn").addEventListener("click", () => {
  console.log("✅ [DEBUG] Check button clicked");
  checkAnswers();
});

/**
 * ============================================================
 * LIST VOICES ON STARTUP (For Debugging)
 * ============================================================
 */
console.log("🔍 [DEBUG] Fetching available Voicemaker voices...");
setTimeout(() => {
  listVoicemakerVoices();
}, 2000);

/**
 * ============================================================
 * INITIALIZE GAME
 * ============================================================
 */
console.log("🚀 [DEBUG] Initializing game...");
languageSelect.value = "yoruba";
renderGame();

/**
 * ============================================================
 * API CONNECTION NOTE
 * ============================================================
 */
console.log(`
═══════════════════════════════════════════════════════════
✅ African Languages Body Parts Game - Initialized (Hybrid)
═══════════════════════════════════════════════════════════
📚 YarnGPT API: ${YARNGPT_API_KEY && YARNGPT_API_KEY !== "YOUR_API_KEY_HERE" ? "✅ Connected" : "❌ Disconnected"}
🔊 Voicemaker API: ${VOICEMAKER_API_KEY ? "✅ Connected" : "❌ Disconnected"}
🎤 TTS System:
   - Yoruba, Igbo, Hausa: YarnGPT (Premium Nigerian voices)
   - Swahili, Zulu: Voicemaker (Neural TTS)
   - Fallback: Browser TTS
🌍 Available Languages: ${Object.keys(languages).join(", ")}
📦 Total Body Parts: ${bodyParts.length}
═══════════════════════════════════════════════════════════
`);

console.log("🛠️ [DEBUG] Available debug commands:");
console.log("  - checkAnswers() - Check current answers");
console.log("  - renderGame() - Re-render the game");
console.log("  - speak(text, lang) - Test speech");
console.log("  - listVoicemakerVoices() - List available voices");
console.log("  - speakWithVoicemaker(text, lang) - Force Voicemaker TTS");
console.log("  - speakWithBrowserTTS(text, langCode) - Force browser TTS");
console.log("  - bodyParts - View body parts data");
console.log("  - languages - View language data");
