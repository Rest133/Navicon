document.addEventListener('DOMContentLoaded', () => {
    addPortfolioSliderHandler()

    addPartnersPortfolio()

    changeHeaderBg()
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
                draggable: false
            })
        })
    }
}

function addPartnersPortfolio() {
    if (document.querySelector('.partners__slider') !== null) {
        let slider = document.querySelector('.partners__slider')
        $(slider).slick({
            arrows: true,
            slidesToShow: 3,
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