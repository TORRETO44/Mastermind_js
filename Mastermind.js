// JavaScript Document

var MasterMind = {
	name: 'MasterMind',
			// couleurs disponible noir, mauve, rouge, orange, jaune, bleu
		colors: {1: '#000000',2: '#800080',3: '#CC3333',4: '#ff9600',5: '#fff000',6: '#0005c2',},
			// options (interchangeable)
		settings: {lines: 12,columns: 4,colors: 6,},
		game: {turn: 1,column: 1,
			selection: new Array(),
			soluce: new Array(),
	},


	initialise: function() {
		this.startGame();		},
	startGame: function() {
		this.drawGameBoard();
		this.resetGame();
		this.defineSoluce();	},












		drawGameBoard: function() {
			board = document.getElementById('plateau');
			board.innerHTML = '';

		for (i = this.settings['lines']; i>0; i--) {
		line = document.createElement('tr');
		line.id = 'turn-'+i;
		cell = document.createElement('td');
		cell.innerHTML = i;
		cell.style.width = '42px';
		line.appendChild(cell);

		for (j = 1; j <= this.settings['columns']; j++) {
		cell = document.createElement('td');
		cell.innerHTML = '';
		cell.id = 'turn-'+i+'-'+j;
		cell.style.width = '42px';
		cell.setAttribute('onclick', this.name+'.selectColumn('+i+', '+j+');');
		line.appendChild(cell);
		}

		for (j = 1; j <= this.settings['columns']; j++) {
		cell = document.createElement('td');
		cell.innerHTML = '';
		cell.id = 'result-'+i+'-'+j;
		cell.style.width = '26px';
		line.appendChild(cell);
		}
		cell = document.createElement('td');
		cell.innerHTML = 'OK';
		cell.id = 'valid-'+i;
		cell.className = 'valid';
		cell.style.width = '26px';
		cell.setAttribute('onclick', this.name+'.checkLine('+i+');');
		line.appendChild(cell);
		board.appendChild(line);
		}
		colorSelector = document.getElementById('colorSelector');
		colorSelector.innerHTML = '';
		line = document.createElement('tr');


		for (i=1; i <= this.settings['colors']; i++) {
		cell = document.createElement('td');
		cell.innerHTML = '';
		cell.style.width = '42px';
		line.appendChild(cell);

		pion = document.createElement('div');
		pion.className = 'pion';
		pion.style.background = this.colors[i];
		pion.setAttribute('onclick', this.name+'.selectColor('+i+');');
		cell.appendChild(pion);
		}
		colorSelector.appendChild(line);
		},




	resetGame: function() {
		this.game['turn'] = 1;
		this.game['column'] = 1;
		document.getElementById('turn-1').className = 'selected';
		document.getElementById('turn-1-1').className = 'selected';	},
   defineSoluce: function() {
		this.game['soluce'] = new Array();
		for (i = 1; i <= this.settings['columns']; i++) {
		color = parseInt(Math.random()*this.settings['colors'])+1;
		this.game['soluce'][i] = color;							   }	},











		selectColor: function(color) {
				if (this.game['turn'] == -1) {
				return;
			}
				document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).innerHTML = '';
				this.game['selection'][this.game['column']] = color;
				pion = document.createElement('div');
				pion.className = 'pion';
				pion.style.background = this.colors[color];
				document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).appendChild(pion);
				document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = '';
				if (this.game['column'] == this.settings['columns']) {
				this.game['column'] = 1;
				} else {
				this.game['column'] ++;
			}
				document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = 'selected';
			},










		selectColumn: function(line, column) {
			if (line != this.game['turn']) {
			return;
			}
			document.getElementById('turn-'+line+'-'+this.game['column']).className = '';
			this.game['column'] = column;
			document.getElementById('turn-'+line+'-'+this.game['column']).className = 'selected';
			},










		checkLine: function(line) {
			if (line != this.game['turn']) {
			return;
			}
			for (i = 1; i <= this.settings['columns']; i++) {
			if (!this.game['selection'][i]) {
			return;
			}
			}
			soluce = this.game['soluce'].slice(0);
			correct = 0;
			misplaced = 0;
			for (i = 1; i <= this.settings['columns']; i++) {
			if (this.game['selection'][i] == soluce[i]) {
			correct++;
			soluce[i] = 0;
			this.game['selection'][i] = 0;
			}
			}
			if (correct == this.settings['columns']) {
			return this.displayWin();
			}
			for (i = 1; i <= this.settings['columns']; i++) {
			if (this.game['selection'][i] == 0) {
			continue;
			}
			loc = soluce.indexOf(this.game['selection'][i]);
			if (loc != -1) {
			this.game['selection'][i] = 0;
			soluce[loc] = 0;
			misplaced++;
			}
			}
			for (i = 1; i <= correct; i++) {
			pion = document.createElement('div');
			pion.className = 'correct';
			document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
			}
			for (j = i; j < i+misplaced; j++) {
			pion = document.createElement('div');
			pion.className = 'misplaced';
			document.getElementById('result-'+this.game['turn']+'-'+j).appendChild(pion);
			}
			this.game['selection'] = new Array();
			document.getElementById('turn-'+this.game['turn']).className = '';
			if (this.game['turn'] == this.settings['lines']) {
			return this.displayLose();
			}
			this.game['turn'] ++;
			document.getElementById('turn-'+this.game['turn']).className = 'selected';
			this.game['column'] = 1;
			document.getElementById('turn-'+this.game['turn']+'-1').className = 'selected';
			},










		displayWin: function() {
			document.getElementById('result').innerHTML = 'SuperSUS a survécu';
			document.getElementById('result').style.color = '#43b456';
			document.getElementById('turn-'+this.game['turn']).className = 'win';
			this.game['turn'] = -1;				},
	   displayLose: function() {
			document.getElementById('result').innerHTML = 'SuperSUS est mort';
			document.getElementById('result').style.color = '#CC3333';
			this.game['turn'] = -1;				},

};
