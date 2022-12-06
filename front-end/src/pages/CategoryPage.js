import React from 'react';
import SearchBar from '../components/SearchBar.js';
import FilterCategory from '../components/FilterCategory.js';

export default function CategoryPage(props) {
    return (
        <div>
            <SearchBar
                setSearchProduct={props.setSearchProduct}
                searchProduct={props.searchProduct}
                setCategoryProduct={props.setCategoryProduct}
                categoryProduct={props.categoryProduct}
            />
            <FilterCategory
                categoryProduct={props.categoryProduct}
                searchProduct={props.searchProduct}
            />
        </div>
    );
}
