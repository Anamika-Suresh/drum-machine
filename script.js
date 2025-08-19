const { useEffect, useRef, useState } = React;

const bankOne = [
  { key: 'Q', id: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'A', id: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'S', id: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'D', id: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

const bankTwo = [
  { key: 'Q', id: 'Chord-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { key: 'W', id: 'Chord-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { key: 'A', id: 'Chord-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
  { key: 'S', id: 'Shaker', src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
  { key: 'D', id: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
  { key: 'Z', id: 'Punchy-Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
  { key: 'X', id: 'Side-Stick', src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
  { key: 'C', id: 'Snare', src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' },
];

function DrumPad({ pad, power, volume, onPlay }) {
  const btnRef = useRef(null);

  const play = () => {
    if (!power) return;
    const audio = btnRef.current.querySelector('audio');
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});
    btnRef.current.classList.add('playing');
    setTimeout(() => btnRef.current.classList.remove('playing'), 120);
    onPlay(pad.id);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toUpperCase() === pad.key) play();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [power, volume]);

  return (
    <button id={pad.id} className="drum-pad" onClick={play} ref={btnRef}>
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.src}></audio>
    </button>
  );
}

function DrumMachine() {
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(true); // true = Heater, false = Piano
  const [volume, setVolume] = useState(0.5);
  const [display, setDisplay] = useState("Welcome");

  const currentBank = bank ? bankOne : bankTwo;

  const handlePlay = (label) => setDisplay(label);

  const togglePower = () => {
    setPower(!power);
    setDisplay(!power ? "Power On" : "Power Off");
  };

  const toggleBank = () => {
    if (!power) return;
    setBank(!bank);
    setDisplay(!bank ? "Heater Kit" : "Smooth Piano Kit");
  };

  const handleVolume = (e) => {
    if (!power) return;
    const v = e.target.value;
    setVolume(v);
    setDisplay("Volume: " + Math.round(v * 100));
  };

  return (
    <div id="drum-machine">
      <div className="pads">
        {currentBank.map((pad) => (
          <DrumPad key={pad.key} pad={pad} power={power} volume={volume} onPlay={handlePlay} />
        ))}
      </div>
      <div className="panel">
        <div className="control-row">
          <span>Power</span>
          <div className={`switch ${power ? "on" : ""}`} onClick={togglePower}></div>
        </div>
        <div id="display">{display}</div>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} />
        <div className="control-row">
          <span>Bank</span>
          <div className={`switch ${bank ? "on" : ""}`} onClick={toggleBank}></div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
