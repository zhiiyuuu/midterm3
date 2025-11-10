let objs = [];
let colors = ['#ee97a3ff', '#f2e5a4ff', '#b2c9f1ff', '#acdcb3ff'];

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	objs.push(new DynamicShape());
	
	// 設置第一單元作品的點擊事件
	// 第一單元作品點擊事件
	document.getElementById('unit1Work').addEventListener('click', function(e) {
		e.preventDefault();
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		
		if (iframeContainer.classList.contains('active')) {
			iframeContainer.classList.remove('active');
			iframe.src = 'about:blank';
		} else {
			iframeContainer.classList.add('active');
			iframe.src = 'https://zhiiyuuu.github.io/20251020/';
		}
	});

	// 測驗系統點擊事件
	document.getElementById('examSystem').addEventListener('click', function(e) {
		e.preventDefault();
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		
		if (iframeContainer.classList.contains('active') && iframe.src.includes('20251103')) {
			iframeContainer.classList.remove('active');
			iframe.src = 'about:blank';
		} else {
			iframeContainer.classList.add('active');
			iframe.src = 'https://zhiiyuuu.github.io/20251103/';
		}
	});

	// 回到首頁功能
	function returnToHome() {
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		iframeContainer.classList.remove('active');
		iframe.src = 'about:blank';
		
		// 隱藏側邊選單
		document.getElementById('sideMenu').classList.remove('active');
	}

	// 回到首頁按鈕點擊事件
	document.getElementById('homeButton').addEventListener('click', function(e) {
		e.preventDefault();
		returnToHome();
	});

	// 關閉按鈕點擊事件
	document.getElementById('closeButton').addEventListener('click', function() {
		returnToHome();
	});

	// 第一單元講義點擊事件
	document.getElementById('unit1Notes').addEventListener('click', function(e) {
		e.preventDefault();
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		
		if (iframeContainer.classList.contains('active') && iframe.src.includes('hackmd.io')) {
			iframeContainer.classList.remove('active');
			iframe.src = 'about:blank';
		} else {
			iframeContainer.classList.add('active');
			iframe.src = 'https://hackmd.io/@zhiiyu/HyzEGrCjee';
		}
	});

	// 測驗卷筆記點擊事件
	document.getElementById('examNotes').addEventListener('click', function(e) {
		e.preventDefault();
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		
		if (iframeContainer.classList.contains('active') && iframe.src.includes('ryWe3U01Ze')) {
			iframeContainer.classList.remove('active');
			iframe.src = 'about:blank';
		} else {
			iframeContainer.classList.add('active');
			iframe.src = 'https://hackmd.io/@zhiiyu/ryWe3U01Ze';
		}
	});

	// 作品筆記點擊事件
	document.getElementById('workNotes').addEventListener('click', function(e) {
		e.preventDefault();
		const iframeContainer = document.getElementById('iframeContainer');
		const iframe = iframeContainer.querySelector('iframe');
		
		if (iframeContainer.classList.contains('active') && iframe.src.includes('HJtybvCkbg')) {
			iframeContainer.classList.remove('active');
			iframe.src = 'about:blank';
		} else {
			iframeContainer.classList.add('active');
			iframe.src = 'https://hackmd.io/@zhiiyu/HJtybvCkbg';
		}
	});
}

