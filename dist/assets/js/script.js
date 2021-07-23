document.addEventListener('DOMContentLoaded', () => {
    addPortfolioSliderHandler()

    addPartnersPortfolio()

    addAnimateTetrahedrons()

    changeHeaderBg()

    addWritingTextHandler()
})


function addPortfolioSliderHandler() {
    if (document.querySelector('.portfolio__slider') !== null) {
        let allSliders = document.querySelectorAll('.portfolio__slider')

        allSliders.forEach(slider => {
            $(slider).slick({
                arrows: true,
                slidesToShow: 5,
                infinite: false,
                variableWidth: true,
                draggable: false,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            arrows: false,
                            slidesToShow: 2
                        }
                    }
                ]
            })
        })
    }
}

function addPartnersPortfolio() {
    if (document.querySelector('.partners__slider') !== null) {
        let slider = document.querySelector('.partners__slider')
        $(slider).slick({
            arrows: true,
            slidesToShow: 1,
            infinite: false,
            adaptiveHeight: true,
            draggable: false
        })
    }
}

function changeHeaderBg() {
    let allBlock = document.querySelectorAll('.block'),
        header = document.querySelector('header')
    if (window.matchMedia('(min-width: 768px)').matches) {

        window.addEventListener('scroll', () => {
            allBlock.forEach(block => {
                if (block.getBoundingClientRect().bottom >= 120 && header.getBoundingClientRect().bottom >= block.getBoundingClientRect().y) {
                    if (block.classList.contains('block_dark')) {
                        header.classList.add('fixed')
                        header.classList.remove('fixed-white')
                    } else {
                        header.classList.add('fixed-white')
                    }
                }
            })

            if (header.getBoundingClientRect().top + pageYOffset === 0) {
                header.classList.remove('fixed')
                header.classList.remove('fixed-white')
            }
        })
    }
}

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function createLine(dot1, dot2, num) {
    let x1 = dot1.x + +dot1.dotHTML.getBoundingClientRect().width * 0.5,
        y1 = dot1.y + +dot1.dotHTML.getBoundingClientRect().height * 0.5,
        x2 = dot2.x + +dot2.dotHTML.getBoundingClientRect().width * 0.5,
        y2 = dot2.y + +dot2.dotHTML.getBoundingClientRect().height * 0.5

    let colorDot1, colorDot2, strokeColor = `url(#Gradient${num})`,
        coordinates = ` x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`

    if (x1 <= x2) {
        colorDot1 = getComputedStyle(dot1.dotHTML).backgroundColor
        colorDot2 = getComputedStyle(dot2.dotHTML).backgroundColor
    } else {
        colorDot1 = getComputedStyle(dot2.dotHTML).backgroundColor
        colorDot2 = getComputedStyle(dot1.dotHTML).backgroundColor
    }

    if (x1 === x2 || y1 === y2) {
        strokeColor = '#CD40FF'
    }

    return `
        <defs><linearGradient id="Gradient${num}">
            <stop offset="0%" stop-color="${colorDot1}"/>
            <stop offset="100%" stop-color="${colorDot2}"/>
        </linearGradient></defs>
        <line  filter="drop-shadow(0 0 25px ${colorDot2})" class="moving-element__line_shadow" stroke="${strokeColor}" ${coordinates} />`
}

class Dot {
    constructor(movingDot, x, y, velX, velY,) {
        this.dotHTML = movingDot
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.dotHTML.style.animation = `${random(5, 20)}s ease-in-out infinite changeColor both, ${random(10, 20)}s ease-in-out infinite changeSize both`
    }

    update(boundRect) {
        if ((this.dotHTML.getBoundingClientRect().left + this.dotHTML.getBoundingClientRect().width) >= boundRect.getBoundingClientRect().right - this.dotHTML.getBoundingClientRect().width
            || ((this.dotHTML.getBoundingClientRect().left) < boundRect.getBoundingClientRect().left + this.dotHTML.getBoundingClientRect().width)) {
            this.velX = -(this.velX);
        }

        if ((this.dotHTML.getBoundingClientRect().top + this.dotHTML.getBoundingClientRect().width) >= boundRect.getBoundingClientRect().bottom - this.dotHTML.getBoundingClientRect().width
            || ((this.dotHTML.getBoundingClientRect().top) < boundRect.getBoundingClientRect().top + this.dotHTML.getBoundingClientRect().width)) {
            this.velY = -(this.velY);
        }
        this.x += this.velX
        this.y += this.velY
        this.dotHTML.style.left = this.x + 'px';
        this.dotHTML.style.top = this.y + 'px';
        this.dotHTML.style.boxShadow = `0 0 25px ${getComputedStyle(this.dotHTML).backgroundColor}`
    }
}

class Tetrahedron {
    constructor(movingElement) {
        this.dots = []
        this.boundElement = movingElement

        movingElement.querySelectorAll('.moving-element__dot').forEach(currentDot => {
            let dot = new Dot(
                currentDot,
                random(currentDot.getBoundingClientRect().width, (movingElement.getBoundingClientRect().width - 25) - currentDot.getBoundingClientRect().width),
                random(currentDot.getBoundingClientRect().height, (movingElement.getBoundingClientRect().height - 25) - currentDot.getBoundingClientRect().height),
                random(-1, 1),
                random(-1, 1))

            this.dots.push(dot)
        })

        movingElement.querySelectorAll('.moving-element__line').forEach(line => {
            line.innerHTML = `<svg viewbox=" 0 0 ${this.boundElement.getBoundingClientRect().width} ${this.boundElement.getBoundingClientRect().height}"></svg>`
        })
    }

    updateLines() {
        let allLines = this.boundElement.querySelectorAll('.moving-element__line svg')

        allLines[0].innerHTML = createLine(this.dots[0], this.dots[1], 1)
        allLines[1].innerHTML = createLine(this.dots[0], this.dots[2], 2)
        allLines[2].innerHTML = createLine(this.dots[0], this.dots[3], 3)
        allLines[3].innerHTML = createLine(this.dots[1], this.dots[2], 4)
        allLines[4].innerHTML = createLine(this.dots[1], this.dots[3], 5)
        allLines[5].innerHTML = createLine(this.dots[2], this.dots[3], 6)
    }

    update() {
        this.updateLines()

        this.dots.forEach(dot => {
            dot.update(this.boundElement)
        })
    }
}

function addAnimateTetrahedrons() {
    let allTetrahedrons = []
    document.querySelectorAll('.moving-element_triangle').forEach(tetrahedron => {
        allTetrahedrons.push(new Tetrahedron(tetrahedron))
    })

    function loop() {
        allTetrahedrons.forEach(tetrahedron => {
            tetrahedron.update()
        })
        requestAnimationFrame(loop)
    }

    loop()
}

function addWritingTextHandler() {
    let text = 'повышение качества обслуживания клиентов ',
        counter = 0,
        result = '',
        changeTextBlock = document.querySelector('.writing-text-block'),
        changeLine = changeTextBlock.querySelector('.writing-text-block__change-part')

    function typeLine() {
        if (counter >= text.length) {
            counter = 0
            return true
        }
        result += `<span>${text[counter]}</span>`
        counter++
        changeLine.innerHTML = result + '<span class="writing-text-block__cursor"></span>'
        setTimeout(typeLine, 90)
    }

    setTimeout(typeLine, 300)
}