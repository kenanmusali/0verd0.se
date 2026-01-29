// CLEAN + NO-SCROLL + NO-SHRINK POPUP LOGIC (NO SYNTAX ERRORS)
import { useState, useRef, useEffect } from 'react'

const usePopups = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const [position] = useState('bottom')
    const popupRef = useRef(null)
    const triggerRef = useRef(null)

    const toggleSection = () => setIsOpen(!isOpen)
    const closePopup = () => setIsOpen(false)

    useEffect(() => {
        if (!isOpen) return

        const calculatePosition = () => {
            const trigger = triggerRef.current.getBoundingClientRect()
            const popup = popupRef.current
            const vh = window.innerHeight

            popup.style.top = 'auto'
            popup.style.bottom = 'auto'
            popup.style.maxHeight = ''
            popup.style.overflow = ''

            popup.style.top = `${trigger.bottom + 6}px`

            let rect = popup.getBoundingClientRect()

            if (rect.bottom > vh) {
                popup.style.top = 'auto'
                popup.style.bottom = `${vh - trigger.top + 6}px`
            }

            rect = popup.getBoundingClientRect()

            if (rect.bottom > vh) {
                popup.style.bottom = '6px'
                popup.style.top = 'auto'
            }

            if (rect.top < 0) {
                popup.style.top = '6px'
                popup.style.bottom = 'auto'
            }
        }

        // NO OUTSIDE CLICK HANDLER ANYMORE
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        // const handleClickOutside = ...

        const handleEscape = (e) => {
            if (e.key === 'Escape') closePopup()
        }

        setTimeout(calculatePosition, 10)

        window.addEventListener('resize', calculatePosition)
        window.addEventListener('scroll', calculatePosition, true)
        document.addEventListener('keydown', handleEscape)

        return () => {
            window.removeEventListener('resize', calculatePosition)
            window.removeEventListener('scroll', calculatePosition, true)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    return [isOpen, toggleSection, position, popupRef, triggerRef, closePopup]
}

export default usePopups