function draw() {
	background(255);
	for (let i of objs) {
		i.run();
	}
	
	// 檢查滑鼠位置來控制選單
	let menu = document.getElementById('sideMenu');
	if (mouseX < 100) {
		menu.classList.add('active');
	} else {
		menu.classList.remove('active');
	}

	if (frameCount % int(random([15, 30])) == 0) {
		let addNum = int(random(1, 30));
		for (let i = 0; i < addNum; i++) {
			objs.push(new DynamicShape());
		}
	}
	for (let i = 0; i < objs.length; i++) {
		if (objs[i].isDead) {
			objs.splice(i, 1);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function easeInOutExpo(x) {
	return x === 0 ? 0 :
		x === 1 ?
		1 :
		x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 :
		(2 - Math.pow(2, -20 * x + 10)) / 2;
}

class DynamicShape {
	constructor() {
		this.x = random(0.3, 0.7) * width;
		this.y = random(0.3, 0.7) * height;
		this.reductionRatio = 1;
		this.shapeType = int(random(4));
		this.animationType = 0;
		this.maxActionPoints = int(random(2, 5));
		this.actionPoints = this.maxActionPoints;
		this.elapsedT = 0;
		this.size = 0;
		this.sizeMax = width * random(0.01, 0.05);
		this.fromSize = 0;
		this.init();
		this.isDead = false;
		this.clr = random(colors);
		this.changeShape = true;
		this.ang = int(random(2)) * PI * 0.25;
		this.lineSW = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		if (this.animationType == 1) scale(1, this.reductionRatio);
		if (this.animationType == 2) scale(this.reductionRatio, 1);
		fill(this.clr);
		stroke(this.clr);
		strokeWeight(this.size * 0.05);
		if (this.shapeType == 0) {
			noStroke();
			circle(0, 0, this.size);
		} else if (this.shapeType == 1) {
			noFill();
			circle(0, 0, this.size);
		} else if (this.shapeType == 2) {
			noStroke();
			rect(0, 0, this.size, this.size);
		} else if (this.shapeType == 3) {
			noFill();
			rect(0, 0, this.size * 0.9, this.size * 0.9);
		} else if (this.shapeType == 4) {
			line(0, -this.size * 0.45, 0, this.size * 0.45);
			line(-this.size * 0.45, 0, this.size * 0.45, 0);
		}
		pop();
		strokeWeight(this.lineSW);
		stroke(this.clr);
		line(this.x, this.y, this.fromX, this.fromY);
	}

	move() {
		let n = easeInOutExpo(norm(this.elapsedT, 0, this.duration));
		if (0 < this.elapsedT && this.elapsedT < this.duration) {
			if (this.actionPoints == this.maxActionPoints) {
				this.size = lerp(0, this.sizeMax, n);
			} else if (this.actionPoints > 0) {
				if (this.animationType == 0) {
					this.size = lerp(this.fromSize, this.toSize, n);
				} else if (this.animationType == 1) {
					this.x = lerp(this.fromX, this.toX, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 2) {
					this.y = lerp(this.fromY, this.toY, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 3) {
					if (this.changeShape == true) {
						this.shapeType = int(random(5));
						this.changeShape = false;
					}
				}
				this.reductionRatio = lerp(1, 0.3, sin(n * PI));
			} else {
				this.size = lerp(this.fromSize, 0, n);
			}
		}

		this.elapsedT++;
		if (this.elapsedT > this.duration) {
			this.actionPoints--;
			this.init();
		}
		if (this.actionPoints < 0) {
			this.isDead = true;
		}
	}

	run() {
		this.show();
		this.move();
	}

	init() {
		this.elapsedT = 0;
		this.fromSize = this.size;
		this.toSize = this.sizeMax * random(0.5, 1.5);
		this.fromX = this.x;
		this.toX = this.fromX + (width / 10) * random([-1, 1]) * int(random(1, 4));
		this.fromY = this.y;
		this.toY = this.fromY + (height / 10) * random([-1, 1]) * int(random(1, 4));
		this.animationType = int(random(3));
		this.duration = random(20, 50);
	}
}
(function() {
	// 在側邊選單加入「淡江大學」連結
	const side = document.getElementById('sideMenu');
	if (side && !side.querySelector('#tkuSideLink')) {
		const a = document.createElement('a');
		a.id = 'tkuSideLink';
		a.href = '#';
		a.textContent = '淡江大學';
		a.className = 'menu-item';
		a.addEventListener('click', function(e) {
			e.preventDefault();
			const iframeContainer = document.getElementById('iframeContainer');
			const iframe = iframeContainer.querySelector('iframe');
			if (iframeContainer.classList.contains('active') && iframe.src.includes('tku.edu.tw')) {
				iframeContainer.classList.remove('active');
				iframe.src = 'about:blank';
			} else {
				iframeContainer.classList.add('active');
				iframe.src = 'https://www.tku.edu.tw/';
			}
		});
		side.appendChild(a);
	}

	// 確保在點擊「回到首頁」或「作品筆記」時，iframe 區域也有同樣的淡江連結（只建立一次）
	function ensureTkuInIframe() {
		const iframeContainer = document.getElementById('iframeContainer');
		if (!iframeContainer) return;
		if (iframeContainer.querySelector('#tkuIframeLink')) return;

		const a2 = document.createElement('a');
		a2.id = 'tkuIframeLink';
		a2.href = '#';
		a2.textContent = '淡江大學';
		a2.className = 'iframe-link';
		a2.style.marginLeft = '8px';
		a2.addEventListener('click', function(e) {
			e.preventDefault();
			const iframe = iframeContainer.querySelector('iframe');
			if (iframeContainer.classList.contains('active') && iframe.src.includes('tku.edu.tw')) {
				iframeContainer.classList.remove('active');
				iframe.src = 'about:blank';
			} else {
				iframeContainer.classList.add('active');
				iframe.src = 'https://www.tku.edu.tw/';
			}
		});

		iframeContainer.appendChild(a2);
	}

	document.getElementById('homeButton')?.addEventListener('click', function(e) {
		// 讓回到首頁時也建立／顯示淡江連結在 iframe 區
		ensureTkuInIframe();
	});
	document.getElementById('workNotes')?.addEventListener('click', function(e) {
		// 在作品筆記點擊時也建立／顯示淡江連結在 iframe 區
		ensureTkuInIframe();
	});
})();