import React from 'react';
import './categoryCarousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = ({ items }) => {
    return (
        <div className='carousal'>
            <div class='container-fluid' >
                <OwlCarousel items={3}
                    className="owl-theme"
                    loop
                    nav
                    dots={false}
                    margin={3}
                    autoplayTimeout={2000}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
                    autoplayHoverPause={true}
                    autoplay={true} >{items?.map((item, index) => {
                        return (
                            <CategoryCard item={item} key={index} />
                        );
                    })}
                </OwlCarousel>
            </div>
        </div>
    )
}

export default CategoryCarousel;
