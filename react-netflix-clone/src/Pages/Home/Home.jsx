import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Banner from '../../Components/Banner/Banner'
import Rows from '../../Components/Rows/Rows'
import Footer from '../../Components/Footer/Footer'

export default function Home() {
    const [hoverstate, setHoverstate] = useState(false);
    return (
        <>
            <Header setHoverstate={setHoverstate}/>
            <Banner hoverstate={hoverstate}/>
            <Rows />
            <Footer />
        </>
    )
}