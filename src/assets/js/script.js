document.addEventListener('DOMContentLoaded', () => {
    addPortfolioSliderHandler()

    addPartnersPortfolio()
})


function addPortfolioSliderHandler() {
    if (document.querySelector('.portfolio__slider') !== null) {
        let allSliders = document.querySelectorAll('.portfolio__slider')

        allSliders.forEach(slider => {
            $(slider).slick({
                arrows:true,
                slidesToShow:5,
                infinite:false,
                variableWidth:true,
                draggable:false
            })
        })
    }
}

function addPartnersPortfolio() {
    if (document.querySelector('.partners__slider') !== null) {
        let slider = document.querySelector('.partners__slider')
        $(slider).slick({
            arrows:true,
            slidesToShow:3,
            infinite:false,
            adaptiveHeight:true,
            draggable:false
        })
    }
}