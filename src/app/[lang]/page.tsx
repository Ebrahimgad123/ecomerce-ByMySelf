import React from 'react'
import Hero from '@/components/Hero'
import TopCompos from '@/components/TopCompos'
import TodayComponent from '@/components/TodayComponent'
import Categories from '@/components/Categories'
const page =() => {

  return (
    <div>
       <Hero/>
       <TodayComponent />
       <Categories />
    </div>
  )
}

export default page
