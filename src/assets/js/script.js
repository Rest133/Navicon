document.addEventListener('DOMContentLoaded', () => {
    addPortfolioSliderHandler()

    addPartnersPortfolio()

    addHistorySuccessSliders()

    addStoriesSlider()

    addQuoteSlider()

    addTeamSlider()

    addAnimateTetrahedrons()

    changeHeaderBg()

    addWritingTextHandler()

    adaptiveHeightBlocks()
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

function addHistorySuccessSliders() {
    if (document.querySelector('.roadmap-slider') !== null) {
        let slider = document.querySelector('.roadmap-slider')
        $(slider).slick({
            arrows: true,
            slidesToShow: 1,
            infinite: false,
            variableWidth: true,
            draggable: false,
            asNavFor: '.photo-roadmap-slider'
        })
        let photoSlider = document.querySelector('.photo-roadmap-slider')
        $(photoSlider).slick({
            arrows: false,
            slidesToShow: 1,
            infinite: false,
            variableWidth: false,
            draggable: false,
            swipe: false
        })
    }
}

function addStoriesSlider() {
    if (document.querySelector('.stories-slider') !== null) {
        let slider = document.querySelector('.stories-slider')
        $(slider).slick({
            arrows: true,
            slidesToShow: 4,
            infinite: false,
            variableWidth: true,
            draggable: false,
            responsive: [
                {
                    breakpoint: 1026,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        })
    }
}

function addQuoteSlider() {
    if (document.querySelector('.portfolio__quote-slider') !== null) {
        let slider = document.querySelector('.portfolio__quote-slider')
        $(slider).slick({
            arrows: true,
            slidesToShow: 1,
            infinite: false,
            variableWidth: false,
            draggable: false,
            responsive: [
                {
                    breakpoint: 1026,
                    settings: {
                        arrows: false,
                        variableWidth: true,
                    }
                }
            ]
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
    } else {
        window.addEventListener('scroll', () => {
            if (header.getBoundingClientRect().top + pageYOffset === 0) {
                header.style.backgroundColor = ''
            } else {
                header.style.backgroundColor = '#000000'
            }
        })
    }
}

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function createLine(dot1, dot2, num) {
    let dot1Bound = dot1.dotHTML.getBoundingClientRect(),
        dot2Bound = dot2.dotHTML.getBoundingClientRect()

    let x1 = dot1.x + +dot1Bound.width * 0.5,
        y1 = dot1.y + +dot1Bound.height * 0.5,
        x2 = dot2.x + +dot2Bound.width * 0.5,
        y2 = dot2.y + +dot2Bound.height * 0.5

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
        <line  filter="drop-shadow(0 0 25px ${colorDot2})" stroke="${strokeColor}" ${coordinates} />`
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

    update(boundRectTop, boundRectBottom, boundRectLeft, boundRectRight) {
        let dotBound = this.dotHTML.getBoundingClientRect()
        if ((dotBound.left + dotBound.width) >= boundRectRight - dotBound.width || ((dotBound.left) < boundRectLeft + dotBound.width)) {
            this.velX = -(this.velX);
        }

        if ((dotBound.top + dotBound.width) >= boundRectBottom - dotBound.width || ((dotBound.top) < boundRectTop + dotBound.width)) {
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
        this.boundRect = movingElement.getBoundingClientRect()

        movingElement.querySelectorAll('.moving-element__dot').forEach(currentDot => {
            let currentDotRect = currentDot.getBoundingClientRect(),
                dot = new Dot(
                    currentDot,
                    random(currentDotRect.width, (this.boundRect.width - 25) - currentDotRect.width),
                    random(currentDotRect.height, (this.boundRect.height - 25) - currentDotRect.height),
                    random(-1, 1),
                    random(-1, 1))

            this.dots.push(dot)
        })

        movingElement.querySelectorAll('.moving-element__line').forEach(line => {
            line.innerHTML = `<svg viewbox=" 0 0 ${this.boundRect.width} ${this.boundRect.height}"></svg>`
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
        this.dots.forEach(dot => {
            dot.update(this.boundRect.top, this.boundRect.bottom, this.boundRect.left, this.boundRect.right)
        })

        this.updateLines()
    }
}

function addAnimateTetrahedrons() {
    let allTetrahedrons = []
    document.querySelectorAll('.moving-element_triangle').forEach(tetrahedron => {
        if (getComputedStyle(tetrahedron).display !== 'none') {
            allTetrahedrons.push(new Tetrahedron(tetrahedron))
        }
    })

    function loop() {
        allTetrahedrons.forEach(tetrahedron => {
            let tetrahedronBound = tetrahedron.boundElement.getBoundingClientRect()
            if (tetrahedronBound.bottom > 0 && tetrahedronBound.top < innerHeight) {
                tetrahedron.update()
            }
        })
        requestAnimationFrame(loop)
    }

    loop()
}

function addWritingTextHandler() {
    if (document.querySelector('.writing-text-block') !== null) {
        let allWritingTexts = document.querySelectorAll('.writing-text-list p'),
            changeLine = document.querySelector('.writing-text-block').querySelector('.writing-text-block__change-part')

        let text = '',
            counter = 0,
            lineCounter = 0,
            result = ''

        function typeLine() {
            if (counter >= text.length) {
                setTimeout(deleteLine, 1500)
                return true
            }
            result += `<span>${text[counter]}</span>`
            changeLine.innerHTML = `${result}<span class="writing-text-block__cursor"></span>`
            counter++
            setTimeout(function () {
                requestAnimationFrame(typeLine)
            }, 80)
        }

        function deleteLine() {
            if (counter === 0) {
                setTimeout(startNewLine, 1000)
                return true
            }
            result = result.slice(0, -14)
            changeLine.innerHTML = `${result}<span class="writing-text-block__cursor"></span>`
            counter--
            setTimeout(function () {
                requestAnimationFrame(deleteLine)
            }, 50)
        }

        function startNewLine() {
            text = allWritingTexts[lineCounter].textContent
            lineCounter++
            if (lineCounter >= allWritingTexts.length) {
                lineCounter = 0
            }
            setTimeout(function () {
                requestAnimationFrame(typeLine)
            }, 1000)
        }

        startNewLine()
    }
}

function adaptiveHeightBlocks() {
    if (document.querySelector('.our-services__list') !== null) {
        let allLists = document.querySelector('.our-services__list').querySelectorAll('.our-services__list-item-text-blocks')
        if (!window.matchMedia('(max-width: 767px)').matches) {
            resize()
            window.addEventListener("resize", resize);
        }

        function resize() {
            allLists.forEach(currentList => {
                let maxHeight = 0
                currentList.querySelectorAll('.our-services__list-item-text-title').forEach(currentTitle => {
                    let titleHeight = +(getComputedStyle(currentTitle).height.replace('px', ''))
                    if (titleHeight > maxHeight) {
                        maxHeight = titleHeight
                    }
                })
                currentList.querySelectorAll('.our-services__list-item-text-title').forEach(currentTitle => {
                    currentTitle.style.height = maxHeight + 'px'
                })

            })
        }
    }
}

function addTeamSlider() {
    if (document.querySelector('.our-team__slider') !== null) {
        let slider = document.querySelector('.our-team__slider'),
            cardsList = slider.querySelector('.our-team__slider-wrapper'),
            allCards = slider.querySelectorAll('.our-team__slider-card'),
            allSteps = (allCards.length - 1) / 2,
            btnPrev = slider.querySelector('.our-team__slider-button_prev'),
            btnNext = slider.querySelector('.our-team__slider-button_next')

        updateCardPosition()

        btnNext.addEventListener('click', () => {
            changeActiveCard()
        })

        btnPrev.addEventListener('click', () => {
            changeActiveCard(true)
        })

        function updateCardPosition() {
            cardsList.querySelectorAll('.our-team__slider-card').forEach((card, i) => {
                if (card.classList.contains('our-team__slider-card_active')) {
                    card.style.transform = 'rotateY(0deg) scale(100%)'
                    card.style.zIndex = `${allCards.length}`
                    card.style.left = ''
                }
                if (i < allSteps) {
                    card.style.transform = `rotateY(${-5 * (allSteps - i)}deg) scale(${95 - (allSteps - i - 1) * 10}%)`
                    card.style.left = `${(0.3 * (allSteps - i) - 2.1) * (0.3 * (allSteps - i) - 2.1) * 10 - 7.8}%`
                    card.style.zIndex = i + 1
                }
                if (i > allSteps) {
                    card.style.transform = `rotateY(${5 * (i - allSteps)}deg) scale(${95 - (i - allSteps - 1) * 10}%)`
                    card.style.left = `calc(100% - ${(0.3 * (i - allSteps) - 2.1) * (0.3 * (i - allSteps) - 2.1) * 10 - 7.8}% - 330px)`
                    card.style.zIndex = allCards.length - i
                }
            })
        }

        function changeActiveCard(reverse = false) {
            let cards = cardsList.querySelectorAll('.our-team__slider-card')
            cards.forEach(card => {
                card.classList.remove('our-team__slider-card_active')
            })

            if (!reverse) {
                cards[allSteps + 1].classList.add('our-team__slider-card_active')
                cardsList.append(cardsList.querySelector('.our-team__slider-card'))
            } else {
                cards[allSteps - 1].classList.add('our-team__slider-card_active')
                cardsList.prepend(cardsList.querySelectorAll('.our-team__slider-card')[allCards.length - 1])
            }
            updateCardPosition()
        }

    }
}