import { MapPin, Sun } from 'lucide-react'
import React from 'react'
import SearchBox from './SearchBox'

type Props = {}

function Navbar({}: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
            <div className='flex items-center justify-center gap-2'>
                <h2>weather app by Masa</h2>
                <Sun className='w-5 h-5 text-yellow-500'/>
            </div>
            <section className='flex gap-2 items-center justify-center'>
              <MapPin className='w-5 h-5'/>
              <p className='text-black/80 text-sm'>
                Montreal
              </p>
              <div>
                <SearchBox />
              </div>
            </section>
        </div>
    </nav>
  )
}

export default Navbar