import { useState, useEffect, useRef } from "react";
import { 
  Cpu, 
  Terminal, 
  Key, 
  Play, 
  AlertCircle, 
  Download, 
  Clipboard, 
  Check, 
  Volume2, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Settings,
  HelpCircle,
  Code
} from "lucide-react";

// @ts-ignore
import robotBg from "./assets/images/robot_books_bg_1783709303606.jpg";

// Helper to generate the exact standalone HTML file requested by the user
function generateStandaloneHtml(prefilledApiKey: string = "", prefilledText: string = "") {
  return `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Senyor Robot - Generador de Veu (Standalone Portable)</title>
  <!-- Tailwind Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Space Grotesk', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    @keyframes soundWave {
      0%, 100% { height: 4px; }
      50% { height: 28px; }
    }
    .wave-bar {
      animation: soundWave 1.2s ease-in-out infinite;
    }
    .retro-grid {
      background-image: radial-gradient(#000 1.2px, transparent 1.2px);
      background-size: 20px 20px;
    }
  </style>
</head>
<body class="bg-[#FCF8F2] text-zinc-900 font-sans min-h-screen selection:bg-amber-400 selection:text-zinc-900 retro-grid flex items-center justify-center p-4 sm:p-8 relative">

  <div class="w-full max-w-2xl bg-white border-4 border-zinc-900 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] relative">
    
    <!-- Subtle Catalan flag ribbon at the top margin -->
    <div class="h-2 w-full flex">
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-yellow-400"></div>
      <div class="flex-1 bg-red-600"></div>
    </div>

    <!-- Header/Terminal Bar -->
    <div class="bg-zinc-100 border-b-4 border-zinc-900 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500 border border-zinc-900"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-400 border border-zinc-900"></div>
        <div class="w-3 h-3 rounded-full bg-green-500 border border-zinc-900"></div>
        <span class="text-zinc-700 font-mono text-[11px] font-bold pl-2">SYSTEM://SENYOR_ROBOT_TTS</span>
      </div>
      <div class="flex items-center space-x-1.5 text-xs text-zinc-900 font-bold bg-amber-400 border-2 border-zinc-900 px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        <span>STANDALONE PORTABLE</span>
      </div>
    </div>

    <!-- Body Panel -->
    <div class="p-6 sm:p-8 space-y-6">
      
      <!-- App Title -->
      <div class="text-center space-y-2">
        <div class="inline-flex items-center space-x-2 bg-yellow-100 border-2 border-zinc-900 px-3 py-1 rounded-full text-xs font-black font-mono text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex space-x-0.5 h-3 shrink-0">
            <div class="w-0.5 bg-yellow-400"></div>
            <div class="w-0.5 bg-red-600"></div>
            <div class="w-0.5 bg-yellow-400"></div>
            <div class="w-0.5 bg-red-600"></div>
            <div class="w-0.5 bg-yellow-400"></div>
            <div class="w-0.5 bg-red-600"></div>
            <div class="w-0.5 bg-yellow-400"></div>
            <div class="w-0.5 bg-red-600"></div>
            <div class="w-0.5 bg-yellow-400"></div>
          </div>
          <span>CATALÀ ACTIU ⭐⭐⭐⭐</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
          Senyor Robot <span class="text-[#FF6F3B]">[Veu Clonada]</span>
        </h1>
        <p class="text-zinc-600 text-sm font-medium">Panell de control de veu connectat directament a ElevenLabs</p>
      </div>

      <!-- ElevenLabs API Key Field -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label for="api-key" class="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center">
            <span class="mr-1.5">🔑</span> ElevenLabs API Key
          </label>
          <span class="text-[10px] font-mono text-zinc-500 font-bold">Local Storage Actiu</span>
        </div>
        <div class="relative">
          <input 
            type="password" 
            id="api-key" 
            class="w-full bg-[#FCFBF9] border-3 border-zinc-900 rounded-2xl px-4 py-3.5 text-sm text-zinc-900 font-mono placeholder-zinc-400 focus:outline-none focus:border-[#FF6F3B]"
            placeholder="Insereix la teva ElevenLabs API Key aquí..."
            value="${prefilledApiKey}"
          >
          <button 
            type="button" 
            onclick="togglePasswordVisibility()" 
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <span id="eye-icon">👁️</span>
          </button>
        </div>
      </div>

      <!-- Preset Catalan Phrases -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-zinc-700 uppercase tracking-wider block font-mono">
          ⚡ Frases predefinides del Senyor Robot:
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button 
            onclick="setPresetText('Hola, sóc el Senyor Robot. El sistema ha estat reiniciat correctament.')"
            class="bg-[#EAF4F9] hover:bg-[#D5EAF4] text-left px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 font-bold text-zinc-800 transition-all duration-150 font-mono truncate hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
          >
            &gt; Reinici de sistema...
          </button>
          <button 
            onclick="setPresetText('La seguretat és només una il·lusió. Tot és vulnerable en aquesta xarxa.')"
            class="bg-[#EAF4F9] hover:bg-[#D5EAF4] text-left px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 font-bold text-zinc-800 transition-all duration-150 font-mono truncate hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
          >
            &gt; La seguretat és una il·lusió...
          </button>
          <button 
            onclick="setPresetText('La tecnologia ens dóna el poder, però depèn de nosaltres com utilitzar-lo.')"
            class="bg-[#EAF4F9] hover:bg-[#D5EAF4] text-left px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 font-bold text-zinc-800 transition-all duration-150 font-mono truncate hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
          >
            &gt; Tecnologia i poder...
          </button>
          <button 
            onclick="setPresetText('Si vols canviar el món, primer has d\\\'entendre com funciona el seu codi.')"
            class="bg-[#EAF4F9] hover:bg-[#D5EAF4] text-left px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 font-bold text-zinc-800 transition-all duration-150 font-mono truncate hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
          >
            &gt; Comprendre el codi...
          </button>
        </div>
      </div>

      <!-- Textarea Input -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label for="text" class="text-xs font-bold text-zinc-700 uppercase tracking-wider block font-mono">
            💬 Text per a sintetitzar (Català)
          </label>
          <span id="char-counter" class="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-600 border border-zinc-300 px-2 py-0.5 rounded">0 caràcters</span>
        </div>
        <textarea 
          id="text" 
          rows="5"
          class="w-full bg-[#FCFBF9] border-3 border-zinc-900 rounded-2xl p-4 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FF6F3B] transition-all duration-200 resize-none font-medium"
          placeholder="Escriu aquí el que vols que llegeixi el Senyor Robot en català..."
        >${prefilledText}</textarea>
      </div>

      <!-- Error message container -->
      <div id="error-container" class="hidden bg-red-100 border-2 border-red-900 rounded-2xl p-4 text-red-900 text-xs flex items-start space-x-2 font-mono">
        <span class="text-sm">⚠️</span>
        <div>
          <span class="font-bold uppercase block mb-1">Error de Laboratori</span>
          <span id="error-message">Detalls de l'error aquí...</span>
        </div>
      </div>

      <!-- Generation status & visual soundwave -->
      <div class="flex flex-col items-center justify-center space-y-3 py-2 border-t-2 border-dashed border-zinc-200">
        <!-- Soundwave (hidden initially) -->
        <div id="soundwave-container" class="hidden flex items-center justify-center space-x-2 h-8">
          <span class="w-1.5 bg-[#FF6F3B] rounded-full wave-bar h-2 border border-black" style="animation-delay: 0.1s"></span>
          <span class="w-1.5 bg-[#4895EF] rounded-full wave-bar h-4 border border-black" style="animation-delay: 0.25s"></span>
          <span class="w-1.5 bg-yellow-400 rounded-full wave-bar h-6 border border-black" style="animation-delay: 0.4s"></span>
          <span class="w-1.5 bg-[#FF6F3B] rounded-full wave-bar h-3 border border-black" style="animation-delay: 0.15s"></span>
          <span class="w-1.5 bg-[#4895EF] rounded-full wave-bar h-5 border border-black" style="animation-delay: 0.3s"></span>
          <span class="w-1.5 bg-yellow-400 rounded-full wave-bar h-2 border border-black" style="animation-delay: 0.5s"></span>
        </div>
        <div id="status-text" class="text-xs font-mono font-bold text-zinc-500">
          Llest per a sintetitzar amb Voice ID: GIQA1VfAzWPvuujOxACW
        </div>
      </div>

      <!-- Main Action button -->
      <button 
        id="generate-btn" 
        onclick="generateVoice()"
        class="w-full bg-[#FF6F3B] hover:bg-[#ff8559] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-150 transform hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] border-3 border-zinc-900 font-mono text-center tracking-wide shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] cursor-pointer flex items-center justify-center space-x-2"
      >
        <span>🔊</span> <span>SINTETITZAR I REPRODUIR VEU</span>
      </button>

      <!-- Native HTML5 audio player (hidden initially) -->
      <div id="audio-container" class="hidden space-y-2 pt-2 border-t-2 border-dashed border-zinc-200">
        <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block text-center font-bold">Àudio generat d'ElevenLabs</span>
        <audio id="audio-player" controls class="w-full bg-[#FAF6F0] border-2 border-zinc-900 rounded-xl p-1 text-zinc-900"></audio>
      </div>

    </div>

    <!-- Terminal Footer -->
    <div class="bg-zinc-100 border-t-4 border-zinc-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 gap-2 font-bold">
      <span>Voice ID: GIQA1VfAzWPvuujOxACW</span>
      <span>Model: eleven_multilingual_v2</span>
    </div>
  </div>

  <script>
    // Load stored key on start
    document.addEventListener('DOMContentLoaded', () => {
      const savedKey = localStorage.getItem('elevenlabs_api_key');
      if (savedKey) {
        document.getElementById('api-key').value = savedKey;
      }
      
      const textInput = document.getElementById('text');
      updateCharCounter();
      textInput.addEventListener('input', updateCharCounter);
    });

    function updateCharCounter() {
      const length = document.getElementById('text').value.length;
      document.getElementById('char-counter').textContent = length + ' caràcters';
    }

    function togglePasswordVisibility() {
      const keyInput = document.getElementById('api-key');
      const eyeIcon = document.getElementById('eye-icon');
      if (keyInput.type === 'password') {
        keyInput.type = 'text';
        eyeIcon.textContent = '🕶️';
      } else {
        keyInput.type = 'password';
        eyeIcon.textContent = '👁️';
      }
    }

    function setPresetText(text) {
      document.getElementById('text').value = text;
      updateCharCounter();
    }

    async function generateVoice() {
      const apiKey = document.getElementById('api-key').value.trim();
      const text = document.getElementById('text').value.trim();
      
      const generateBtn = document.getElementById('generate-btn');
      const statusText = document.getElementById('status-text');
      const soundWave = document.getElementById('soundwave-container');
      const audioContainer = document.getElementById('audio-container');
      const audioPlayer = document.getElementById('audio-player');
      const errorContainer = document.getElementById('error-container');

      // Clear previous states
      errorContainer.classList.add('hidden');
      
      if (!apiKey) {
        showError('Si us plau, introdueix la teva ElevenLabs API Key per connectar al laboratori.');
        return;
      }
      
      if (!text) {
        showError('Si us plau, escriu algun text en català perquè el Senyor Robot pugui parlar.');
        return;
      }

      // Save key in localStorage
      localStorage.setItem('elevenlabs_api_key', apiKey);

      // Set loading state
      generateBtn.disabled = true;
      generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
      statusText.textContent = 'Processant àudio de llauna...';
      statusText.classList.remove('text-zinc-500');
      statusText.classList.add('text-[#FF6F3B]');
      soundWave.classList.remove('hidden');

      try {
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/GIQA1VfAzWPvuujOxACW', {
          method: 'POST',
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.95,
              similarity_boost: 0.35,
              style: 0.0,
              use_speaker_boost: true
            }
          })
        });

        if (!response.ok) {
          const textError = await response.text();
          let parsedError = 'No s\\\'ha pogut connectar amb ElevenLabs.';
          try {
            const jsonErr = JSON.parse(textError);
            if (jsonErr.detail && jsonErr.detail.message) {
              parsedError = jsonErr.detail.message;
            }
          } catch(e) {
            parsedError = 'Codi d\\\'error HTTP: ' + response.status;
          }
          throw new Error(parsedError);
        }

        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error('La resposta de l\\\'API està buida (mida 0).');
        }

        const audioUrl = URL.createObjectURL(blob);
        
        audioPlayer.src = audioUrl;
        audioContainer.classList.remove('hidden');
        statusText.textContent = 'Àudio generat amb èxit! Reproduint...';
        
        audioPlayer.play().catch(err => {
          console.warn('Auto-play previngut pel navegador. Si us plau, clica el botó Play natiu del reproductor.', err);
          statusText.textContent = 'Àudio generat. Clica Play per escoltar.';
        });

      } catch (err) {
        showError(err.message || 'Error desconegut sintetitzant el text.');
        statusText.textContent = 'Error en la generació.';
        statusText.classList.remove('text-[#FF6F3B]');
        statusText.classList.add('text-red-600');
      } finally {
        generateBtn.disabled = false;
        generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        soundWave.classList.add('hidden');
      }
    }

    function showError(msg) {
      const errorContainer = document.getElementById('error-container');
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = msg;
      errorContainer.classList.remove('hidden');
    }
  </script>
</body>
</html>`;
}

