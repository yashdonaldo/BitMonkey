import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

export function gsapTrigger() {
    useGSAP(() => {
        gsap.to("#page2 h1", {
            transform: "translateX(-89%)",
            scrollTrigger: {
                trigger: "#page2",
                start: "top 0%",
                end: "top -150%",
                scrub: 2,
                pin: true
            }
        })

        var tl = gsap.timeline()

        tl.to("#page3 #para1", {
            transform: "translateY(-100px)",
            opacity: 1,
            scrollTrigger: {
                trigger: "#para1",
                start: "top 40%",
                end: "top 0%",
                scrub: 2
            }
        })
        tl.to("#page3 #para2", {
            transform: "translateY(-100px)",
            opacity: 1,
            scrollTrigger: {
                trigger: "#para2",
                start: "top 40%",
                end: "top 0%",
                scrub: 2
            }
        })
        tl.to("#page3 #para3", {
            transform: "translateY(-100px)",
            opacity: 1,
            scrollTrigger: {
                trigger: "#para3",
                start: "top 40%",
                end: "top 0%",
                scrub: 2,
            }
        })
        gsap.to("#page3", {
            scrollTrigger: {
                trigger: "#page3",
                start: "top 0",
                end: "top -100%",
                pin: true
            }
        })
    })
}