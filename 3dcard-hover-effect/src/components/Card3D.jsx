import { useRef, useEffect, useCallback } from 'react'
import './Card3D.css'

/**
 * Card3D - A reusable interactive 3D card component with mouse-tracking tilt effect.
 *
 * Features:
 * - 3D tilt based on mouse position (rotateX, rotateY)
 * - requestAnimationFrame for smooth 60fps updates
 * - Throttled mouse events via rAF scheduling
 * - Dynamic glow/gradient overlay that follows cursor
 * - Scale-up effect on hover
 * - Dynamic shadow that changes with tilt angle
 * - Smooth reset when mouse leaves
 */
const Card3D = ({ image, title, description }) => {
  // Refs for DOM elements and state that doesn't trigger re-renders
  const cardRef = useRef(null)
  const boundsRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  /**
   * Applies the 3D transform based on current mouse position.
   * Called inside requestAnimationFrame for smooth performance.
   */
  const rotateCard = useCallback(() => {
    const card = cardRef.current
    const bounds = boundsRef.current
    if (!card || !bounds) return

    const { x, y } = mouseRef.current
    const { width, height } = bounds

    // Calculate normalized position from -1 to 1 (center is 0,0)
    const centerX = (x / width) * 2 - 1
    const centerY = (y / height) * 2 - 1

    // Max rotation angle in degrees
    const maxRotation = 15

    // rotateX tilts top/bottom (inverted: mouse up = top tilts back = positive rotateX)
    const rotateX = centerY * -maxRotation

    // rotateY tilts left/right (mouse right = right side comes forward = positive rotateY)
    const rotateY = centerX * maxRotation

    // Shadow offset moves opposite to the tilt direction for realistic depth
    const shadowX = -rotateY * 0.6
    const shadowY = rotateX * 0.6 + 12 // +12 keeps a base shadow below

    // Apply 3D transform with slight scale-up on hover
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `

    // Update dynamic glow position via CSS custom properties
    const glowX = (x / width) * 100
    const glowY = (y / height) * 100
    card.style.setProperty('--glow-x', `${glowX}%`)
    card.style.setProperty('--glow-y', `${glowY}%`)

    // Dynamic shadow intensity based on tilt amount
    const tiltAmount = Math.sqrt(centerX * centerX + centerY * centerY)
    const shadowOpacity = 0.15 + tiltAmount * 0.15
    const shadowBlur = 20 + tiltAmount * 20

    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}),
      ${shadowX * 0.5}px ${shadowY * 0.5}px ${shadowBlur * 0.5}px rgba(0, 0, 0, ${shadowOpacity * 0.6})
    `

    // Clear the rAF ref so the next mousemove can schedule a new frame
    rafRef.current = null
  }, [])

  /**
   * Handles mouse movement over the card.
   * Uses requestAnimationFrame for throttling - mousemove fires many times per second,
   * but we only update the DOM once per display refresh (typically 60fps).
   */
  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current
      if (!card) return

      // Cache bounds to avoid repeated getBoundingClientRect calls
      if (!boundsRef.current) {
        boundsRef.current = card.getBoundingClientRect()
      }

      const rect = boundsRef.current
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // Schedule a single rAF callback if one isn't already pending.
      // This effectively throttles updates to the display refresh rate.
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(rotateCard)
      }
    },
    [rotateCard]
  )

  /**
   * Handles mouse entering the card.
   * Adds the active class to disable CSS transitions for instant JS-driven updates.
   */
  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    // Recalculate bounds on enter in case layout changed
    boundsRef.current = card.getBoundingClientRect()
    card.classList.add('card-3d--active')
  }, [])

  /**
   * Handles mouse leaving the card.
   * Removes active class to enable CSS transitions, then resets transform and shadow.
   */
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    card.classList.remove('card-3d--active')

    // Reset transforms and shadow with smooth CSS transition
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)'
    card.style.setProperty('--glow-x', '50%')
    card.style.setProperty('--glow-y', '50%')

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    // Clear cached bounds
    boundsRef.current = null
  }, [])

  /**
   * Setup and cleanup event listeners.
   * Listeners are attached directly to the card element (not window) for efficiency.
   */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div className="card-3d-wrapper">
      <div className="card-3d" ref={cardRef}>
        {/* Image section */}
        <div className="card-3d__image-container">
          <img src={image} alt={title} className="card-3d__image" loading="lazy" />
        </div>

        {/* Content section */}
        <div className="card-3d__content">
          <h3 className="card-3d__title">{title}</h3>
          <p className="card-3d__description">{description}</p>
        </div>

        {/* Dynamic light reflection / glow overlay */}
        <div className="card-3d__glow" aria-hidden="true" />
      </div>
    </div>
  )
}

export default Card3D

