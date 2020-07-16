# Select & Speak Bookmarklet
A privacy-focused bookmarklet to speak any text on a webpage using speech synthesis

## Why?
The other night, I found an interesting article, but was feeling too lazy to read it. While searching for a way to have the browser read it aloud, I discovered that most (all?) solutions involve adding yet another browser extension. It turns out that all modern browsers have a built-in library for [speech synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). This allows anyone to have their browser read any text on any webpage without calling any external services.

![Select & Speak Control Overlay](/images/selectnspeak_example.png)


## Bookmarklet code
This is equivalent to [selectnspeak.min.js](selectnspeak.min.js) shown in this project, with additional escaping for better cross-brower compatibility.
```javascript
javascript:(function()%7Bvar%20e%2Ct%2Cn%2Co%3Ddocument%2Ca%3Dwindow%2Ci%3Do.getElementById(%22selectnspeak_bk_control%22)%2Cl%3D%5B%5D%2Cs%3D%22%22%2Cp%3Dnew%20SpeechSynthesisUtterance%2Cc%3Da.speechSynthesis%3Bfunction%20r()%7Bvar%20t%2Co%2Ci%3Ba.getSelection%3Fs%3Da.getSelection().toString()%3A(n%3Da.selection)%26%26%22Text%22%3D%3Dn.type%26%26(s%3Dn.createRange().htmlText)%2Cd()%2Cs.length%3F(p.text%3Ds%2Cp.voice%3D(t%3De.selectedOptions%2Co%3Dt%26%26t.length%3Fe.selectedOptions%5B0%5D.getAttribute(%22data-name%22)%3A%22%22%2Ci%3Dnull%2Cl.some(e%3D%3E(i%3De%2Ce.name%3D%3D%3Do))%2Ci)%2Cc.speak(p))%3Aalert(%22Select%20%26%20Speak%3A%20Please%20select%20some%20text%20before%20pressing%20play.%22)%7Dfunction%20d()%7Bc.cancel()%7Dfunction%20x(e%2Ct%2Cn)%7Bvar%20a%3Do.createElement(e)%3Breturn%20t%26%26t.forEach(e%3D%3E%7Ba.setAttribute(e%5B0%5D%2Ce%5B1%5D)%7D)%2Cn%26%26(a.style.cssText%3Dn)%2Ca%7Dfunction%20g(e%2Ct%2Cn)%7Bvar%20o%3Dx(%22button%22%2Cnull%2C%22margin%3A10px%205px%3Bvertical-align%3Amiddle%3Bheight%3A32px%3Bwidth%3A32px%3Bbackground-color%3Awhite%3Bcolor%3Ablack%3B%20border%3A1px%20solid%20%23333%3Bwhite-space%3Anowrap%3Bpadding%3A2px%3Bborder-radius%3A%206px%3B%22)%3Breturn%20o.innerHTML%3De%2Co.title%3Dt%2Co.onclick%3Dn%2Co%7Di%3Fe%3Di.getelementsByTagName(%22select%22)%5B0%5D%3A((i%3Dx(%22div%22%2C%5B%5B%22draggable%22%2C!0%5D%5D)).id%3D%22selectnspeak_bk_control%22%2Ci.style.cssText%3D%22font-family%3Asans-serif%3Bborder%3A1px%20solid%20%23bdbdbd%3Bpadding%3A%206px%2010px%3Bposition%3A%20fixed%3Btop%3A%2010px%3B%20left%3A%2010px%3Bbackground-color%3Argba(236%2C236%2C236%2C0.9)%3Bwidth%3A%20250px%3Btext-align%3A%20center%3Bz-index%3A9999999%3Bbox-shadow%3A%200px%200px%2017px%20-3px%20rgba(255%2C255%2C255%2C1)%3Bfont-size%3A16px%3Bbox-sizing%3Aborder-box%3Bborder-radius%3A%206px%3B%22%2Ci.innerHTML%3D'%3Cdiv%20style%3D%22font-size%3A18px%3Bfont-weight%3A600%3Bborder-bottom%3A1px%20solid%3Bpadding%3A%207px%200%3B%22%3ESelect%20%26amp%3B%20Speak%20Controls%3C%2Fdiv%3E'%2C(e%3Dx(%22select%22)).style.cssText%3D%22width%3A%20100%25%3B%22%2C(t%3Do.createElement(%22option%22)).disabled%3D!0%2Ct.textContent%3D%22Select%20a%20voice%3A%22%2Ce.append(t)%2Ce.onchange%3Dr%2Cl%3Dc.getVoices()%2CsetTimeout((function()%7B(l%3Dc.getVoices()).forEach(t%3D%3E%7Bvar%20n%3Dx(%22option%22%2C%5B%5B%22data-lang%22%2Ct.lang%5D%2C%5B%22data-name%22%2Ct.name%5D%5D)%3Bn.textContent%3Dt.name%2B%22%20(%22%2Bt.lang%2B%22)%22%2Ct.default%26%26(n.selected%3D!0%2Cn.textContent%2B%3D%22%20--%20DEFAULT%22)%2Ce.append(n)%7D)%7D)%2C30)%2Ci.append(g(%22%26%239654%3B%22%2C%22Speak%20current%20selection%22%2Cr)%2Cg(%22%26%2310074%3B%20%26%2310074%3B%22%2C%22Pause%2FUnpause%22%2C(function()%7Bc.speaking%26%26c.paused%3Fc.resume()%3Ac.pause()%7D))%2Cg(%22%26%239724%3B%22%2C%22Stop%20all%20playback%22%2Cd)%2Cg(%22%26times%3B%22%2C%22Stop%20playback%20%26%20Close%20controls%22%2C(function()%7Bd()%2Ci.parentNode.removeChild(i)%7D))%2Ce)%2Co.body.append(i))%2Cr()%7D)()%3B
```

## How to Install

### Manual Installation
1. Create a new bookmark (e.g. bookmark this page) 
2. Right-click the bookmark in your bookmark bar and edit the URL
    - Chrome: Right-click on a bookmark and select "Edit..."
    - Safari: Right-click on a bookmark and select "Edit Address..."
    - Firefox: Right-click on a bookmark and select "Properties". Paste the bookmarklet code in the "Location" input
3. Copy & paste the bookmarklet code into the URL location, making sure to remove the prior content entirely
4. Change the bookmark label to "Select & Speak" (optional)

## How to Use
1. Select some text on any webpage, then click the bookmark you just made.
2. Enjoy!
3. For fun, try the other available voices on your system
