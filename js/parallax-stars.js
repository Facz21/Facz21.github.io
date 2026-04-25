(function(){
  const canvas = document.getElementById('stars-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = innerWidth, h = innerHeight;
  const DPR = window.devicePixelRatio || 1;

  function resize(){
    w = innerWidth; h = innerHeight;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }

  const layers = [
    {count:160, size:[0.3,1], speed:0.15, stars:[]},
    {count:90, size:[0.6,1.6], speed:0.45, stars:[]},
    {count:40, size:[1.2,3], speed:0.9, stars:[]}
  ];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function initStars(){
    layers.forEach(layer=>{
      layer.stars = [];
      for(let i=0;i<layer.count;i++){
        layer.stars.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: rand(layer.size[0], layer.size[1]),
          alpha: Math.random()*0.8 + 0.2,
          twinkle: Math.random()*0.02 + 0.005,
          // velocity in pixels per second (subtle drift)
          vx: 0,
          vy: 0
        });
      }
    });
  }

  let _lastTime = Date.now();
  function draw(){
    const now = Date.now();
    const dt = Math.min(0.05, (now - _lastTime) / 1000); // cap dt to avoid big jumps
    _lastTime = now;

    ctx.clearRect(0,0,w,h);
    const time = now;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    layers.forEach((layer, li)=>{
      const offset = scrollY * layer.speed;
      // set per-layer max velocity once when stars are initialized
      if(!layer._velInit){
        const maxVel = 6 + li * 3; // px per second, increases for closer layers
        layer.stars.forEach(s => {
          s.vx = rand(-maxVel, maxVel);
          s.vy = rand(-maxVel * 0.4, maxVel * 0.4);
        });
        layer._velInit = true;
      }

      layer.stars.forEach(s => {
        // update position by velocity
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // wrap around edges for continuous field
        if(s.x < -50) s.x += (w + 100);
        if(s.x > w + 50) s.x -= (w + 100);
        if(s.y < -50) s.y += (h + 100);
        if(s.y > h + 50) s.y -= (h + 100);

        const y = (s.y + offset) % (h + 100) - 50;
        const tw = Math.sin((time*0.001) + s.x*0.01) * s.twinkle;
        const a = Math.max(0, Math.min(1, s.alpha + tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.arc(s.x, y, s.r, 0, Math.PI*2);
        ctx.fill();
      });
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', ()=>{ resize(); initStars(); });
  resize(); initStars(); draw();
})();
