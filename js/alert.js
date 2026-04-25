(function(){
	// Create overlay
	const overlay = document.createElement('div');
	overlay.className = 'welcome-overlay';
	overlay.setAttribute('role','dialog');
	overlay.setAttribute('aria-modal','true');
	overlay.innerHTML = `
		<div class="welcome-modal" role="document">
			<h2>¡Bienvenido!</h2>
			<p>Gracias por visitar mi portafolio. Haz clic en "Entrar" para continuar.</p>
			<div class="welcome-actions">
				<button class="welcome-btn" id="welcome-enter">Entrar</button>
			</div>
		</div>
	`;

	document.body.appendChild(overlay);

	const enter = document.getElementById('welcome-enter');
	if(enter){
		enter.focus();
		enter.addEventListener('click', ()=>{
			overlay.classList.add('welcome-hidden');
			// remove after transition
			setTimeout(()=>{ overlay.remove(); }, 300);
		});
	}

	// allow closing with Escape for accessibility
	function onKey(e){
		if(e.key === 'Escape'){
			if(document.body.contains(overlay)){
				overlay.classList.add('welcome-hidden');
				setTimeout(()=>{ overlay.remove(); }, 300);
			}
		}
	}
	window.addEventListener('keydown', onKey);
})();
