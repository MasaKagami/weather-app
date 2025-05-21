import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudMoon, 
  CloudRain, 
  CloudSnow, 
  CloudSun, 
  Moon, 
  Sun } from 'lucide-react';

import React from 'react'

type WeatherIconProps = {
  iconName: string;
  className?: string;
}

export default function WeatherIcon({iconName, className = "h-6 w-6"}: WeatherIconProps) {
  
  const getIconComponent = (iconCode: string) => {
    const isDay = iconCode.endsWith('d');
    const condition = iconCode.slice(0, -1);
    
    switch (condition){
      case '01': // clear sky
        return isDay ? <Sun className={className} /> : <Moon className={className} />;
      case '02': // few clouds
        return isDay ? <CloudSun className={className} /> : <CloudMoon className={className} />;
      case '03': // scattered clouds
        return <Cloud className={className} />;
      case '04': // broken clouds
        return <Cloud className={className} />;
      case '09': // shower rain
        return <CloudDrizzle className={className} />;
      case '10': // rain
        return <CloudRain className={className} />;
      case '11': // thunderstorm
        return <CloudLightning className={className} />;
      case '13': // snow
        return <CloudSnow className={className} />;
      case '50': // mist
        return <CloudFog className={className} />;
      default:
        return <Cloud className={className} />;
    }
  }

  return (
    <div className='text-white ${className}'>
        {getIconComponent(iconName)}
    </div>
  )
}