export default function App() {
  const [apiKey, setApiKey] = useState("sk_2f652b2bc47cc8cdaef8440895ef26b787ca691f831b1c61");
  const [showKey, setShowKey] = useState(false);
  const [text, setText] = useState("Hola, sóc el Senyor Robot. La tecnologia ens dóna el poder, però depèn de nosaltres com utilitzar-lo.");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedVoiceId, setCopiedVoiceId] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Llest per a sintetitzar amb Voice ID.");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const voiceId = "GIQA1VfAzWPvuujOxACW";
  const modelId = "eleven_multilingual_v2";

  // Preset quotes for Mr. Robot in Catalan
  const presets = [
    {
      title: "Reinici de sistema",
      text: "Hola, sóc el Senyor Robot. El sistema ha estat reiniciat correctament."
    },
    {
      title: "Il·lusió de seguretat",
      text: "La seguretat és només una il·lusió. Tot és vulnerable en aquesta xarxa si saps on buscar."
    },
    {
      title: "Tecnologia i poder",
      text: "La tecnologia ens dóna el poder, però depèn de nosaltres com utilitzar-lo de veritat."
    },
    {
      title: "Comprendre el codi",
      text: "Si vols canviar el món, primer has d'entendre com funciona el seu codi."
    }
  ];

  // Load API Key from LocalStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("elevenlabs_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      // Default to the user's provided key
      localStorage.setItem("elevenlabs_api_key", "sk_2f652b2bc47cc8cdaef8440895ef26b787ca691f831b1c61");
    }
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("elevenlabs_api_key", val);
  };

  const handlePresetSelect = (presetText: string) => {
    setText(presetText);
    setError(null);
  };

  const handleGenerateVoice = async () => {
    setError(null);
    if (!apiKey.trim()) {
      setError("Si us plau, introdueix la teva ElevenLabs API Key per connectar al laboratori.");
      return;
    }
    if (!text.trim()) {
      setError("Si us plau, escriu algun text en català perquè el Senyor Robot pugui parlar.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Processant àudio de llauna...");
    setAudioUrl(null);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey.trim(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: modelId,
          voice_settings: {
            stability: 0.95,
            similarity_boost: 0.35,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const textError = await response.text();
        let parsedError = "No s'ha pogut connectar amb ElevenLabs de forma correcta.";
        try {
          const jsonErr = JSON.parse(textError);
          if (jsonErr.detail && jsonErr.detail.message) {
            parsedError = jsonErr.detail.message;
          }
        } catch (e) {
          parsedError = `Codi d'error HTTP: ${response.status}`;
        }
        throw new Error(parsedError);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("La resposta d'ElevenLabs ha arribat buida.");
      }

      const objectUrl = URL.createObjectURL(blob);
      setAudioUrl(objectUrl);
      setStatusMessage("Àudio generat amb èxit! Reproduint...");

      // Attempt immediate playback after state update
      setTimeout(() => {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play().catch(err => {
            console.warn("Autoplay bloquejat pel navegador. Clica el botó de Play.", err);
            setStatusMessage("Àudio generat amb èxit. Clica 'Play' per escoltar.");
          });
        }
      }, 100);

    } catch (err: any) {
      setError(err.message || "S'ha produït un error desconegut sintetitzant el text.");
      setStatusMessage("Error en la generació de veu.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyVoiceIdToClipboard = () => {
    navigator.clipboard.writeText(voiceId);
    setCopiedVoiceId(true);
    setTimeout(() => setCopiedVoiceId(false), 2000);
  };

  const copyCodeToClipboard = () => {
    const code = generateStandaloneHtml(apiKey, text);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const downloadStandaloneHtml = () => {
    const code = generateStandaloneHtml(apiKey, text);
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "senyor-robot-tts.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="app" class="bg-[#FCF8F2] text-zinc-900 font-sans min-h-screen selection:bg-amber-400 selection:text-zinc-900 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative manga dot grid background pattern */}
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
      
      {/* Dynamic background illustration watermark */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-[size:auto_35%] bg-bottom md:bg-right-bottom opacity-[0.05] pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url(${robotBg})` }}
      ></div>
      
      <div class="max-w-5xl mx-auto space-y-8 relative">
        
        {/* Upper Dashboard Header */}
        <div class="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-zinc-900 pb-6 gap-4 relative">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <span class="p-2 bg-[#FF6F3B] rounded-2xl text-white border-3 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Cpu class="w-7 h-7" />
              </span>
              <div>
                <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 uppercase">
                  SENYOR ROBOT: TEXT A VEU EN CATALÀ (AMB VEU DE ROBOT)
                </h1>
              </div>
            </div>
            
            <p class="text-zinc-600 text-sm pl-0 md:pl-14 font-medium max-w-xl">
              Clonador de text a veu d'alta fidelitat basat en la tecnologia d'ElevenLabs.
            </p>
          </div>
          
          <div class="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
            {/* Subtle Catalan Flag Badge */}
            <div class="inline-flex items-center bg-yellow-100 border-3 border-zinc-900 px-3.5 py-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div class="flex space-x-0.5 h-4 shrink-0">
                <div class="w-1.5 bg-yellow-400"></div>
                <div class="w-1.5 bg-red-600"></div>
                <div class="w-1.5 bg-yellow-400"></div>
                <div class="w-1.5 bg-red-600"></div>
                <div class="w-1.5 bg-yellow-400"></div>
                <div class="w-1.5 bg-red-600"></div>
                <div class="w-1.5 bg-yellow-400"></div>
                <div class="w-1.5 bg-red-600"></div>
                <div class="w-1.5 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Robot Illustration Banner - Espai Intermedi */}
        <div class="flex justify-center items-center py-2 relative">
          <div class="max-w-sm w-full border-4 border-zinc-900 rounded-3xl p-3 bg-[#FCF8F2] shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
            <img 
              src={robotBg} 
              alt="Senyor Robot" 
              className="w-full h-auto object-contain rounded-2xl mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: API settings, voice profile & guide (when showAdvanced) */}
          {showAdvanced && (
            <div class="lg:col-span-5 space-y-6">
              
              {/* API Configuration Card */}
              <div class="bg-white border-4 border-zinc-900 rounded-3xl p-5 space-y-4 shadow-[6px_6px_0px_0px_#18181b] relative overflow-hidden">
                <div class="absolute top-0 right-0 h-1.5 w-20 bg-amber-500"></div>
                <div class="flex items-center space-x-2 text-zinc-900 font-mono text-xs uppercase tracking-wider font-bold">
                  <Key class="w-4 h-4 text-[#FF6F3B]" />
                  <span>Configuració de l'API</span>
                </div>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-zinc-600 font-mono font-bold">ELEVENLABS API KEY</span>
                    <span class="text-zinc-500 text-[10px] font-mono font-bold">Local Storage</span>
                  </div>
                  
                  <div class="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => handleApiKeyChange(e.target.value)}
                      className="w-full bg-[#FCFBF9] border-2 border-zinc-900 rounded-xl px-3.5 py-2.5 text-sm font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FF6F3B] transition-all duration-200"
                      placeholder="Escriu la teva API Key d'ElevenLabs..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {showKey ? <EyeOff class="w-4 h-4" /> : <Eye class="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <p class="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    La clau s'emmagatzema exclusivament al teu navegador mitjançant <code class="text-zinc-900 bg-zinc-100 px-1 rounded">localStorage</code>. Mai s'envia a cap servidor intermediari, es fa la crida directa de navegador a l'API d'ElevenLabs.
                  </p>
                </div>
              </div>

              {/* Voice Profile Metadata Card */}
              <div class="bg-white border-4 border-zinc-900 rounded-3xl p-5 space-y-4 font-mono text-xs shadow-[6px_6px_0px_0px_#18181b]">
                <div class="flex items-center space-x-2 text-zinc-900 uppercase tracking-wider font-bold">
                  <Settings class="w-4 h-4 text-[#FF6F3B]" />
                  <span>Perfil de Veu: Senyor Robot</span>
                </div>
                
                <div class="space-y-2.5 bg-[#FAF6F0] p-4 rounded-xl border-2 border-zinc-900">
                  <div class="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span class="text-zinc-500">VOICE_ID</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-zinc-900 font-bold">{voiceId}</span>
                      <button 
                        onClick={copyVoiceIdToClipboard} 
                        className="text-zinc-500 hover:text-zinc-900 transition-colors p-0.5"
                        title="Copiar Voice ID"
                      >
                        {copiedVoiceId ? <Check class="w-3.5 h-3.5 text-green-600" /> : <Clipboard class="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span class="text-zinc-500">STABILITY</span>
                    <span class="text-zinc-800 font-bold">95% (Estabilitat de metall)</span>
                  </div>
                  
                  <div class="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span class="text-zinc-500">SIM_BOOST</span>
                    <span class="text-zinc-800 font-bold">35% (Clonació precisa)</span>
                  </div>

                  <div class="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span class="text-zinc-500">STYLE</span>
                    <span class="text-zinc-800 font-bold">0.0 (Robòtic expressiu)</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-zinc-500">MODEL_ID</span>
                    <span class="text-[#FF6F3B] font-bold">{modelId}</span>
                  </div>
                </div>

                <div class="text-[11px] text-zinc-500 leading-relaxed bg-[#EAF4F9] p-3 rounded-xl border border-[#b2d9ed]">
                  ⚠️ <span class="text-zinc-700 font-bold">Nota de configuració:</span> S'ha configurat el model d'última generació d'alta fidelitat <code class="text-zinc-900">eleven_multilingual_v2</code> per assegurar que el clon llegeixi el text en un català perfecte, fluid i amb matisos realistes excel·lents.
                </div>
              </div>
            </div>
          )}

          {/* Main Column: Generation text area and controls */}
          <div class={`${showAdvanced ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl mx-auto w-full"} space-y-6 transition-all duration-300`}>
            
            <div class="bg-white border-4 border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden">
              
              {/* Subtle Catalan flag ribbon at the top margin */}
              <div class="absolute top-0 left-0 right-0 h-2 flex">
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
                <div class="flex-1 bg-yellow-400"></div>
                <div class="flex-1 bg-red-600"></div>
              </div>
              
              {/* Text Area Input */}
              <div class="space-y-3 pt-2">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-bold text-zinc-900 flex items-center space-x-2">
                    <span class="text-xl">💬</span>
                    <span>TEXT A SINTETITZAR (CATALÀ)</span>
                  </label>
                  <span class="text-xs font-mono font-bold bg-zinc-100 text-zinc-600 border border-zinc-300 px-2.5 py-1 rounded-md">
                    {text.length} caràcters
                  </span>
                </div>
                
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setError(null);
                  }}
                  rows={5}
                  className="w-full bg-[#FCFBF9] border-3 border-zinc-900 rounded-2xl p-4 text-base text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FF6F3B] focus:ring-2 focus:ring-[#FF6F3B]/20 transition-all duration-150 resize-none font-medium shadow-inner"
                  placeholder="Escriu aquí el text que vols que llegeixi el Senyor Robot en català..."
                />
              </div>

              {/* Presets Grid */}
              <div class="space-y-3">
                <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider block font-mono">
                  ⚡ FRASES PREDEFINIDES DEL SENYOR ROBOT:
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(preset.text)}
                      className="bg-[#EAF4F9] hover:bg-[#D5EAF4] border-2 border-zinc-900 rounded-xl px-4 py-3 text-left text-xs font-bold transition-all duration-150 text-zinc-800 font-mono hover:text-[#FF6F3B] hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] truncate flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span class="text-[#FF6F3B] font-extrabold">&gt;</span>
                      <span class="truncate">{preset.title}...</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Box */}
              {error && (
                <div class="bg-red-50 border-2 border-red-900 rounded-2xl p-4 text-red-900 text-xs flex items-start space-x-2.5 font-mono font-bold">
                  <AlertCircle class="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <span class="font-black uppercase block mb-0.5">Error de Laboratori</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Status and Active visualization */}
              <div class="flex flex-col items-center justify-center space-y-3 py-4 border-t-2 border-dashed border-zinc-200">
                
                {/* Visual Audio Pulsar bars in Capsule Corp colors (Sky blue & Orange-Red) */}
                <div class={`flex items-center justify-center space-x-2 h-10 ${isLoading ? "block" : "hidden"}`}>
                  <span class="w-1.5 bg-[#FF6F3B] rounded-full wave-bar h-2 border border-zinc-950" style={{ animationDelay: "0.1s" }}></span>
                  <span class="w-1.5 bg-[#4895EF] rounded-full wave-bar h-6 border border-zinc-950" style={{ animationDelay: "0.2s" }}></span>
                  <span class="w-1.5 bg-yellow-400 rounded-full wave-bar h-10 border border-zinc-950" style={{ animationDelay: "0.35s" }}></span>
                  <span class="w-1.5 bg-[#FF6F3B] rounded-full wave-bar h-5 border border-zinc-950" style={{ animationDelay: "0.15s" }}></span>
                  <span class="w-1.5 bg-[#4895EF] rounded-full wave-bar h-8 border border-zinc-950" style={{ animationDelay: "0.25s" }}></span>
                  <span class="w-1.5 bg-yellow-400 rounded-full wave-bar h-3 border border-zinc-950" style={{ animationDelay: "0.5s" }}></span>
                </div>

                {!isLoading && !audioUrl && (
                  <div class="w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400"></div>
                )}

                {audioUrl && !isLoading && (
                  <div class="flex items-center space-x-1.5 text-amber-600 animate-pulse text-xs font-bold font-mono bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    <Volume2 class="w-4 h-4 text-[#FF6F3B]" />
                    <span>ÀUDIO COMPILAT AMB ÈXIT</span>
                  </div>
                )}

                <span className={`text-xs font-mono font-bold ${isLoading ? "text-[#FF6F3B]" : "text-zinc-500"}`}>
                  {statusMessage}
                </span>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerateVoice}
                disabled={isLoading}
                className={`w-full font-mono font-black tracking-wider py-4.5 px-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex items-center justify-center space-x-2.5 transition-all duration-150 transform hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] border-3 border-zinc-900 cursor-pointer ${
                  isLoading
                    ? "bg-zinc-200 text-zinc-400 cursor-not-allowed border-zinc-400 shadow-none"
                    : "bg-[#FF6F3B] hover:bg-[#ff8559] text-white"
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw class="w-5 h-5 animate-spin text-zinc-400" />
                    <span>PROCESSANT ENLLAUNAT DE VEU...</span>
                  </>
                ) : (
                  <>
                    <Volume2 class="w-5 h-5 text-white" />
                    <span>SINTETITZAR I REPRODUIR VEU (CATALÀ)</span>
                  </>
                )}
              </button>

              {/* Native Audio element wrapper */}
              {audioUrl && (
                <div class="pt-4 border-t-2 border-dashed border-zinc-200 space-y-3">
                  <span class="text-xs font-mono text-zinc-500 uppercase tracking-widest block text-center font-bold">
                    REPRODUCTOR DE VEU SINTÈTICA
                  </span>
                  <audio
                    ref={audioPlayerRef}
                    src={audioUrl}
                    controls
                    className="w-full bg-[#FAF6F0] border-2 border-zinc-900 rounded-xl p-1 text-zinc-900"
                    id="audio-synth"
                  />
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Dynamic HTML Standalone Exporter Widget */}
        <div class="bg-white border-4 border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_0px_#18181b] relative overflow-hidden">
          {/* Subtle Catalan flag ribbon at the top margin */}
          <div class="absolute top-0 left-0 right-0 h-1.5 flex">
            <div class="flex-1 bg-yellow-400"></div>
            <div class="flex-1 bg-red-600"></div>
            <div class="flex-1 bg-yellow-400"></div>
            <div class="flex-1 bg-red-600"></div>
            <div class="flex-1 bg-yellow-400"></div>
            <div class="flex-1 bg-red-600"></div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-zinc-100">
            <div class="flex items-center space-x-2 text-zinc-900 font-bold text-sm uppercase">
              <Code class="w-4 h-4 text-[#FF6F3B]" />
              <span>Descarregar Clonador autònom (.html)</span>
            </div>
            
            <span class="bg-amber-100 text-[#FF6F3B] border-2 border-zinc-900 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              STANDALONE PORTABLE ⭐⭐⭐
            </span>
          </div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
            <p class="text-zinc-600 leading-relaxed max-w-2xl font-medium">
              Aquest laboratori d'aprenentatge ve amb un botó d'exportació recursiva. Pots obtenir un fitxer <code class="text-zinc-950 font-bold bg-zinc-100 px-1 rounded border border-zinc-200">index.html</code> autònom, que conté l'estil toriyamesc, l'estètica de la Senyera, els estils integrats i tota la lògica necessària per obrir-lo localment amb un doble clic!
            </p>
            
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Copy Code button */}
              <button
                onClick={copyCodeToClipboard}
                className="bg-white hover:bg-zinc-50 text-zinc-800 border-2 border-zinc-900 rounded-xl px-4 py-3 text-xs font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                title="Copiar codi HTML complet"
              >
                {copiedCode ? (
                  <>
                    <Check class="w-4 h-4 text-green-600" />
                    <span class="text-green-600 font-bold">COPIAT!</span>
                  </>
                ) : (
                  <>
                    <Clipboard class="w-4 h-4 text-zinc-700" />
                    <span>COPIAR CODI HTML</span>
                  </>
                )}
              </button>

              {/* Download File Button */}
              <button
                onClick={downloadStandaloneHtml}
                className="bg-[#4895EF] hover:bg-[#3f81d1] text-white border-2 border-zinc-900 rounded-xl px-4 py-3 text-xs font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                title="Descarregar fitxer index.html"
              >
                <Download class="w-4 h-4 text-white" />
                <span>DESCARREGAR .HTML</span>
              </button>
            </div>
          </div>
          
          <div class="text-[11px] text-zinc-500 leading-relaxed font-mono bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            * <span class="text-zinc-700 font-bold">Avís d'exportació:</span> Com que la clau de l'API d'ElevenLabs està integrada en aquest entorn, el document descarregat ja anirà <span class="text-[#FF6F3B] font-bold">pre-activat</span> amb les credencials del vostre professor perquè els alumnes el facin servir lliurement!
          </div>
        </div>

      </div>

    </div>
  );
}
