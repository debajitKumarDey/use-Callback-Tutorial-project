import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (char) str += "!@#$%^&*()_+-={}[]|<>,.?/;";

    for (let i = 1; i <= length; i++) {
      let Character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(Character);
    }
    setPassword(pass);
  }, [length, numAllowed, char, setPassword]);

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect( () => { passwordGen() 
  },[length,numAllowed,char,passwordGen])

  return (
    <div className="bg-slate-300 w-full h-screen py-4">
      <div
        className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-5 py-1 bg-slate-600 text-white"
      >
        <p className="text-2xl text-center font-mono p-4">
          Random Pasword Generator
        </p>
        <div className="flex shadow  rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-5 ">
          <div
          className="flex items-center gap-x-2">
            <input type="range" 
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length({length})</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
             type="checkbox"
             defaultChecked={numAllowed}
             id="numberInput"
             onChange={()=>{setNumAllowed((prev)=> !prev)}}
             />
             <label htmlFor="numberInput">Number</label>
             <input
             type="checkbox"
             defaultChecked={char}
             id="charInput"
             onChange={()=>{setChar((prev)=> !prev)}}
             />
             <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
