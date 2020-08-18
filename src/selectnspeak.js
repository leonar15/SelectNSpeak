/*
MIT License

Copyright (c) 2020 Leo Hochberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
javascript:(function(){
	var d = document,
		w = window,
		control_id = 'selectnspeak_bk_control',
		control = d.getElementById(control_id),
		sns_url = 'https://github.com/leonar15/SelectNSpeak',
		sns_version = '0.2',
		border_radius = 'border-radius: 6px;',
		voices = [],
		voice_select,
		voice_select_instruct,
		selected_text = "",
		s,
		spk = new SpeechSynthesisUtterance,
		wss = w.speechSynthesis;

	// create the controls
	if (!control) {
		control = create_element('div', [['draggable', true]], 'font-family:sans-serif;border:1px solid #bdbdbd;padding: 6px 10px;position: fixed;top: 10px; left: 10px;background-color:rgba(236,236,236,0.9);width: 275px;text-align: center;z-index:9999999;box-shadow: 0px 0px 17px -3px rgba(255,255,255,1);font-size:16px;box-sizing:border-box;' + border_radius);
		control.id = control_id;
		control.innerHTML = '<div style="font-size:18px;font-weight:600;border-bottom:1px solid;padding:7px 0;">Select &amp; Speak Controls <a title="Select &amp; Speak v'+ sns_version +'" href="' + sns_url + '" style="position:absolute;top:3px;right:6px;font-size:12px;">&#9432;</a></div>';

		// ref: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
		voice_select = create_element('select', null, 'width:100%;');

		// add an instructional option
		voice_select_instruct = d.createElement('option');
		voice_select_instruct.disabled = true;
		voice_select_instruct.textContent = 'Select a voice:';
		voice_select.append(voice_select_instruct);
		voice_select.onchange = get_selection_and_play;

		// append voice selection
		voices = wss.getVoices();
		// note: voices load asynchronously, this avoids loading an empty list
		setTimeout(function(){
			voices = wss.getVoices();
			voices.forEach((voice, index) => {
				var option = create_element('option', [
					['value', index]
				]);
				option.textContent = voice.name + ' (' + voice.lang + ')';

				if (voice.default) {
					option.selected = true;
					option.textContent += ' -- DEFAULT';
				}

				voice_select.append(option);
			})}, 30);

		control.append(
			// play button
			create_button('&#9654;', 'Speak current selection', get_selection_and_play),
			// pause button
			create_button('&#10074; &#10074;', 'Pause/Unpause', function(){
				if (wss.speaking && wss.paused) {
					wss.resume();
				} else {
					wss.pause();
				}
			}),
			// stop button
			create_button('&#9724;', 'Stop all playback', stop_playback),
			// close controls
			create_button('&times;', 'Stop playback & Close controls', function(){stop_playback();control.parentNode.removeChild(control)}),
			// voice options
			voice_select
		);

		d.body.append(control);
	} else {
		voice_select = control.getelementsByTagName('select')[0];
	}

	get_selection_and_play();

	function get_selection_and_play(){
		// grab the selected text
		if (w.getSelection) {
			selected_text = w.getSelection().toString();
		} else if ((s = w.selection) && s.type == "Text") {
			selected_text = s.createRange().htmlText;
		}

		// stop any current speaking
		stop_playback();

		// speak now if anything was selected
		if (selected_text.length) {
			spk.text = selected_text;
			spk.voice = get_selected_voice();
			wss.speak(spk);
		} else {
			alert('Select & Speak: Please select some text before pressing play.');
		}
	}

	function get_selected_voice(){
		var selected = voice_select.selectedOptions;

		return selected && selected.length ? voices[selected[0].value] : null;
	}

	function stop_playback(){
		wss.cancel();
	}

	function create_element(tag, attrs, style){
		var e = d.createElement(tag);
		if (attrs) {
			attrs.forEach((attr) => {e.setAttribute(attr[0], attr[1])});
		}
		if (style) {
			e.style.cssText = style;
		}
		return e;
	}

	function create_button(btn_text, title, on_click){
		var btn = create_element('button', null, 'margin:10px 5px;vertical-align:middle;height:32px;width:32px;background-color:white;color:black;border:1px solid #333;white-space:nowrap;padding:2px;' + border_radius);
		btn.innerHTML = btn_text;
		btn.title = title;
		btn.onclick = on_click;
		return btn;
	}
})();