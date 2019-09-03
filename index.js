const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnStart = document.getElementById('btnEmpezar')
const LAST_LEVEL = 2


class Game {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generateSequence()
    setTimeout(this.nextLevel, 500)
  }

  initialize() {
    this.choseColor = this.choseColor.bind(this)
    // in the code below we added the css class hide which hides the btn start when clicked.
    this.nextLevel = this.nextLevel.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(function(n) {
      // we use Math.floor to round the random number to the non-decimal number lower.
      return Math.floor(Math.random() * 4)
    })
  }

  nextLevel() {
    this.numeroNivel = this.levelnumber;
    this.subLevel = 0
    this.showNewSequence()
    this.addClickEvent()
  }

  transformColorToNumber(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }


  // showNewSequence() {
  //   // what we do with this for is for each new number randomized a color(name) will be asked. each number will be transformed to color.
  //   for (var i = 0; i < this.level; i++) {
  //     var color = this.transformNumberToColor(this.sequence[i])
  //     setTimeout(function () {
  //       this.highlightColor(color)
  //       // the formula below shows that each level = i. This leve highlightColor will execute after multiplying the i * 1000 or 1 second meaning that level 4 will highlight after 4 seconds.
  //     }, 1000)
  //   }
  // }

  showNewSequence() {
    // always use let in for loops, we use it cause its a changing variable. This way we let the setTimeout know each loop run has a different color.
    for (let i = 0; i < this.level; i++) {
      //since color is always equal we can set const, but if i changes so we use let
      const color = this.transformNumberToColor(this.sequence[i])
      setTimeout(() => {
        this.highlightColor(color)
      }, 1000 * i)
    }
  }

  // highlightColor(color) {
  //   this.colors[color].classList.add('light')
  //   setTimeout(function () {
  //     this.turnHighlightOff(color)
  //   }, 350)
  // }

  highlightColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnHighlightOff(color), 350)
  }

  turnHighlightOff(color) {
    this.colors[color].classList.remove('light')
  }

  addClickEvent() {
    // var self = this
    // using bind to get the user input instead of just the div of the btn.
    // we use bind to stick the choseColor to the game, instead of console printing that the btns are a html div it says that the btn is part of the game.
    // this.colors.celeste.addEventListener('click', this.choseColor.bind(this))
    this.colors.celeste.addEventListener('click', this.choseColor)
    this.colors.verde.addEventListener('click', this.choseColor)
    this.colors.naranja.addEventListener('click', this.choseColor)
    this.colors.violeta.addEventListener('click', this.choseColor)
  }

  removeClickEvent() {
    this.colors.celeste.removeEventListener('click', this.choseColor)
    this.colors.verde.removeEventListener('click', this.choseColor)
    this.colors.naranja.removeEventListener('click', this.choseColor)
    this.colors.violeta.removeEventListener('click', this.choseColor)
  }

  choseColor(ev) {
    //we get the colorName from the html for example: data-color="celeste"
    const colorName = ev.target.dataset.color
    // with this cons we transform the (colorname) to a number done in the switch function transformColorToNumber
    const colorNumber = this.transformColorToNumber(colorName)
    this.highlightColor(colorName)
    if (colorNumber === this.sequence[this.subLevel]) {
      this.subLevel++
      if (this.subLevel === this.level) {
        this.level++
        this.removeClickEvent()
        if (this.level === (LAST_LEVEL + 1)) {
          this.wonTheGame()
        } else {
          setTimeout(this.nextLevel, 1000)
        }
      }
    } else {
      this.lostTheGame()
    }
  }
  wonTheGame() {
    swal("Congratulations!", "You beated the game!", "success")
      .then(this.initialize)
  }

  lostTheGame() {
    swal("Game Over!", "Maybe next time!", "error")
      .then(() => {
        this.removeClickEvent()
        this.initialize()
      })
  }
}

function startGame() {
  window.game = new Game()
}
