import Image from 'next/image'
import React from 'react'

type Props = {}

export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & { iconName : string }) {
  return (
    <div {...props}>
        <Image src={`https://openweathermap.org/img/wn/${props.iconName}@2x.png`} 
            width={100}
            height={100}
            className='h-full w-full'
            alt="weather icon"/>
    </div>
  )
}