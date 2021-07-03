import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'


import { useState } from 'react'
import './Store.scss'
import useData from './Data/useData'
import ItemCard from './ItemCard/ItemCard'
import ItemFilter from './ItemFilter/ItemFilter'

function Store() {
    let data = useData()

    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedCountry, setSelectedCountry] = useState()
    const [quantity, setQuantity] = useState({})
    const [cart, setCart] = useState({})


    data = data.filter(d => {

        if (selectedCategory && selectedCountry) {
            return d.category === selectedCategory && d.country === selectedCountry
        }

        if (selectedCategory) {
            return d.category === selectedCategory
        }
        if (selectedCountry) {
            d = d.country === selectedCountry

            return d
        }

        return d
    })
    let categorySet = new Set(data.map((d) => d.category));
    let countrySet = new Set(data.map((d) => d.country));
    let categories = Array.from(categorySet).sort();
    let countries = Array.from(countrySet).sort();
    const handleSetQuantity = (target) => {
        console.log(target.name);
        setQuantity(state => ({
            ...state,
            [target.name]: target.value,
        }))
    }
    const handleSetCart = (i) => {
        console.log(i);
        let selected = data.filter(d=>{
            let d1 = +d.id
            let d2= +i

            console.log(d1===d2);

      
            return parseInt(d.id)== parseInt(i)
        })
        console.log(selected);
        // setCart(state => ({
        //     ...state,
        //     [target.name]: target.value,
        // }))
    }
    

    console.log(quantity);
    return (
        <div className="store_container" >
            <ItemFilter

                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                categories={categories}
                countries={countries}
            />
            <ItemCard
                cart={cart}
             
                data={data}
                selectedCountry={selectedCountry}
                selectedCategory={selectedCategory}
                quantity={quantity}
                setQuantity={handleSetQuantity}
                setCart={handleSetCart}

            />
        </div>

    )
}

export default Store