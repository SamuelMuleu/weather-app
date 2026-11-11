import sun from "@/assets/Sun.png";
import moon from "@/assets/MoonWeatherClearMomentNight.png";
import fewCloudsDay from "@/assets/DayCloudyWeatherFewcloudsMomentDay.png";
import fewCloudsNight from "@/assets/CloudyNigthWeatherFewcloudsMomentNight.png";
import cloudyDay from "@/assets/CloudyWeatherCloudyMomentDay.png";
import cloudyNight from "@/assets/CloudyNigthWeatherCloudyMomentNight.png";
import rainDay from "@/assets/CloudRainWeatherRain, MomentDay.png";
import rainNight from "@/assets/CloudRainWeatheRainMomentNight.png";
import snowDay from "@/assets/CloudSnowWeatherSnowMomentDay.png";
import snowNight from "@/assets/CloudSnowNightWeatherSnowMomentNight.png";
import stormDay from "@/assets/CloudStormWeatherStormMomentDay.png";
import stormNight from "@/assets/ClouldyStormNghtWeatherStormMomentNight.png";

import bgClearDay from "@/assets/WeatherClearMomentDay.png";
import bgClearNight from "@/assets/image.png";
import bgFewCloudsDay from "@/assets/WeatherFewCloudsMomentDay.png";
import bgFewCloudsNight from "@/assets/WeatherFewCloudsMomentNight.png";
import bgCloudyDay from "@/assets/WeatherCloudyMomentDay.png";
import bgCloudyNight from "@/assets/WeatherCloudyMomentNight.png";
import bgRainDay from "@/assets/WeatherRainMomentDay.png";
import bgRainNight from "@/assets/WeatherRainMomentNight.png";
import bgSnowDay from "@/assets/WeatherSnowMomentDay.png";
import bgSnowNight from "@/assets/WeatherSnowMomentNight.png";
import bgStormDay from "@/assets/WeatherStormMomentDay.png";
import bgStormNight from "@/assets/WeatherStormMomentNight.png";

type Condition = "clear" | "fewClouds" | "cloudy" | "rain" | "storm" | "snow";

const VISUALS: Record<Condition, { day: [string, string]; night: [string, string] }> = {
  clear: { day: [sun, bgClearDay], night: [moon, bgClearNight] },
  fewClouds: { day: [fewCloudsDay, bgFewCloudsDay], night: [fewCloudsNight, bgFewCloudsNight] },
  cloudy: { day: [cloudyDay, bgCloudyDay], night: [cloudyNight, bgCloudyNight] },
  rain: { day: [rainDay, bgRainDay], night: [rainNight, bgRainNight] },
  storm: { day: [stormDay, bgStormDay], night: [stormNight, bgStormNight] },
  snow: { day: [snowDay, bgSnowDay], night: [snowNight, bgSnowNight] },
};

/** Maps an OpenWeather icon code (e.g. "10n") to a condition. See openweathermap.org/weather-conditions */
function conditionFromIcon(icon: string): Condition {
  switch (icon.slice(0, 2)) {
    case "01":
      return "clear";
    case "02":
      return "fewClouds";
    case "09":
    case "10":
      return "rain";
    case "11":
      return "storm";
    case "13":
      return "snow";
    default: // 03, 04 (clouds) and 50 (mist)
      return "cloudy";
  }
}

export function weatherVisuals(icon: string) {
  const period = icon.endsWith("n") ? "night" : "day";
  const [image, background] = VISUALS[conditionFromIcon(icon)][period];
  return { image, background };
}
