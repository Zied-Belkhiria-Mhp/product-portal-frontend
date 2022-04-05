import { useCallback, useEffect, useMemo, useState } from 'react'
import MuiCarousel from 'react-material-ui-carousel'
import Typography from '@mui/material/Typography'

export interface CarouselProps {
  itemsCount?: Number
  carouselItems: string[]
}

export const Carousel = ({ itemsCount, carouselItems }: CarouselProps) => {
  const [activeChild, setActiveChild] = useState(0)
  const items = useMemo(() => carouselItems, [])

  // The Keypress Event Handler
  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        // If supposed previous child is < 0 set it to last child
        setActiveChild((a) => (a - 1 < 0 ? items.length - 1 : a - 1))
      } else if (e.key === 'ArrowRight') {
        // If supposed next child is > length -1 set it to first child
        setActiveChild((a) => (a + 1 > items.length - 1 ? 0 : a + 1))
      }
    },
    [items]
  )

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener('keydown', changeChild)

    return function cleanup() {
      document.removeEventListener('keydown', changeChild)
    }
  })

  return (
    <MuiCarousel
      index={activeChild} // <-- This controls the activeChild
      autoPlay={false} // <-- You probaly want to disable this for our purposes
      navButtonsAlwaysVisible
    >
      {items.map((i) => {
        return (
          <Typography align="center" key={i}>
            Child: {i}
          </Typography>
        )
      })}
    </MuiCarousel>
  )
}
