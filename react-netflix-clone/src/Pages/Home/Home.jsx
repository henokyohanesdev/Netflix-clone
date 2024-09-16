import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner'
import Rows from '../../Components/Rows/Rows'
// import Footer from '../../Components/Footer/Footer'

export default function Home() {
    const [hoverstate, setHoverstate] = useState(false);
    return (
        <>
            <Navbar setHoverstate={setHoverstate}/>
            <Banner hoverstate={hoverstate}/>
            <Rows />
            {/* <Footer /> */}
        </>
    )
}